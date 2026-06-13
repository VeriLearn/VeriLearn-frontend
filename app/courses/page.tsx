import Link from "next/link";
import { courses, tagColors } from "../lib/courses";

const levels = ["Beginner", "Intermediate", "Advanced"];
const topics = ["TypeScript", "React", "Next.js", "CI/CD", "CSS", "Performance"];

export default function CoursesPage() {
  return (
    <>
      {/* Hero banner — blue-to-cyan gradient like Alchemy */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-6 py-16">
        {/* Subtle geometric pattern overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 flex items-center gap-2 text-sm text-blue-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span className="text-white font-medium">Courses</span>
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">VeriLearn courses</h1>
          <p className="mt-2 text-blue-100 text-sm">Discover {courses.length} courses for developers at every level</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Summary + CTA row */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-bold text-gray-900">List of courses</h2>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
              Structured, practitioner-built courses covering TypeScript, Next.js, CI/CD, load testing, and more.
              Browse by level or topic using the filters.
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-center w-full sm:w-64">
            <p className="text-sm font-semibold text-gray-800">Start learning for free today.</p>
            <Link href="/signup"
              className="mt-3 block w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
              Create free account
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filter */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Filter</p>

              <div className="mb-5">
                <p className="mb-2 text-sm font-semibold text-gray-700">Level</p>
                <ul className="space-y-1.5">
                  {levels.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 cursor-pointer">
                      <span className="h-4 w-4 rounded border border-gray-300" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Topic</p>
                <ul className="space-y-1.5">
                  {topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 cursor-pointer">
                      <span className="h-4 w-4 rounded border border-gray-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Card grid */}
          <div className="flex-1">
            {/* Search + count bar */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                Search for a course
              </div>
              <span className="shrink-0 text-sm text-gray-500">{courses.length} results</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course, i) => (
                <Link key={course.id} href={`/courses/${course.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                  {/* Icon placeholder */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-base font-bold text-indigo-600">
                      {course.title[0]}
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight text-sm">
                      {course.title}
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[course.tag]}`}>{course.tag}</span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">Developer course</span>
                  </div>
                  {/* Description */}
                  <p className="flex-1 text-xs leading-relaxed text-gray-500 line-clamp-3">{course.description}</p>
                  {/* Footer */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">{course.lessons.length} lessons · {course.duration}</span>
                  </div>
                </Link>
              ))}

              {/* Promo card like Alchemy's purple CTA card */}
              <div className="flex flex-col rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 p-5 shadow-sm">
                <span className="mb-3 self-start rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Get started
                </span>
                <p className="text-xl font-bold leading-snug text-white">
                  Build real skills with VeriLearn.
                </p>
                <div className="mt-auto pt-6">
                  <Link href="/signup"
                    className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors">
                    Create free account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
