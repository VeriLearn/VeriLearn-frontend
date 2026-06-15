"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { courses } from "../../../../lib/courses";
import { useProgress } from "../../../../context/ProgressContext";

export default function LessonPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = use(params);
  const course = courses.find((c) => c.id === Number(id));
  if (!course) notFound();

  const lessonIndex = Number(lessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson) notFound();

  const { isComplete, markComplete } = useProgress();
  const done = isComplete(course.id, lessonIndex);
  const hasPrev = lessonIndex > 0;
  const hasNext = lessonIndex < course.lessons.length - 1;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-zinc-900 dark:hover:text-white">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${course.id}`} className="hover:text-zinc-900 dark:hover:text-white">{course.title}</Link>
        <span>/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{lesson.title}</span>
      </div>

      {/* Lesson progress indicator */}
      <p className="text-xs text-zinc-400 mb-2">Lesson {lessonIndex + 1} of {course.lessons.length}</p>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{lesson.title}</h1>
      <span className="inline-block mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-500 dark:text-zinc-400">{lesson.duration}</span>

      {/* Content */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-6 mb-8">
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{lesson.content}</p>
      </div>

      {/* Mark complete */}
      {done ? (
        <div className="mb-6 flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
          <span>✓</span> Lesson completed
        </div>
      ) : (
        <button
          onClick={() => markComplete(course.id, lessonIndex)}
          className="mb-6 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
        >
          Mark as complete
        </button>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6">
        {hasPrev ? (
          <Link href={`/courses/${course.id}/lessons/${lessonIndex - 1}`} className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
            ← Previous
          </Link>
        ) : <span />}
        {hasNext ? (
          <Link href={`/courses/${course.id}/lessons/${lessonIndex + 1}`} className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
            Next lesson →
          </Link>
        ) : (
          <Link href={`/courses/${course.id}`} className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
            Finish course ✓
          </Link>
        )}
      </div>
    </div>
  );
}
