import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
