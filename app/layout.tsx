import "./globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "LINEOA AI Admin – v1.1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="flex min-h-screen">
          <aside className="w-60 border-r bg-white px-4 py-6">
            <h1 className="text-lg font-semibold tracking-tight mb-6">
              LINEOA AI Admin
            </h1>
            <nav className="space-y-2 text-sm">
              <Link href="/dashboard" className="block text-zinc-700 hover:text-black">
                Dashboard
              </Link>
              <Link href="/chats" className="block text-zinc-700 hover:text-black">
                Chats
              </Link>
              <Link href="/quotes" className="block text-zinc-700 hover:text-black">
                Quotes
              </Link>
              <Link href="/settings/company" className="block text-zinc-700 hover:text-black">
                Settings – Company
              </Link>
              <Link href="/settings/ai" className="block text-zinc-700 hover:text-black">
                Settings – AI
              </Link>
            </nav>
          </aside>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
