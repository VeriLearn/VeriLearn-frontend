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

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(["1-0", "1-1", "1-2", "1-3", "2-0", "2-1", "2-2", "3-0", "3-1", "3-2", "3-3", "3-4"])
  );

  const markComplete = useCallback((courseId: number, lessonIndex: number) => {
    setCompleted((prev) => new Set(prev).add(`${courseId}-${lessonIndex}`));
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
