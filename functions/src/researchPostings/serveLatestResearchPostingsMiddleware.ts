// Cloud Functions for Firebase imports.
import { logger } from "firebase-functions/v1";

// Express essential imports.
import type { NextFunction, Request, Response } from "express";

// Firebase Admin SDK imports.
import {
  type DocumentData,
  type Firestore,
  type QuerySnapshot,
  getFirestore,
} from "firebase-admin/firestore";

// Research postings schema and type imports.
import { type ResearchPosting, ResearchPostingSchema } from "@keminghe/osu";

// -----------------------------------------------------------------------------
// Get Firebase Admin Firestore instance.
const fbStore: Firestore = getFirestore();

// -----------------------------------------------------------------------------
export default async function serveLatestResearchPostingsMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const latestPostingsSnapshot: QuerySnapshot = await fbStore
      .collection("researchPostings")
      .orderBy("fetchTimestamp", "desc")
      .limit(1)
      .get();

    // Validate Firestore query result non-empty.
    if (latestPostingsSnapshot.empty) {
      logger.error(
        'No document found in Firestore collection "researchPostings".',
      );
      response.status(404).send("No research postings found.");
      return;
    }

    // Validate result has required fields.
    const latestPostingsData: DocumentData =
      latestPostingsSnapshot.docs[0].data();
    if (!latestPostingsData.fetchTimestamp) {
      logger.error(
        'Most recent Firestore document in collection "researchPostings" missing field "fetchTimestamp".',
      );
      response.status(500).send("Internal server error.");
      return;
    }

    if (!latestPostingsData.postings) {
      logger.error(
        'Most recent Firestore document in collection "researchPostings" missing field "postings".',
      );
      response.status(500).send("Internal server error.");
      return;
    }

    // Validate research postings field matches schema.
    let latestPostings: ResearchPosting[];
    try {
      latestPostings = ResearchPostingSchema.array().parse(
        latestPostingsData.postings,
      );
    } catch (error) {
      logger.error(
        `Latest Firestore document "researchPostings" field "postings" does not match schema: ${error}`,
      );
      response.status(500).send("Internal server error.");
      return;
    }

    // Stores latest postings and timestamp in response locals.
    response.locals.fetchTimestamp = latestPostingsData.fetchTimestamp
      .toDate()
      .toISOString();
    response.locals.postings = latestPostings;
    next();
  } catch (error) {
    logger.error(
      `Error occurred while fetching latest research postings from Firestore: ${error}`,
    );
    response.status(500).send("Internal server error.");
  }
}
