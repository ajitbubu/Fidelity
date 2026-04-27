import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Button({ children, className, ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) {
  return (
    <button
      className={cn(
        "rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
