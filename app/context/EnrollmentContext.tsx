"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface EnrollmentContextValue {
  enrolled: Set<number>;
  enroll: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [enrolled, setEnrolled] = useState<Set<number>>(new Set([1, 2, 3]));

  const enroll = useCallback((courseId: number) => {
    setEnrolled((prev) => new Set(prev).add(courseId));
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
