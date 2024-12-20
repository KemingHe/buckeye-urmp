// ./scripts/firebase-admin/moveFieldsToParent.ts
//
// Per document in the collection, moves fields from the root
// to a new parent field, then deletes the root fields.
// If a field doesn't exist, it will be created with a null value.
// Overwrite existing parent fields with the same name.

// Firebase Admin essential imports.
import {
  type Firestore,
  type CollectionReference,
  type DocumentSnapshot,
  type Query,
  type QuerySnapshot,
  type WriteBatch,
  type DocumentData,
  FieldValue,
} from "firebase-admin/firestore";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MoveFieldsToParentProps {
  adminStore    : Firestore;
  batchSize     : number;
  collectionPath: string;
  fieldsToMove  : string[];
  targetField   : string;
}

// -----------------------------------------------------------------------------
export async function moveFieldsToParent({
  adminStore,
  batchSize,
  collectionPath,
  fieldsToMove,
  targetField,
}: MoveFieldsToParentProps): Promise<void> {
  // Initialize the Firestore collection reference.
  const collectionRef: CollectionReference = adminStore.collection(collectionPath);
  
  // Track the last document processed and the count of processed documents.
  let lastDocument: DocumentSnapshot | undefined = undefined;
  let processedCount: number = 0;

  // Iterate over and process the whole collection in batches.
  console.log(`Start processing collection "${collectionPath}" in batches of ${batchSize}...`);
  do {
    // To iterate, query with pagination: 
    // first order by name, then limit to batch size,
    // then start after if there is a last document.
    let batchQuery: Query = collectionRef.orderBy("__name__").limit(batchSize);
    if (lastDocument !== undefined) {
      batchQuery = batchQuery.startAfter(lastDocument);
    }

    // Obtain a snapshot of the latest batch query of documents.
    const batchSnapshot: QuerySnapshot = await batchQuery.get();

    // Short-circuit if no documents are found in the batch.
    if (batchSnapshot.empty) {
      console.log("No documents found in new batch, exiting processing loop.");
      break;
    }
    console.log(`Processing latest batch of ${batchSnapshot.docs.length} documents...`);

    // Process each document in the batch.
    const batchOps: WriteBatch = adminStore.batch();
    for (const doc of batchSnapshot.docs) {
      // Obtain current doc data, then target field data, create if not exists.
      const docData: DocumentData = doc.data();
      const targetFieldData: Record<string, any> = docData[targetField] || {};

      // Iterate over fields to move,
      for (const field of fieldsToMove) {
        // ...move to target field,
        if (docData.hasOwnProperty(field)) {
          targetFieldData[field] = docData[field];

        } else {
          // Retain existing target field data if field doesn't exist in root.
          // Create field in target field and set to null if it doesn't exist.
          if (!targetFieldData.hasOwnProperty(field)) {
            targetFieldData[field] = null;
          }
        }
          
        // ...then delete from root.
        docData[field] = FieldValue.delete();
      }

      // Update the document with the new parent field data.
      batchOps.update(doc.ref, {
        [targetField]: targetFieldData,
        ...docData,
      });
    }

    // Commit the batch operations to Firestore.
    await batchOps.commit();

    // Update the last document processed and the count of processed documents.
    const currentBatchSize: number = batchSnapshot.docs.length;
    lastDocument = batchSnapshot.docs[currentBatchSize - 1];
    processedCount += currentBatchSize;

  } while (lastDocument !== undefined);
}
