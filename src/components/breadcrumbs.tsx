"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pathLabels: Record<string, string> = {
  "/": "Mission Control",
  "/radar": "AI Radar",
  "/study": "Study Track",
  "/lab": "Local LLM Lab",
  "/application": "Practical Application",
  "/try-list": "Try List",
  "/hermes": "Hermes",
  "/tasks": "Tasks",
  "/memory-wiki": "Memory Wiki",
  "/agents": "Agents",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const currentLabel = pathLabels[pathname] || "Page";
  return <div className="mb-6 flex items-center gap-2 text-sm text-[var(--text-3)]"><Link href="/" className="hover:text-neutral-300">Mission Control</Link><span>/</span><span className="text-neutral-400">{currentLabel}</span></div>;
}
