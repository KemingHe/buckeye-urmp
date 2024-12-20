// ./scripts/firebase-admin/moveTimestampsToMetadataInUsersCollection.ts
//
// For each document in the users collection in default Firestore database,
// move all timestamp fields to the metadata field and delete them from
// the root of the document.

// Local Firebase Admin app import.
import { fbAdminStore } from "@scripts/firebase-admin/firebaseAdminApp";

// Local utility import.
import { moveFieldsToParent } from "@scripts/firebase-admin/moveFieldsToParent";

// -----------------------------------------------------------------------------
export default async function moveTimestampsToMetadataInUsersCollection(): Promise<void> {
  try {
    await moveFieldsToParent({
      adminStore    : fbAdminStore,
      batchSize     : 100,
      collectionPath: "users",
      fieldsToMove  : [
        "creationTimestamp",
        "applicationTimestamp",
        "lastLoggedInTimestamp",
      ],
      targetField   : "metadata",
    });
    console.log("Successfully move all timestamp fields to metadata in users collection.");
  } catch (error) {
    console.error(`Failure in "${moveTimestampsToMetadataInUsersCollection.name}":`, error);
  }
}
