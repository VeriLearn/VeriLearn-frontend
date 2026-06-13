export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-800/60" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}
