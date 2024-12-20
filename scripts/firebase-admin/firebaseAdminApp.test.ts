// ./scripts/firebase-admin/firebaseAdminApp.test.ts
//
// Behavior test for Firebase Admin app initialization.

// Vitest essential imports.
import { describe, it, expect } from "vitest";

// Local test target imports.
import { firebaseAdminApp } from "@scripts/firebase-admin/firebaseAdminApp";

// -----------------------------------------------------------------------------
// Behavior test suite for firebaseAdminApp.
describe("firebaseAdminApp synchronous function", () => {
  it("when user is logged in via firebase-tools cli, initializes the Firebase Admin app and objects", () => {
    // Initialize Firebase Admin app.
    const fbAdminApp = firebaseAdminApp();

    // Test Firebase Admin app initialization.
    expect(fbAdminApp).toBeDefined();
    expect(fbAdminApp.fbAdminApp).toBeDefined();
    expect(fbAdminApp.fbAdminAuth).toBeDefined();
    expect(fbAdminApp.fbAdminStore).toBeDefined();
  });
});
