// ./src/lib/actionCodeSettings.ts
//
// Strictly client-side Firebase auth action code settings,
// for password-less sign-up and sign-in.

// Explicitly declare as a client-side module.
"use client";

// Firebase essential imports.
import { type ActionCodeSettings } from "firebase/auth";

// Local route constant import.
import { AUTH_VERIFY_ROUTE } from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export const actionCodeSettings: ActionCodeSettings = {
    url: `${window.location.origin}${AUTH_VERIFY_ROUTE}`,
    handleCodeInApp: true,
};

// -----------------------------------------------------------------------------
export const DEFAULT_LOCAL_STORAGE_KEY: string = "researchMentorshipEmail";
