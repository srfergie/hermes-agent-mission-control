"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { classifyHealth, type BridgeHealth } from "@/lib/health-status";
import {
  Home,
  Radio,
  GraduationCap,
  Cpu,
  Workflow,
  Lightbulb,
  ClipboardList,
  BookOpen,
  Bot,
  Menu,
  X,
} from "lucide-react";

const navGroups = [
  {
    name: "Today",
    items: [
      { href: "/", label: "Mission Control", icon: Home },
      { href: "/hermes", label: "Hermes", icon: Bot },
      { href: "/tasks", label: "Tasks", icon: ClipboardList },
    ],
  },
  {
    name: "Operating threads",
    items: [
      { href: "/study", label: "Study Track", icon: GraduationCap },
      { href: "/radar", label: "AI Radar", icon: Radio },
      { href: "/lab", label: "Local LLM Lab", icon: Cpu },
      { href: "/application", label: "Practical Application", icon: Workflow },
      { href: "/try-list", label: "Try List", icon: Lightbulb },
    ],
  },
  {
    name: "Knowledge",
    items: [
      { href: "/memory-wiki", label: "Memory Wiki", icon: BookOpen },
    ],
  },
];

const mobileTabsRaw = [
  { href: "/", label: "Today", icon: Home },
  { href: "/radar", label: "Radar", icon: Radio },
  { href: "/study", label: "Study", icon: GraduationCap },
  { href: "/try-list", label: "Try", icon: Lightbulb },
  { href: "/hermes", label: "Hermes", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [health, setHealth] = useState<BridgeHealth | null>(null);

  useEffect(() => {
    let active = true;
    let latestRequestId = 0;

    const loadHealth = async () => {
      const requestId = ++latestRequestId;
      try {
        const response = await fetch("/api/hermes/health", { cache: "no-store" });
        if (!active || requestId !== latestRequestId) return;

        if (response.ok) {
          const payload = (await response.json()) as BridgeHealth;
          if (active && requestId === latestRequestId) setHealth(payload);
        } else {
          setHealth(null);
        }
      } catch {
        if (active && requestId === latestRequestId) setHealth(null);
      }
    };

    void loadHealth();
    const interval = window.setInterval(() => void loadHealth(), 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const systemStatus = classifyHealth(health);
  const statusColor = {
    neutral: "var(--text-3)",
    up: "var(--up)",
    warn: "var(--warn)",
  }[systemStatus.tone];

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-[10px] bg-[var(--text)] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
        <span className="text-[#0a0b0d] font-bold text-[13px] tracking-tight">H</span>
      </div>
      <span className="font-semibold text-[var(--text)] tracking-[-0.01em] text-[15px]">Hermy HQ</span>
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--line)] px-4 py-3 flex items-center justify-between">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[var(--text-2)] hover:text-[var(--text)] transition-colors rounded-lg hover:bg-[var(--surface-1)]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-xl border-t border-[var(--line)] px-2 py-2 safe-area-pb">
        <nav className="flex justify-around">
          {mobileTabsRaw.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? "text-[var(--text)] bg-[var(--surface-2)]"
                    : "text-[var(--text-3)] hover:text-[var(--text-2)] active:scale-95"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed md:relative z-50 md:z-10
          w-64 md:w-[15rem] h-full
          bg-[var(--bg)] md:bg-transparent border-r border-[var(--line)]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          top-0 left-0
        `}
      >
        {/* Logo */}
        <div className="hidden md:block px-5 pt-6 pb-8">
          <Logo />
        </div>

        {/* Spacer for mobile header */}
        <div className="h-16 md:hidden" />

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <div className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.name}>
                <h3 className="eyebrow px-3 mb-1.5 !text-[10px] !text-[var(--text-4)]">
                  {group.name}
                </h3>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          className={`group relative flex items-center gap-3 px-3 py-[7px] rounded-[10px] transition-all duration-150 ${
                            isActive
                              ? "bg-[var(--surface-2)] text-[var(--text)]"
                              : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-1)]"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full bg-[var(--accent)]" />
                          )}
                          <Icon
                            className={`w-[17px] h-[17px] shrink-0 ${
                              isActive ? "text-[var(--text)]" : "text-[var(--text-3)] group-hover:text-[var(--text-2)]"
                            }`}
                          />
                          <span className="text-[13.5px] font-medium">{item.label}</span>
                        </Link>
                        {"anchors" in group &&
                          isActive &&
                          (group as { anchors?: { href: string; label: string }[] }).anchors && (
                            <div className="ml-[26px] mt-0.5 space-y-0.5 border-l border-[var(--line)] pl-3">
                              {(group as { anchors: { href: string; label: string }[] }).anchors.map(
                                (a) => (
                                  <a
                                    key={a.href}
                                    href={a.href}
                                    className="block text-[12px] text-[var(--text-3)] hover:text-[var(--text-2)] py-1 transition-colors"
                                  >
                                    {a.label}
                                  </a>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[var(--line)]">
          <div className="flex items-center gap-2 text-[11.5px]" style={{ color: statusColor }}>
            <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
              {systemStatus.tone === "up" && (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                  style={{ background: statusColor }}
                />
              )}
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
            </span>
            <span>{systemStatus.label}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
