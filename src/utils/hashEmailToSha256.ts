// ./src/utils/hashEmailToSha256.ts
//
// Utility function using the node native crypto module to 
// normalize (mimick Firebase Auth) then hash an email to a SHA-256 hash.

// Node native crypto module import.
import { createHash } from "crypto";

// -----------------------------------------------------------------------------
export default function hashEmailToSha256(email: string): string {
  // Short-circuit and return empty string if email is empty.
  if (email === "") return "";

  // Normalize email: trim and lowercase.
  const normalizedEmail: string = email.trim().toLowerCase();

  // Create a SHA-256 hash of the normalized email.
  return createHash("sha256").update(normalizedEmail).digest("hex");
}
