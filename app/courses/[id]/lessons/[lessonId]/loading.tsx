export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 animate-pulse">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2 rounded bg-zinc-100 dark:bg-zinc-700" />
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2 rounded bg-zinc-100 dark:bg-zinc-700" />
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="h-4 w-24 rounded bg-zinc-100 dark:bg-zinc-800 mb-2" />
      <div className="h-8 w-64 rounded bg-zinc-200 dark:bg-zinc-800 mb-6" />
      <div className="h-40 rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-8" />
      <div className="h-9 w-36 rounded-full bg-zinc-200 dark:bg-zinc-800 mb-6" />
      <div className="flex justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <div className="h-4 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-9 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
