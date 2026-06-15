import Link from "next/link";
import { courses, tagColors } from "./lib/courses";

const stats = [
  { value: "6+", label: "Courses" },
  { value: "30+", label: "Lessons" },
  { value: "100%", label: "Free to start" },
];

const features = [
  { icon: "◈", title: "Structured Courses", desc: "Curated learning paths designed by practitioners for real-world outcomes." },
  { icon: "◎", title: "Verified Progress", desc: "Every milestone you complete is logged and verifiable." },
  { icon: "◷", title: "Learn at Your Pace", desc: "No deadlines. No pressure. Pick up where you left off, any time." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="mx-auto max-w-3xl relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Verified Learning Platform
          </span>
          <h1 className="mt-5 text-5xl font-bold text-white leading-tight sm:text-6xl">
            Master skills that get<br />you hired
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-blue-100 text-lg">
            Structured courses, real-time progress tracking, and verified credentials — all free.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/courses"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-blue-50 transition-colors">
              Browse Courses
            </Link>
            <Link href="/signup"
              className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              Get started free
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-100 dark:border-white/10 bg-white dark:bg-zinc-950 px-6 py-8">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured courses */}
      <div className="bg-gray-50 dark:bg-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured courses</h2>
            <Link href="/courses" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}
                className="group rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-5 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-base font-bold text-indigo-600 dark:text-indigo-400">
                    {course.title[0]}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm leading-snug">
                    {course.title}
                  </span>
                </div>
                <div className="mb-3 flex gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[course.tag]}`}>{course.tag}</span>
                </div>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-zinc-400 line-clamp-2">{course.description}</p>
                <div className="mt-3 border-t border-gray-100 dark:border-white/10 pt-3 text-xs text-gray-400 dark:text-zinc-500">
                  {course.lessons.length} lessons · {course.duration}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">Why VeriLearn?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-900 p-6">
                <div className="mb-3 text-2xl text-indigo-500">{icon}</div>
                <h3 className="mb-1.5 font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to start learning?</h2>
        <p className="mt-3 text-indigo-100">Join thousands of developers building real skills.</p>
        <Link href="/signup"
          className="mt-7 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50 transition-colors">
          Create free account
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 px-6 py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">V</span>
              <span className="font-bold text-gray-900 dark:text-white">VeriLearn</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">The verified learning platform for developers.</p>
          </div>
          {[
            { title: "Platform", links: [["Courses", "/courses"], ["Dashboard", "/dashboard"]] },
            { title: "Account", links: [["Sign in", "/login"], ["Sign up", "/signup"]] },
            { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Careers", "#"]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500">{title}</h3>
              <ul className="space-y-2">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-gray-100 dark:border-white/10 pt-6 text-xs text-gray-400 dark:text-zinc-500">
          © 2026 VeriLearn. All rights reserved.
        </div>
      </footer>
    </>
  );
}
