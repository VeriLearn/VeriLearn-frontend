"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// key: `${courseId}-${lessonIndex}`
interface ProgressContextValue {
  completed: Set<string>;
  markComplete: (courseId: number, lessonIndex: number) => void;
  isComplete: (courseId: number, lessonIndex: number) => boolean;
  courseProgress: (courseId: number, total: number) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const STORAGE_KEY = "verilearn_progress";

function readCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(readCompleted);

  const markComplete = useCallback((courseId: number, lessonIndex: number) => {
    setCompleted((prev) => {
      const next = new Set(prev).add(`${courseId}-${lessonIndex}`);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      }
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (courseId: number, lessonIndex: number) => completed.has(`${courseId}-${lessonIndex}`),
    [completed]
  );

  const courseProgress = useCallback(
    (courseId: number, total: number) => {
      let done = 0;
      for (let i = 0; i < total; i++) {
        if (completed.has(`${courseId}-${i}`)) done++;
      }
      return total === 0 ? 0 : Math.round((done / total) * 100);
    },
    [completed]
  );

  return (
    <ProgressContext.Provider value={{ completed, markComplete, isComplete, courseProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
