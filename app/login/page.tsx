"use client";

import Link from "next/link";
import { useState, FormEvent, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      await login(email, password);
      router.push(searchParams.get("from") || "/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "mt-1.5 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 transition focus:border-indigo-500/60 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-indigo-500/30";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {error && (
        <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputCls} placeholder="you@example.com" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
          <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
        </div>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputCls} placeholder="••••••••" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-xl shadow-indigo-500/30">V</span>
        </div>
        <h1 className="text-center text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          No account?{" "}
          <Link href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Sign up free</Link>
        </p>
        <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-2xl bg-white/5" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
