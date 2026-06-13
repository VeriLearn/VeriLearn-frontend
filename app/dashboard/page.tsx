"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useProgress } from "../context/ProgressContext";
import { courses } from "../lib/courses";

export default function DashboardPage() {
  const { user } = useAuth();
  const { enrolled } = useEnrollment();
  const { courseProgress } = useProgress();

  const enrolledCourses = courses.filter((c) => enrolled.has(c.id));
  const totalDone = enrolledCourses.reduce((sum, c) =>
    sum + Math.round((courseProgress(c.id, c.lessons.length) / 100) * c.lessons.length), 0);
  const certificates = enrolledCourses.filter((c) => courseProgress(c.id, c.lessons.length) === 100).length;

  const stats = [
    { label: "Enrolled", value: enrolledCourses.length, icon: "◈" },
    { label: "Lessons done", value: totalDone, icon: "◎" },
    { label: "Certificates", value: certificates, icon: "✦" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Dashboard</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {user ? `Good to see you, ${user.name}` : "Your Learning Hub"}
        </h1>
      </div>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-white/5 p-6">
            <div className="mb-2 text-xl text-indigo-400">{icon}</div>
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="mt-1 text-sm text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Course list */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-white">My Courses</h2>
        <Link href="/courses" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Browse more →</Link>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <p className="text-zinc-500">No courses enrolled yet.</p>
          <Link href="/courses" className="mt-4 inline-block text-sm font-semibold text-indigo-400 hover:text-indigo-300">Browse courses →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {enrolledCourses.map((course) => {
            const progress = courseProgress(course.id, course.lessons.length);
            const done = Math.round((progress / 100) * course.lessons.length);
            return (
              <Link key={course.id} href={`/courses/${course.id}`}
                className="group flex items-center gap-5 rounded-2xl border border-white/8 bg-white/5 p-5 transition-all hover:border-indigo-500/30 hover:bg-white/[0.08]">
                {/* Ring */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#ffffff08" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="2.5"
                      strokeDasharray={`${(progress / 100) * 94} 94`} strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-bold text-white">{progress}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white group-hover:text-indigo-300 transition-colors truncate">{course.title}</div>
                  <div className="mt-0.5 text-xs text-zinc-500">{done} of {course.lessons.length} lessons</div>
                </div>
                <span className="text-zinc-600 group-hover:text-indigo-400 transition-colors text-sm">→</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
