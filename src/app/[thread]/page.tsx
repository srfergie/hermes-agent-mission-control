import Link from "next/link";
import { notFound } from "next/navigation";
import { personalThreads } from "@/lib/mission-control";

export default async function ThreadPage({ params }: { params: Promise<{ thread: string }> }) {
  const { thread: slug } = await params;
  const thread = personalThreads.find((item) => item.slug === slug);
  if (!thread) notFound();

  return (
    <main className="max-w-3xl space-y-8 pb-16">
      <header className="pt-4">
        <Link href="/" className="text-sm text-[var(--text-3)] hover:text-[var(--text)]">← Mission Control</Link>
        <p className="eyebrow mt-8">Operating thread</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">{thread.title}</h1>
        <p className="mt-4 text-[var(--text-2)]">{thread.description}</p>
      </header>
      <section className="panel p-6">
        <p className="eyebrow">Decision needed</p>
        <p className="mt-3 text-xl font-medium text-[var(--text)]">{thread.decision}</p>
        <p className="mt-6 text-sm leading-6 text-[var(--text-2)]">This thread is ready for its personal data model and workflow. The first release removes the previous creator tooling before adding records here.</p>
      </section>
    </main>
  );
}
