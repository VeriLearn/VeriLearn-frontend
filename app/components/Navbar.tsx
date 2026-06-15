"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <>
      {/* Announcement banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2.5 text-center text-xs font-medium text-white">
        🎉 New courses just dropped — TypeScript, React Server Components, and more.{" "}
        <Link href="/courses" className="underline font-semibold hover:text-indigo-100">Explore now</Link>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">V</span>
            <span className="text-lg font-bold text-gray-900">VeriLearn</span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-gray-600">
            <Link href="/courses" className="hover:text-gray-900 transition-colors">Courses</Link>
            {user && <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>}
            {user && <Link href="/profile" className="hover:text-gray-900 transition-colors">Profile</Link>}
          </div>

          {/* Auth — desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500">{user.name}</span>
                <button onClick={handleLogout}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Contact sales
                </Link>
                <Link href="/signup"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  Sign in
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="sm:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 text-sm font-medium text-gray-700">
            <Link href="/courses" className="block hover:text-indigo-600 transition-colors" onClick={() => setMenuOpen(false)}>Courses</Link>
            {user && <Link href="/dashboard" className="block hover:text-indigo-600 transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {user && <Link href="/profile" className="block hover:text-indigo-600 transition-colors" onClick={() => setMenuOpen(false)}>Profile</Link>}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <button onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left">
                  Sign out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="hover:text-indigo-600 transition-colors" onClick={() => setMenuOpen(false)}>Contact sales</Link>
                  <Link href="/signup"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors text-center"
                    onClick={() => setMenuOpen(false)}>
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
