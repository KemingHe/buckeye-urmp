// ./functions/src/users/updateLastLoggedInTimestampOnCall.ts
//
// Cloud Function for Firebase to update the last logged-in timestamp for a user
// when they call this function, only responding to client SDK calls.

// Cloud Functions for Firebase SDK imports.
import { logger } from "firebase-functions/v1";
import {
  type CallableContext,
  HttpsError,
  onCall,
} from "firebase-functions/v1/https";

// Firebase Admin SDK imports.
import {
  type DocumentReference,
  FieldValue,
  type Firestore,
  getFirestore,
} from "firebase-admin/firestore";

// -----------------------------------------------------------------------------
// Get Firebase Admin Firestore instance.
const fbStore: Firestore = getFirestore();

// -----------------------------------------------------------------------------
// Define allowed origins for the web app.
export const allowedOrigins: string[] = [
  "https://research.osu.dev",
  "https://research.preview-osu.dev",
  "http://localhost:3000",
];

// -----------------------------------------------------------------------------
export const updateLastLoggedInTimestampOnCall = onCall(
  // biome-ignore lint/suspicious/noExplicitAny: any is used here per official Firebase documentation.
  async (data: any, context: CallableContext): Promise<void> => {
    // Validate the Origin of the request to be from the web app.
    // Normalize by remove trailing slashes from origin if present.
    const origin: string | undefined =
      context.rawRequest.headers.origin?.replace(/\/$/, "");
    const ip: string | undefined = context.rawRequest.ip;

    logger.info(
      `User "${context.auth?.uid}" called "${updateLastLoggedInTimestampOnCall.name}" from ip "${ip}" and origin "${origin}", begin security checking, then timestamp update...`,
    );

    // Validate the Origin of the request to be from the web app.
    if (origin === undefined || !allowedOrigins.includes(origin)) {
      logger.error(
        `Unauthorized call to "${updateLastLoggedInTimestampOnCall.name}" with invalid origin "${origin}".`,
      );
      throw new HttpsError(
        "permission-denied",
        "Unauthorized call to this function.",
      );
    }

    // Validate user context, ensure user is signed-in.
    if (!context.auth || !context.auth.uid) {
      logger.error(
        `Unauthorized call to "${updateLastLoggedInTimestampOnCall.name}" with invalid user auth context, make sure user is logged in.`,
      );
      throw new HttpsError(
        "unauthenticated",
        "Unauthorized call to this function.",
      );
    }

    // ---------------------------------------------------------------------------
    logger.info("Caller passed security validation, begin timestamp update...");

    // Get user document reference, and update user's last logged-in timestamp.
    const userRef: DocumentReference = fbStore
      .collection("users")
      .doc(context.auth.uid);
    try {
      await userRef.set(
        {
          metadata: {
            lastLoggedInTimestamp: FieldValue.serverTimestamp(),
          },
        },
        { merge: true },
      );
    } catch (error) {
      logger.error(
        `Error occurred while updating user "${context.auth.uid}"'s "metadata.lastLoggedInTimestamp": ${error}`,
      );
      throw new HttpsError(
        "internal",
        "Error occurred while updating user's last logged-in timestamp.",
      );
    }

    // Log successful update.
    logger.info("User last logged-in timestamp updated successfully.");
  },
);
