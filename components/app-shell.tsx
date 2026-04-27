"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/alerts", label: "Alerts" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: PropsWithChildren) {
  const path = usePathname();
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-12 pt-6 md:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Portfolio Intelligence Dashboard</h1>
          <p className="text-sm text-zinc-400">Upload snapshots, track target trajectory, and review pre-market plans.</p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm",
                path === item.href ? "bg-emerald-500 text-zinc-900" : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
