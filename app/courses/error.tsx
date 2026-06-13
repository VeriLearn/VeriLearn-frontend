"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Failed to load courses</h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={unstable_retry}
        className="mt-6 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
