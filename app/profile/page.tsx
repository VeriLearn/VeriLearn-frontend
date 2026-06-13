"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const enrolled = [
  { id: 1, title: "Intro to TypeScript", progress: 72 },
  { id: 2, title: "Next.js App Router", progress: 40 },
  { id: 3, title: "Tailwind CSS Fundamentals", progress: 100 },
];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login?from=/profile");
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex flex-1 items-center justify-center text-zinc-400">Loading…</div>;
  }

  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Profile</h1>

      {/* Avatar + info */}
      <div className="flex items-center gap-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-6 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-white">{user.name}</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</div>
        </div>
      </div>

      {/* Enrolled courses summary */}
      <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">Enrolled Courses</h2>
      <div className="space-y-3">
        {enrolled.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3">
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{c.title}</span>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{c.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
