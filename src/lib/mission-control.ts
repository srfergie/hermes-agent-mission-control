export type PersonalThread = {
  slug: "study" | "radar" | "lab" | "application" | "try-list";
  title: string;
  description: string;
  decision: string;
};

export const personalThreads: PersonalThread[] = [
  {
    slug: "study",
    title: "Study Track",
    description: "MSc to completion, then AI-103.",
    decision: "What is my next study action and deadline?",
  },
  {
    slug: "radar",
    title: "AI Radar",
    description: "What is new and worth attention.",
    decision: "What should I read, monitor or trial?",
  },
  {
    slug: "lab",
    title: "Local LLM Lab",
    description: "Hands-on local-model experiments on the RTX 4090.",
    decision: "What do I test next?",
  },
  {
    slug: "application",
    title: "Practical Application",
    description: "Agents and loops that can create value in work.",
    decision: "What is the next concrete delivery step?",
  },
  {
    slug: "try-list",
    title: "Try List",
    description: "A limited queue of ideas worth testing.",
    decision: "Which one idea should I start now?",
  },
];

export const morningPrompts = [
  { title: "AI Radar", question: "What changed overnight that is worth my time?" },
  { title: "Study", question: "What is my one concrete study or learning action?" },
  { title: "Apply", question: "What is one thing to try or apply today?" },
];
