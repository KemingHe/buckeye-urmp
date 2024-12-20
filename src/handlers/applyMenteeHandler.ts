// ./src/handlers/applyMenteeHandler.ts
//
// Client-side async handler for updating user document with mentee application data.
// Explicitly throws errors when update fails.

// Explicitly declare as a client-side module.
"use client";

// NextJS and Firestore essential imports.
import {
  getDoc,
  setDoc,
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot
} from "firebase/firestore";
import {
  httpsCallable,
  type HttpsCallable,
} from "firebase/functions";

// Local Firebase client app service import.
import { fbFunc } from "@lib/firebaseClientApp";

// Local schema and type imports.
import { ApplyMenteeFieldsSchema, type ApplyMenteeFields } from "@src/schemas/ApplyMenteeFields";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ApplyMenteeHandlerProps {
  userDocRef     : DocumentReference<DocumentData>;
  sanitizedFields: ApplyMenteeFields;
}

export async function applyMenteeHandler({
  userDocRef,
  sanitizedFields,
}: ApplyMenteeHandlerProps): Promise<void> {
  try {

    // -------------------------------------------------------------------------
    // Validate user document exists at userDocRef.
    const userDocSnap: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error(`User document does not exist at userDocRef: "${userDocRef}".`);
    }

    // Validate sanitized data.
    ApplyMenteeFieldsSchema.parse(sanitizedFields);

    // -------------------------------------------------------------------------
    // Update user document with sanitized mentee application data.
    await setDoc(
      userDocRef, 
      // biome-ignore format: added alignment for clarity.
      {
        // Must be placed at the beginning to avoid overwriting custom fields.
        ...sanitizedFields,

        // Custom fields.
        currentMajors       : sanitizedFields.currentMajors.sort(),
        preProfessionalRoute:  
          sanitizedFields.preProfessionalRoute === "Not Applicable" 
          ? null 
          : sanitizedFields.preProfessionalRoute,
        userType            : "mentee",
        adminApproved       : false,
      }, 
      { merge: true },
    );

    // -------------------------------------------------------------------------
    // Update user (mentee) application timestamp.
    const updateApplicationTimestampOnCall: HttpsCallable = httpsCallable(
      fbFunc, 
      "updateApplicationTimestampOnCall",
    );
    await updateApplicationTimestampOnCall();

    // -------------------------------------------------------------------------
    // Log success message to console.
    console.log("Mentee application updated successfully!");

  // ---------------------------------------------------------------------------
  // Log and explicitly throw error to caller if mentee application update fails.
  } catch (error) {
    const errorMessage: string = 
      `Mentee application update failed at applyMenteeHandler with error: ${error}`;
      
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
