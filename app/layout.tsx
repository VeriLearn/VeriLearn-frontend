import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";
import { ProgressProvider } from "./context/ProgressContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeriLearn — Verified Learning",
  description: "Browse courses, track progress, and learn with confidence on VeriLearn.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <AuthProvider>
          <EnrollmentProvider>
            <ProgressProvider>
              <Navbar />
              <main className="flex flex-1 flex-col">{children}</main>
            </ProgressProvider>
          </EnrollmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
