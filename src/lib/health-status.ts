export type HealthTone = "neutral" | "up" | "warn";

export type BridgeHealth = {
  online: boolean;
  lastSeen: string | null;
};

export type HealthPresentation = {
  label: "Status unavailable" | "Systems healthy" | "Attention needed";
  tone: HealthTone;
};

const STALE_AFTER_MS = 2 * 60 * 1000;
const ISO_UTC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/;

function parseStrictUtcTimestamp(value: string): Date | null {
  const match = ISO_UTC.exec(value);
  if (!match) return null;

  const [, year, month, day, hour, minute, second, millisecond = "0"] = match;
  const date = new Date(Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond.padEnd(3, "0")),
  ));

  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day) ||
    date.getUTCHours() !== Number(hour) ||
    date.getUTCMinutes() !== Number(minute) ||
    date.getUTCSeconds() !== Number(second)
  ) {
    return null;
  }

  return date;
}

export function classifyHealth(
  health: BridgeHealth | null,
  now = new Date(),
): HealthPresentation {
  if (!health || typeof health.online !== "boolean" || typeof health.lastSeen !== "string") {
    return { label: "Status unavailable", tone: "neutral" };
  }

  const lastSeen = parseStrictUtcTimestamp(health.lastSeen);
  if (!lastSeen) {
    return { label: "Status unavailable", tone: "neutral" };
  }

  const age = now.getTime() - lastSeen.getTime();
  const stale = age > STALE_AFTER_MS;
  const future = age < 0;

  if (!health.online || stale || future) {
    return { label: "Attention needed", tone: "warn" };
  }

  return { label: "Systems healthy", tone: "up" };
}
