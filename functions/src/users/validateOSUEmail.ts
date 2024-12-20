// ./functions/src/auth/validateOSUEmail.ts
//
// Utility function to validate OSU email,
// uses v1 logger and auth from Firebase Functions SDK.
// Throws v1 HttpsError if email is missing or invalid.

// Cloud Functions for Firebase SDK imports.
import { auth, logger } from "firebase-functions/v1";

// Validator imports.
import { isOSUDotEduEmail } from "@keminghe/osu";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ValidateOSUEmailProps {
  userId   : string;
  rawEmail : string | undefined;
  timestamp: string;
  action   : string;
}

// -----------------------------------------------------------------------------
export function validateOSUEmail({
  userId,
  rawEmail,
  timestamp,
  action,
}: ValidateOSUEmailProps): void {
  // Validate email exists.
  if (!rawEmail) {
    logger.error(
      `At ${timestamp}, user ${userId} attempted ${action} with missing email field.`,
    );
    throw new auth.HttpsError(
      "invalid-argument",
      `Missing email field at user ${action}.`,
    );
  }

  // Validate email matches @osu.edu format.
  if (!isOSUDotEduEmail(rawEmail)) {
    logger.error(
      `At ${timestamp}, user ${userId} attempted ${action} with invalid OSU email: ${rawEmail}.`,
    );
    throw new auth.HttpsError(
      "invalid-argument",
      `Must use @osu.edu email at user ${action}.`,
    );
  }
}
