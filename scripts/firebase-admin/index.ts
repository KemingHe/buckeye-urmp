// ./scripts/firebase-admin/index.ts
//
// Entrypoint for Firebase Admin-related scripts.

// Local script module imports.
import moveTimestampsToMetadataInUsersCollection from "@scripts/firebase-admin/moveTimestampsToMetadataInUsersCollection";

// -----------------------------------------------------------------------------
async function main(): Promise<void> {
  // Move all timestamp fields to metadata in users collection.
  await moveTimestampsToMetadataInUsersCollection();
}

// -----------------------------------------------------------------------------
// Main script execution.
main();
