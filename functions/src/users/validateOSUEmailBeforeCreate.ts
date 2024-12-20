// ./functions/src/users/validateOSUEmailBeforeCreate.ts
//
// Cloud Function for Firebase to validate user's @osu.edu email before each account creation.

import type {
  AuthEventContext,
  AuthUserRecord,
} from "firebase-functions/lib/common/providers/identity";
// Cloud Functions for Firebase SDK imports.
import { auth, logger } from "firebase-functions/v1";

// Local validator imports.
import { validateOSUEmail } from "./validateOSUEmail";

// -----------------------------------------------------------------------------
export const validateOSUEmailBeforeCreate = auth
  .user()
  .beforeCreate((user: AuthUserRecord, context: AuthEventContext): void => {
    logger.info(
      `User "${user.uid}" with email "${user.email}" is creating an account, validating email...`,
    );
    validateOSUEmail(
      // biome-ignore format: added alignment for clarity.
      {
      userId   : user.uid,
      rawEmail : user.email,
      timestamp: context.timestamp,
      action   : "create"
  },
    );
    logger.info(
      "User's @osu.edu email validation successful, proceeding with account creation.",
    );
  });
