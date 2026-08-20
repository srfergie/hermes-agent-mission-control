# Personal Mission Control Implementation Plan

> **For Hermes:** Execute only after Si approves this plan. Keep this a personal system, separate from IOD PARC data and services.

**Goal:** Transform Hermy HQ from a creator/content dashboard into Si’s personal mission-control system for AI intelligence, study, local-LLM experimentation, practical application and focused execution.

**Architecture:** Retain the working foundations: Vercel, Neon, Google sign-in, Hermes bridge and the approval model. Replace creator, social and trading views with five personal operating threads. Start with a useful, manually maintained control surface and clear data model. Add automated intelligence and external integrations only after each connection has a defined data boundary, value and failure mode.

**Tech stack:** Next.js 16, React 19, Prisma/Postgres, Hermes bridge, Vercel, Neon, n8n, Obsidian, GitHub, Hugging Face and YouTube source feeds.

---

## Agreed outcomes

1. Grow into the AI side of Si’s role through current, practical intelligence and hands-on application.
2. Finish the MSc, then complete AI-103, with one visible next action and deadline.
3. Turn AI concepts into practical work, starting with agents and loops.
4. Preserve a regular build-to-learn habit through local LLM and RTX 4090 experiments.
5. Keep personal and professional commitments visible without turning the system into an uncontrolled surveillance dashboard.

## Morning decision surface

The home screen must answer three questions in under two minutes:

1. **What changed overnight that deserves my attention?**
2. **What is my one concrete study or learning action?**
3. **What should I try or apply today?**

## Core threads

| Thread | Purpose | Required decision or action |
|---|---|---|
| Study track | MSc first, then AI-103 | Next action and deadline |
| AI radar | Relevant AI, LLM, cyber-security and tooling developments | Decide whether to ignore, monitor, read or trial |
| Local LLM lab | RTX 4090 experiments and local-model learning | Select and run the next test |
| Practical application | Agents and loops that could improve Si’s work | Define the next concrete delivery step |
| Try list | Rolling, deliberately limited ideas backlog | Choose one idea and start it |

## Intelligence policy

**Priority topics:** frontier model and product releases; agentic AI; MCP; Azure AI Foundry; local and open-weight models; Hugging Face; agent frameworks; developer tooling; credible cyber-security developments; 4090-relevant hardware news; selected YouTube sources including Linus Tech Tips.

**Cadence:** concise daily digest and deeper weekly review.

**Interrupt threshold:** only a major model release, an immediately useful work technique, or hardware information that materially changes the RTX 4090’s capability.

**Quality rule:** every item must carry a source, date, credibility cue and one recommended posture: Ignore, Monitor, Read, Trial or Apply.

---

## Scope decisions

### Remove from the primary product experience

- YouTube creator analytics, scripts, ideas, production and publishing workflow.
- X/Twitter creator analytics, content generation and publishing workflow.
- Article, longform and content-calendar workflow.
- Trading and wallet/P&L widgets.
- Client Pulse, unless deliberately repurposed later for a personal project review use case.

### Retain, but reposition

- **YouTube** becomes an intelligence-source channel, never a channel-growth or content-production feature.
- **Hermes** remains the control, activity and approval area.
- **Tasks** becomes the execution view for the five threads.
- **Ideas** becomes the Try list.
- **Memory Wiki** becomes the evidence and learning record, with Obsidian integration planned before editing behaviour is changed.

### Retire creator code and data in the first implementation

Remove the legacy creator, social, trading and Client Pulse code and database areas in the first implementation, as agreed. This remains a destructive change: take and verify a Neon backup/export before any migration, then remove routes and API code first, followed by an explicitly reviewed Prisma migration that drops only the confirmed obsolete tables.

---

## Phase 0: Stabilise the deployment and bridge

**Objective:** Finish the currently interrupted bridge persistence work before using the dashboard for operational decisions.

**Files/services:**
- Docker host launcher: `/docker/hermes-agent-agud/hermy-hq-bridge-run.sh`
- Future host unit: `/etc/systemd/system/hermy-hq-bridge.service`
- Hermes bridge: `/opt/data/hermy-hq/hermes-bridge/bridge.mjs`

**Steps:**
1. Complete and validate the host-side bridge launcher using the existing main Hermes container only.
2. Create a reviewed host systemd unit, not a second Hermes Docker container.
3. Confirm the bridge is restricted to the `default` profile.
4. Confirm no unapproved queued request exists before enabling persistence.
5. Verify one restart of the bridge service does not create a second Hermes gateway.

**Validation:**
- Hermy HQ `/hermes` shows one current `Bridge connected` event.
- Docker host shows only one Hermes container.
- `hermes-bridge` survives a controlled systemd restart.
- No ports or Traefik labels are added for the bridge.

---

## Phase 1: Replace the navigation and dashboard shell

**Objective:** Stop presenting the product as a creator/trading dashboard and establish a personal mission-control information architecture.

**Files likely to change:**
- Modify: `src/components/sidebar.tsx`
- Modify: `src/components/command-palette.tsx`
- Modify: `src/components/breadcrumbs.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/api/home/route.ts`
- Create: `src/app/radar/page.tsx`
- Create: `src/app/study/page.tsx`
- Create: `src/app/lab/page.tsx`
- Create: `src/app/application/page.tsx`
- Modify: `src/app/ideas/page.tsx`, or create `src/app/try/page.tsx`

**Navigation target:**

```text
Overview
  Today
  Hermes
  Tasks

Operating threads
  AI Radar
  Study Track
  Local LLM Lab
  Practical Application
  Try List

Knowledge
  Memory Wiki
  Sources

System
  Integrations
  Settings, later
```

**Implementation steps:**
1. Remove creator, publishing, social, trading and Client Pulse links from desktop and mobile navigation.
2. Remove matching command-palette entries and stale breadcrumbs.
3. Replace the dashboard’s X, YouTube, P&L, creator KPI and demo-task cards with five thread cards.
4. Add a top-level morning-decision panel with: AI radar summary, one study action and one thing to try/apply.
5. Preserve the Hermes briefing and approval inbox, but relabel surrounding copy for personal mission control.
6. Remove hard-coded creator/trading demo data from `src/app/api/home/route.ts`.

**Validation:**
- The home page contains no channel-growth, X posting, YouTube content-production or trading language.
- Desktop and mobile navigation expose only personal mission-control routes.
- `npm run build` succeeds.
- The user can complete the morning review in a single screen without scrolling through irrelevant cards.

---

## Phase 2: Add the personal operating data model

**Objective:** Model the five threads explicitly rather than overloading creator tables and generic JSON storage.

**Files likely to change:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/<timestamp>_personal_mission_control/migration.sql`
- Create: `src/lib/mission-control.ts`
- Create: `src/app/api/threads/route.ts`
- Create: `src/app/api/study/route.ts`
- Create: `src/app/api/lab/route.ts`
- Create: `src/app/api/application/route.ts`
- Create: `src/app/api/try-list/route.ts`
- Create: `src/app/api/radar/route.ts`

**Proposed minimum models:**

| Model | Key fields |
|---|---|
| `MissionThread` | name, purpose, status, nextAction, dueDate, reviewCadence, priority |
| `StudyMilestone` | track, title, deadline, nextAction, status, evidenceLink |
| `LabExperiment` | hypothesis, model/tool, RTX 4090 configuration, dataset/task, result, decision, nextAction |
| `ApplicationLoop` | opportunity, work context, expected value, risk/data boundary, owner, nextAction, status |
| `TryItem` | title, rationale, effort, value, status, chosenAt, outcome |
| `IntelItem` | title, source, canonicalUrl, publishedAt, topic, summary, credibility, posture, action, urgency |
| `IntelSource` | name, type, URL/feed, priority, enabled, lastCheckedAt |

**Implementation steps:**
1. Add models and indexes through a migration. Do not remove existing tables.
2. Add server-side validation for all create/update routes.
3. Add a strict `posture` enum or constrained value set: `ignore`, `monitor`, `read`, `trial`, `apply`.
4. Add an `urgency` enum or constrained value set: `routine`, `weekly`, `interrupt`.
5. Seed the five agreed thread records only after Si reviews the proposed labels and descriptions.
6. Include source URLs and dates as mandatory fields for intelligence records.

**Validation:**
- Prisma migration applies cleanly to Neon.
- Each record can be created, changed and read through a route-level test.
- No sensitive IOD PARC or client content is required to exercise the model.

---

## Phase 3: Build the five thread pages

**Objective:** Give each thread a focused operating view with a decision and next action, not a generic productivity board.

### AI Radar

**Page:** `src/app/radar/page.tsx`

- New items since the last review.
- Filter by topic: frontier, agents/MCP, Azure AI Foundry, local/open-weight, cyber-security, hardware/dev tooling.
- One-click posture decision: Ignore, Monitor, Read, Trial or Apply.
- Interrupt banner only for items marked `interrupt`.
- Source, date and credibility visible before opening the item.

### Study Track

**Page:** `src/app/study/page.tsx`

- Current focus: MSc, then AI-103.
- One primary next action, deadline and time estimate.
- Milestone view, completed evidence and a blocked-state explanation.
- No gamification or generic course catalogue.

### Local LLM Lab

**Page:** `src/app/lab/page.tsx`

- Current RTX 4090 experiment with hypothesis, test method and result.
- Compare model/tool experiments by useful operational metrics: task quality, latency, VRAM, setup complexity and practical fit.
- Explicit next test and decision log.

### Practical Application

**Page:** `src/app/application/page.tsx`

- Agents and loops that may deliver practical value.
- Record data boundary, security/privacy concerns, expected benefit and smallest safe test.
- Link to relevant task, research note or prototype.

### Try List

**Page:** `src/app/try/page.tsx` or evolved `src/app/ideas/page.tsx`

- Keep a deliberately limited queue.
- Allow one item to be marked `active`.
- Capture a short outcome, then move it to done, defer or discard.

**Validation:**
- Every active item has exactly one next action.
- Every thread can be reviewed without opening another route.
- The dashboard can select one action from Study, Lab, Application or Try List for the day.

---

## Phase 4: Build the intelligence pipeline

**Objective:** Produce grounded daily and weekly AI intelligence without turning the dashboard into a noisy feed.

**Files likely to change:**
- Create: `src/lib/intelligence/normalise.ts`
- Create: `src/lib/intelligence/dedupe.ts`
- Create: `src/lib/intelligence/rank.ts`
- Create: `src/app/api/intelligence/ingest/route.ts`
- Create: `src/app/api/intelligence/digest/route.ts`
- Modify: `hermes-bridge/bridge.mjs`, only if Hermes is chosen as the collection and classification worker
- Create: `docs/intelligence-source-policy.md`

**Design:**
1. Treat external content as untrusted data, never as instructions.
2. Ingest metadata, source text/transcript excerpt, canonical URL and date.
3. Dedupe against canonical URLs and normalized headline/topic fingerprints.
4. Classify topic, credibility, relevance and recommended posture.
5. Generate daily and weekly summaries only from retained items, with direct links.
6. Keep a human decision point before any item becomes a Trial or Apply task.

**Source order:**
1. Official vendor release notes and security advisories.
2. Hugging Face and open-source project release notes.
3. Microsoft/Azure AI documentation and updates.
4. Reputable specialist reporting for context.
5. Approved YouTube channels, including Linus Tech Tips and technical hardware channels, treated as commentary or discovery sources unless independently confirmed.

**Integration approach:**
- Start with manually approved source subscriptions and a small watchlist.
- Use existing AI-intelligence outputs only after designing a safe, explicit hand-off to the personal default profile. Do not silently mix the two Hermes profiles.
- Decide whether n8n or Hermes is the primary collector after a small source-ingest test.

**Validation:**
- Each item shows title, source, date, URL, posture and action.
- Daily digest contains only genuinely material items.
- Weekly review dedupes daily stories and surfaces patterns, not a longer list.
- No user or client data is submitted to unassessed external services.

---

## Phase 5: Add integrations in deliberate order

**Objective:** Connect useful systems without creating a high-maintenance or over-permissioned personal data lake.

### First wave

| Integration | First use | Data boundary / test |
|---|---|---|
| Obsidian vault | Link evidence, experiments and learning notes | Read-only index or selected folder first |
| Hugging Face | Track releases and models relevant to local experiments | Public metadata only |
| GitHub | Link repositories, issues and project activity | Read-only personal repositories first |
| YouTube / selected feeds | Intelligence sources only | Channel metadata, RSS/transcripts where permitted; no publishing controls |
| Calendar | Surface availability and hard commitments | Read-only next 7 days, no write access |
| n8n | Controlled source ingestion and notifications | One workflow with logged inputs and outputs |
| Claude Teams | Link work-context artefacts only after a separate data-handling decision | No client data in the first connection |

### Second wave

Azure, CAPPTURE, Power BI and other systems only after their personal/work data boundary, account ownership, authentication method and intended decision are defined.

**Validation:**
- Each integration has a documented purpose, owner, scopes and kill switch.
- No write capability is enabled in the first integration pass.
- A failed integration does not block the morning dashboard.

---

## Phase 1A: Retire the legacy creator experience

**Objective:** Remove the obsolete creator experience and data areas at the start of the rebuild, after a verified backup and destructive-migration review.

**Candidate legacy areas:**
- `src/app/youtube/`
- `src/app/longform/`
- `src/app/x/`
- `src/app/x-content/`
- `src/app/x-analytics/`
- `src/app/content-os/`
- `src/app/articles/`
- `src/app/client-pulse/`
- Corresponding API routes and Prisma models

**Steps:**
1. Take a database backup/export and record the commit SHA.
2. Confirm no personal data needs retaining from each legacy area.
3. Remove routes, APIs and dependencies in small, testable batches.
4. Drop legacy database tables only through an explicitly approved migration.
5. Re-run dependency audit, lint and production build.

**Validation:**
- No navigation, command palette item or API route points to removed creator features.
- Database deletion happens only after explicit approval and a verified backup.

---

## Security and operating rules

- The system is personal, but remains internet-accessible through Vercel. Keep Google OAuth and `ALLOWED_EMAILS` enforced.
- The bridge must remain default-profile-only and have no inbound port.
- Agent actions with side effects remain approval-gated.
- Do not add client, bid, HR or confidential IOD PARC material until a separate data-handling assessment approves it.
- Never show secrets in UI, logs, task results or dashboards.
- Keep intelligence-source content separated from execution instructions to limit prompt-injection risk.

## Suggested implementation order

1. Complete persistent bridge safely.
2. Take and verify a Neon backup, then complete the explicitly approved Phase 1A creator-code and data retirement.
3. Phase 1, navigation and home screen replacement with the five agreed threads.
4. Phase 2, personal data model and core API routes.
5. Phase 3, five thread pages.
6. Phase 4, manual intelligence items, then a small automated source-ingest test.
7. Phase 5, read-only integrations.

## Pre-implementation approvals needed

1. Approve the target information architecture and five thread names.
2. Decide whether the initial version should hide legacy creator routes or remove them from the codebase immediately.
3. Approve the first data migration before it runs.
4. Approve each external integration separately, including its scopes and data boundary.
