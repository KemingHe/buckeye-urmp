// ./functions/src/users/validateOSUEmailBeforeSignIn.ts
//
// Cloud Function for Firebase to validate user's @osu.edu email before each sign-in.

import type {
  AuthEventContext,
  AuthUserRecord,
} from "firebase-functions/lib/common/providers/identity";
// Cloud Functions for Firebase SDK imports.
import { auth, logger } from "firebase-functions/v1";

// Local validator imports.
import { validateOSUEmail } from "./validateOSUEmail";

// -----------------------------------------------------------------------------
export const validateOSUEmailBeforeSignIn = auth
  .user()
  .beforeSignIn((user: AuthUserRecord, context: AuthEventContext): void => {
    logger.info(
      `User "${user.uid}" with email "${user.email}" is signing in, validating email...`,
    );
    validateOSUEmail(
      // biome-ignore format: added alignment for clarity.
      {
      userId   : user.uid,
      rawEmail : user.email,
      timestamp: context.timestamp,
      action   : "sign-in"
  },
    );
    logger.info(
      "User's @osu.edu email validation successful, proceeding with sign-in.",
    );
  });
