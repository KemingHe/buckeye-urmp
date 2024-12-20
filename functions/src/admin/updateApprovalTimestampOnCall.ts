// ./functions/src/users/updateApprovalTimestampOnCall.ts
//
// Cloud Function for Firebase to update the (admin) approval timestamp
// for a user with a given id when a logged in admin calls this function
// through the Firebase client sdk.

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
interface UpdateApprovalTimestampOnCallData {
  applicantId: string;
}

export const updateApprovalTimestampOnCall = onCall(
  async (
    data: UpdateApprovalTimestampOnCallData,
    context: CallableContext,
  ): Promise<void> => {
    // Validate the Origin of the request to be from the web app.
    // Normalize by remove trailing slashes from origin if present.
    const origin: string | undefined =
      context.rawRequest.headers.origin?.replace(/\/$/, "");
    const ip: string | undefined = context.rawRequest.ip;

    logger.info(
      `User "${context.auth?.uid}" called "${updateApprovalTimestampOnCall.name}" from ip "${ip}" and origin "${origin}", begin security checking, then timestamp update...`,
    );

    // Validate the Origin of the request to be from the web app.
    if (origin === undefined || !allowedOrigins.includes(origin)) {
      logger.error(
        `Unauthorized call to "${updateApprovalTimestampOnCall.name}" with invalid origin "${origin}".`,
      );
      throw new HttpsError(
        "permission-denied",
        "Unauthorized call to this function.",
      );
    }

    // Validate user context, ensure user is signed-in.
    if (!context.auth || !context.auth.uid) {
      logger.error(
        `Unauthorized call to "${updateApprovalTimestampOnCall.name}" with invalid user auth context, make sure user is logged in.`,
      );
      throw new HttpsError(
        "unauthenticated",
        "Unauthorized call to this function.",
      );
    }

    // TODO: added check that user type is admin.

    // Validate the data passed by the caller.
    if (!data.applicantId) {
      logger.error(
        `Invalid data passed to "${updateApprovalTimestampOnCall.name}" by user "${context.auth.uid}".`,
      );
      throw new HttpsError(
        "invalid-argument",
        "Invalid data passed to this function.",
      );
    }

    // TODO: added check that applicantId is a valid user id.

    // ---------------------------------------------------------------------------
    logger.info("Caller passed security validation, begin timestamp update...");

    // Get user document reference, and update applicant at given id's approval timestamp.
    const userRef: DocumentReference = fbStore
      .collection("users")
      .doc(data.applicantId);
    try {
      await userRef.set(
        {
          metadata: {
            approvalTimestamp: FieldValue.serverTimestamp(),
          },
        },
        { merge: true },
      );
    } catch (error) {
      logger.error(
        `Error occurred while updating applicant "${context.auth.uid}"'s "metadata.approvalTimestamp": ${error}`,
      );
      throw new HttpsError(
        "internal",
        "Error occurred while updating applicant's approval timestamp.",
      );
    }

    // Log successful update.
    logger.info("Applicant approval timestamp updated successfully.");
  },
);
