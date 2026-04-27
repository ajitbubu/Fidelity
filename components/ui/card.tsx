import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-sm", className)}>{children}</section>;
}

export function CardTitle({ children }: PropsWithChildren) {
  return <h3 className="text-sm font-medium text-zinc-300">{children}</h3>;
}

export function CardValue({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn("mt-2 text-2xl font-semibold", className)}>{children}</p>;
}
