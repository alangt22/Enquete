"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // opcional (se você usa shadcn)

interface LoaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoaderButton({
  loading = false,
  children,
  className,
  disabled,
  ...props
}: LoaderButtonProps) {
  return (
    <button
  className={cn(
    "relative inline-flex items-center justify-center gap-2",
    "rounded-lg px-4 py-2 font-medium transition-all",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    className
  )}
  disabled={loading || disabled}
  {...props}
>
  {loading && (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  )}

  {children}
</button>
  );
}