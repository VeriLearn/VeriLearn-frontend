export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-64 rounded bg-zinc-100 dark:bg-zinc-800/60" />
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}
