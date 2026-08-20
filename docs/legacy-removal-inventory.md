# Legacy Creator-System Removal Inventory

Status: **reviewed, not applied**

## Verified recovery point

- Backup: `hermy-hq-pre-mission-control-20260820T073959Z.dump`
- Size: `61688` bytes
- SHA-256: `1af48da8a9dea37f060e71ad0cd46d7c096f39bdfe92492442f8c5b287cc49ae`
- Archive verification: passed with `pg_restore --list`

## Database state before removal

The following creator, social, publishing, trading and Client Pulse tables each contain zero rows:

- `Draft`
- `TweetMetric`
- `ContentCalendar`
- `YoutubeIdea`
- `YoutubeScript`
- `YoutubeFeedback`
- `LongformScript`
- `ContentRequest`
- `BattleRoyaleBot`
- `Article`
- `SavedTitle`
- `ClientPulseClient`
- `ClientPulseChat`
- `ClientPulseMessage`
- `ClientPulseAnalysis`
- `ClientPulseAlert`

The only detected legacy `DataStore` record is:

- `metric-snapshots`

## Code to remove

### Pages

- `src/app/youtube/`
- `src/app/longform/`
- `src/app/x/`
- `src/app/x-content/`
- `src/app/x-analytics/`
- `src/app/content-os/`
- `src/app/articles/`
- `src/app/client-pulse/`
- `src/app/watchlist-radar/`

### Related API areas

- `src/app/api/youtube/`
- `src/app/api/youtube-scrape/`
- `src/app/api/longform/`
- `src/app/api/x-content/`
- `src/app/api/x-analytics/`
- `src/app/api/cron/x-stats/`
- `src/app/api/articles/`
- `src/app/api/client-pulse/`
- `src/app/api/watchlist-radar/`
- `src/app/api/trends/`
- `src/app/api/scrape-metrics/`
- `src/app/api/score/`
- `src/app/api/cache/clear/`

### Shared UI and home-dashboard code to replace

- `src/app/page.tsx`
- `src/app/api/home/route.ts`
- `src/components/sidebar.tsx`
- `src/components/command-palette.tsx`
- `src/components/breadcrumbs.tsx`

## Database migration SQL for review

```sql
BEGIN;

DELETE FROM "DataStore"
WHERE key IN (
  'metric-snapshots',
  'x-account-stats',
  'polymarket-pnl',
  'pixel-ideas',
  'youtube-outliers',
  'watchlist-radar',
  'trend-radar',
  'voice-examples',
  'score-snapshots'
);

DROP TABLE IF EXISTS "ClientPulseAlert";
DROP TABLE IF EXISTS "ClientPulseAnalysis";
DROP TABLE IF EXISTS "ClientPulseMessage";
DROP TABLE IF EXISTS "ClientPulseChat";
DROP TABLE IF EXISTS "ClientPulseClient";
DROP TABLE IF EXISTS "TweetMetric";
DROP TABLE IF EXISTS "Draft";
DROP TABLE IF EXISTS "ContentCalendar";
DROP TABLE IF EXISTS "YoutubeIdea";
DROP TABLE IF EXISTS "YoutubeScript";
DROP TABLE IF EXISTS "YoutubeFeedback";
DROP TABLE IF EXISTS "LongformScript";
DROP TABLE IF EXISTS "ContentRequest";
DROP TABLE IF EXISTS "BattleRoyaleBot";
DROP TABLE IF EXISTS "Article";
DROP TABLE IF EXISTS "SavedTitle";

COMMIT;
```

## Tables retained

- NextAuth: `User`, `Account`, `Session`, `VerificationToken`
- Personal ideas: `Idea`
- Agent and Hermes integration: `AgentState`, `AgentBusMessage`, `DataStore`, `Brief`, `Mission`, `AgentRequest`, `AgentEvent`, `HermesTask`, `HermesMemory`

## Constraints

- The migration has not been written to `prisma/migrations/` and has not been applied.
- A new personal mission-control schema must be added in a separate migration after legacy removal, not bundled into this destructive change.
- Route and API deletion must precede the schema migration so the application does not deploy against removed Prisma models.
