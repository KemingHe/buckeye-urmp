// ./functions/src/firestore/createUserProfileOnCreate.ts
//
// Gen 1 Cloud Function for Firebase to create user profile in Firestore on each user creation.

// Cloud Functions for Firebase SDK imports.
import { type EventContext, auth, logger } from "firebase-functions/v1";

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
export const createUserProfileOnCreate = auth
  .user()
  .onCreate(
    async (user: auth.UserRecord, context: EventContext): Promise<void> => {
      // Log start of user profile creation.
      logger.info(
        `At ${context.timestamp}, user profile creation for user with document id ${user.uid} started.`,
      );

      try {
        const userDocRef: DocumentReference = fbStore
          .collection("users")
          .doc(user.uid);
        await userDocRef.set(
          // biome-ignore format: added alignment for clarity.
          {
        // System info.
        id               : user.uid,
        metadata: {
          // Account creation and login timestamps.
          creationTimestamp: FieldValue.serverTimestamp(),
          lastLoggedInTimestamp: null,

          // Application and action timestamps.
          applicationTimestamp: null,
          approvalTimestamp: null,
          waitlistTimestamp: null,
          blacklistTimestamp: null,
        },

        // Generic info.
        userType         : "newSignUp",
        emailAddress     : user.email,
    },
        );
      } catch (error) {
        // Log error if user profile creation fails.
        logger.error(
          `At ${context.timestamp}, error occurred while creating user profile in Firestore: ${error}`,
        );
        return;
      }

      // Log user profile creation success.
      logger.info(
        `At ${context.timestamp}, user profile creation for user with document id ${user.uid} completed.`,
      );
      return;
    },
  );
