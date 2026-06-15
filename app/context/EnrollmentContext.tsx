"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface EnrollmentContextValue {
  enrolled: Set<number>;
  enroll: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

const STORAGE_KEY = "verilearn_enrolled";

function readEnrolled(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [enrolled, setEnrolled] = useState<Set<number>>(readEnrolled);

  const enroll = useCallback((courseId: number) => {
    setEnrolled((prev) => {
      const next = new Set(prev).add(courseId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      }
      return next;
    });
  }, []);

  const isEnrolled = useCallback((courseId: number) => enrolled.has(courseId), [enrolled]);

  return (
    <EnrollmentContext.Provider value={{ enrolled, enroll, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error("useEnrollment must be used inside EnrollmentProvider");
  return ctx;
}
