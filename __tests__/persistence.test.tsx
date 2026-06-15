import { render, act } from "@testing-library/react";
import { EnrollmentProvider, useEnrollment } from "../app/context/EnrollmentContext";
import { ProgressProvider, useProgress } from "../app/context/ProgressContext";

beforeEach(() => localStorage.clear());

// --- EnrollmentContext ---

function EnrollmentHarness({ onMount }: { onMount: (ctx: ReturnType<typeof useEnrollment>) => void }) {
  const ctx = useEnrollment();
  onMount(ctx);
  return null;
}

test("enroll() writes to localStorage", () => {
  let ctx!: ReturnType<typeof useEnrollment>;
  render(
    <EnrollmentProvider>
      <EnrollmentHarness onMount={(c) => { ctx = c; }} />
    </EnrollmentProvider>
  );

  act(() => ctx.enroll(42));

  const stored = JSON.parse(localStorage.getItem("verilearn_enrolled")!);
  expect(stored).toContain(42);
});

test("EnrollmentProvider re-hydrates from localStorage", () => {
  localStorage.setItem("verilearn_enrolled", JSON.stringify([7, 8]));

  let ctx!: ReturnType<typeof useEnrollment>;
  render(
    <EnrollmentProvider>
      <EnrollmentHarness onMount={(c) => { ctx = c; }} />
    </EnrollmentProvider>
  );

  expect(ctx.isEnrolled(7)).toBe(true);
  expect(ctx.isEnrolled(8)).toBe(true);
  expect(ctx.isEnrolled(1)).toBe(false);
});

// --- ProgressContext ---

function ProgressHarness({ onMount }: { onMount: (ctx: ReturnType<typeof useProgress>) => void }) {
  const ctx = useProgress();
  onMount(ctx);
  return null;
}

test("markComplete() writes to localStorage", () => {
  let ctx!: ReturnType<typeof useProgress>;
  render(
    <ProgressProvider>
      <ProgressHarness onMount={(c) => { ctx = c; }} />
    </ProgressProvider>
  );

  act(() => ctx.markComplete(3, 0));

  const stored = JSON.parse(localStorage.getItem("verilearn_progress")!);
  expect(stored).toContain("3-0");
});

test("ProgressProvider re-hydrates from localStorage", () => {
  localStorage.setItem("verilearn_progress", JSON.stringify(["5-0", "5-1"]));

  let ctx!: ReturnType<typeof useProgress>;
  render(
    <ProgressProvider>
      <ProgressHarness onMount={(c) => { ctx = c; }} />
    </ProgressProvider>
  );

  expect(ctx.isComplete(5, 0)).toBe(true);
  expect(ctx.isComplete(5, 1)).toBe(true);
  expect(ctx.isComplete(5, 2)).toBe(false);
});
