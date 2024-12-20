// ./functions/src/index.ts
//
// Cloud Functions for Firebase entry point, exports all functions for deployment.

// Firebase Admin SDK imports.
import { initializeApp } from "firebase-admin/app";

// Initialize the Firebase Admin SDK for all functions.
initializeApp();

// Admin functions.
export { updateApprovalTimestampOnCall } from "./admin/updateApprovalTimestampOnCall";

// Users functions.
export { validateOSUEmailBeforeCreate } from "./users/validateOSUEmailBeforeCreate";
export { validateOSUEmailBeforeSignIn } from "./users/validateOSUEmailBeforeSignIn";
export { createUserProfileOnCreate } from "./users/createUserProfileOnCreate";
export { updateLastLoggedInTimestampOnCall } from "./users/updateLastLoggedInTimestampOnCall";
export { updateApplicationTimestampOnCall } from "./users/updateApplicationTimestampOnCall";

// Research postings functions.
export { cronFetchResearchPostings } from "./researchPostings/cronFetchResearchPostings";
export { serveLatestResearchPostings } from "./researchPostings/serveLatestResearchPostings";
export { preWarmResearchPostingsCache } from "./researchPostings/preWarmResearchPostingsCache";
