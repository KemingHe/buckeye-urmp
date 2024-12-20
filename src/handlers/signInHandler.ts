// ./src/handlers/signInHandler.ts
//
// Client-side async handler for password-less sign-in, 
// explicitly throws errors when sign-in fails.

// Explicitly declare as a client-side module.
"use client";

// NextJS and Firebase essential imports.
import { sendSignInLinkToEmail } from "firebase/auth";

// Local Firebase utility imports.
import { actionCodeSettings, DEFAULT_LOCAL_STORAGE_KEY } from "@lib/actionCodeSettings";
import { fbAuth } from "@lib/firebaseClientApp";

// Local schema and type imports.
import { OSUEmailSchema, type OSUEmail } from "@schemas/OSUEmail";

// -----------------------------------------------------------------------------
export async function signInHandler(
  sanitizedEmail: OSUEmail,
): Promise<void> {
  try {
    // Validate sanitizedEmail.
    OSUEmailSchema.parse(sanitizedEmail);

    // Send sign-in link to user's email address.
    await sendSignInLinkToEmail(fbAuth, sanitizedEmail, actionCodeSettings);

    // Store email in browser's local storage for verification.
    window.localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, sanitizedEmail);

    console.log("Sign-in link sent successfully!");

  // Log and explicitly throw error to caller if sign-in fails.
  } catch (error) {
    const errorMessage: string = 
      `Sign-in failed at signInHandler with error: ${error}`;
      
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
