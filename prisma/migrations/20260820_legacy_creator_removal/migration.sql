BEGIN;

DELETE FROM "DataStore"
WHERE key IN ('metric-snapshots','x-account-stats','polymarket-pnl','pixel-ideas','youtube-outliers','watchlist-radar','trend-radar','voice-examples','score-snapshots');

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
