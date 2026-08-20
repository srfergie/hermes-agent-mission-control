import Link from "next/link";
import { ArrowRight, BrainCircuit, Radio, ShieldCheck } from "lucide-react";
import { morningPrompts, personalThreads } from "@/lib/mission-control";

export default function MissionControlPage() {
  return (
    <main className="space-y-10 pb-16">
      <header className="pt-4">
        <p className="eyebrow mb-3">Personal mission control</p>
        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">Focus on what moves you forward.</h1>
        <p className="mt-4 max-w-2xl text-[var(--text-2)]">
          A personal system for AI intelligence, study, local LLM experiments and practical application.
        </p>
      </header>

      <section>
        <h2 className="eyebrow mb-3">Morning decisions</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {morningPrompts.map((prompt, index) => (
            <article key={prompt.title} className="panel p-5">
              <p className="num text-xs text-[var(--text-4)]">0{index + 1}</p>
              <h3 className="mt-4 text-base font-semibold text-[var(--text)]">{prompt.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-2)]">{prompt.question}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="eyebrow mb-3">Operating threads</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {personalThreads.map((thread) => (
            <Link key={thread.slug} href={`/${thread.slug}`} className="panel group p-5 transition-colors hover:bg-[var(--surface-1)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text)]">{thread.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-2)]">{thread.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-3)] transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-5 border-t border-[var(--line)] pt-4 text-sm text-[var(--text-3)]">{thread.decision}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="panel p-5"><Radio className="h-5 w-5 text-[var(--accent)]" /><h2 className="mt-4 font-semibold">AI Radar</h2><p className="mt-2 text-sm text-[var(--text-2)]">Manual intelligence cards come first. Automation follows once the signal standard is proven.</p></article>
        <article className="panel p-5"><BrainCircuit className="h-5 w-5 text-[var(--accent)]" /><h2 className="mt-4 font-semibold">Build to learn</h2><p className="mt-2 text-sm text-[var(--text-2)]">Use the Local LLM Lab to keep a hypothesis, result and next test for the 4090.</p></article>
        <article className="panel p-5"><ShieldCheck className="h-5 w-5 text-[var(--accent)]" /><h2 className="mt-4 font-semibold">Deliberate action</h2><p className="mt-2 text-sm text-[var(--text-2)]">Hermes actions remain approval-gated. Separate personal experimentation from confidential work data.</p></article>
      </section>
    </main>
  );
}
