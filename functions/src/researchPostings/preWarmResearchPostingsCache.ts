// ./functions/src/researchPostings/preWarmResearchPostingsCache.ts
//
// Cloud Function for Firebase to ping /research/postings endpoint to pre-warm
// the cache for the research postings page every hour.

// Cloud Functions for Firebase SDK imports.
import { type EventContext, logger, pubsub } from "firebase-functions/v1";

// Local route constant import.
import { APP_URL, RESEARCH_POSTINGS_ROUTE } from "./researchPostingsConstants";

// -----------------------------------------------------------------------------
export const preWarmResearchPostingsCache = pubsub
  .schedule("5 * * * *")
  .timeZone("America/New_York")
  .onRun(async (context: EventContext): Promise<void> => {
    // Log start of cron job.
    logger.info(
      `At ${context.timestamp}, hourly cron job "${preWarmResearchPostingsCache.name}" to ping route "${RESEARCH_POSTINGS_ROUTE}" started.`,
    );

    // Ping /postings endpoint to pre-warm cache.
    try {
      const response = await fetch(`${APP_URL}${RESEARCH_POSTINGS_ROUTE}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to ping route "${RESEARCH_POSTINGS_ROUTE}": ${response.statusText}`,
        );
      }
      logger.info(
        `At ${context.timestamp}, successfully pinged route "${RESEARCH_POSTINGS_ROUTE}".`,
      );
    } catch (error) {
      logger.error(
        `At ${context.timestamp}, error occurred while pinging route "${RESEARCH_POSTINGS_ROUTE}": ${error}`,
      );
    }

    // Log end of cron job.
    logger.info(
      `At ${context.timestamp}, hourly cron job "${preWarmResearchPostingsCache.name}" to ping route "${RESEARCH_POSTINGS_ROUTE}" ended.`,
    );
    return;
  });
