// ./functions/src/firestore/cronFetchResearchPostings.ts
//
// Cloud Function for Firebase to fetch official OSU research postings
// everyday at 8AM EST from external API and store in Firestore.

// Cloud Functions for Firebase SDK imports.
import { type EventContext, logger, pubsub } from "firebase-functions/v1";

// Firebase Admin SDK imports.
import {
  type CollectionReference,
  FieldValue,
  type Firestore,
  getFirestore,
} from "firebase-admin/firestore";

// Research postings API import.
import { type ResearchPosting, ResearchPostingSchema } from "@keminghe/osu";
import { getResearchPostingsAsync } from "@keminghe/osu/async";

// -----------------------------------------------------------------------------
// Get Firebase Admin Firestore instance.
const fbStore: Firestore = getFirestore();

// -----------------------------------------------------------------------------
export const cronFetchResearchPostings = pubsub
  .schedule("0 6 * * *")
  .timeZone("America/New_York")
  .onRun(async (context: EventContext): Promise<void> => {
    // Log start of cron job.
    logger.info(
      `At ${context.timestamp}, daily cron job "${cronFetchResearchPostings.name}" to fetch research postings started.`,
    );

    // Fetch research postings from external API.
    let todaysPostings: ResearchPosting[] | undefined = undefined;
    try {
      todaysPostings = await getResearchPostingsAsync();
    } catch (error) {
      logger.error(
        `At ${context.timestamp}, error occurred while fetching research postings using "${getResearchPostingsAsync.name}": ${error}`,
      );
      return;
    }

    // Verify postings are correctly fetched, else return and log error.
    if (
      !todaysPostings ||
      todaysPostings.length === 0 ||
      !ResearchPostingSchema.array().safeParse(todaysPostings).success
    ) {
      logger.error(
        `At ${context.timestamp}, "${getResearchPostingsAsync.name}" was unable to fetch any research postings.`,
      );
      return;
    }

    // Store fetched research postings in a new document (auto-index) in Firestore.
    try {
      const researchPostingsRef: CollectionReference =
        fbStore.collection("researchPostings");
      await researchPostingsRef.add({
        // System info.
        fetchTimestamp: FieldValue.serverTimestamp(),

        // Research posting info.
        postings: todaysPostings,
      });
    } catch (error) {
      logger.error(
        `At ${context.timestamp}, error occurred while storing research postings to Firestore using Firebase Admin SDK: ${error}`,
      );
      return;
    }

    // Log end of cron job.
    logger.info(
      `At ${context.timestamp}, daily cron job "${cronFetchResearchPostings.name}" to fetch research postings completed.`,
    );
    return;
  });
