// ./src/handlers/bugReportHandler.ts
//
// Client-side async handler for adding a new bug report to the Firestore database.
// Explicitly throws errors when creation fails.

// Explicitly declare as a client-side module.
"use client";

// NextJS and Firestore essential imports.
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

// Local Firebase Auth and Firestore utility imports.
import { fbStore } from "@lib/firebaseClientApp";

// Local schema and type imports.
import { OSUEmailSchema, type OSUEmail } from "@schemas/OSUEmail";
import { BugReportFieldsSchema, type BugReportFields } from "@schemas/BugReportFields";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface BugReportHandlerProps {
  contact        : OSUEmail | null;
  sanitizedFields: BugReportFields;
}

// -----------------------------------------------------------------------------
export async function bugReportHandler({ 
  contact,
  sanitizedFields,
}: BugReportHandlerProps): Promise<void> {

  // ---------------------------------------------------------------------------
  try {
    // Validate contact and sanitizedFields.
    if (contact !== null) OSUEmailSchema.parse(contact);
    BugReportFieldsSchema.parse(sanitizedFields);

    // Create Firestore document with sanitized bug report data.
    await addDoc(collection(fbStore, "bugReports"), {

      // Must be placed at the beginning to avoid overwriting custom fields.
      ...sanitizedFields,

      // Custom fields.
      contact,
      creationTimestamp: serverTimestamp(),
    });

    console.log("Bug report created successfully!");

  // ---------------------------------------------------------------------------
  // Log and explicitly throw error to caller if bug report creation fails.
  } catch (error) {
    const errorMessage: string = 
      `Bug report creation failed at bugReportHandler with error: ${error}`;
      
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
