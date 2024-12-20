// ./src/handlers/applyMentorHandler.ts
//
// Client-side async handler for updating user document with mentor application data.
// Explicitly throws errors when update fails.

// Explicitly declare as a client-side module.
"use client";

// NextJS and Firestore essential imports.
import {
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot,
} from "firebase/firestore";
import {
  httpsCallable,
  type HttpsCallable,
} from "firebase/functions";

// Local Firebase client app service import.
import { fbFunc } from "@lib/firebaseClientApp";

// Local schema and type imports.
import { ApplyMentorFieldsSchema, type ApplyMentorFields } from "@src/schemas/ApplyMentorFields";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ApplyMentorHandlerProps {
  userDocRef     : DocumentReference<DocumentData>;
  sanitizedFields: ApplyMentorFields;
}

export async function applyMentorHandler({
  userDocRef,
  sanitizedFields,
}: ApplyMentorHandlerProps): Promise<void> {
  try {
    // ---------------------------------------------------------------------------
    // Validate user document exists at userDocRef.
    const userDocSnap: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error(`User document does not exist at userDocRef: "${userDocRef}".`);
    }

    // Validate sanitized data.
    ApplyMentorFieldsSchema.parse(sanitizedFields);

    // ---------------------------------------------------------------------------
    // Update user document with sanitized mentor application data.
    await setDoc(
      userDocRef, 
      // biome-ignore format: added alignment for clarity.
      {
        // Must be placed at the beginning to avoid overwriting custom fields.
        ...sanitizedFields,

        // Custom fields.
        proficientLanguages :
          sanitizedFields.proficientLanguages.length === 0
          ? null
          : sanitizedFields.proficientLanguages,
        currentMajors       : sanitizedFields.currentMajors.sort(),
        preProfessionalRoute:
          sanitizedFields.preProfessionalRoute === "Not Applicable"
          ? null
          : sanitizedFields.preProfessionalRoute,
        userType            : "mentor",
        adminApproved       : false,
      },
      { merge: true },
    );

    // -------------------------------------------------------------------------
    // Update user (mentor) application timestamp.
    const updateApplicationTimestampOnCall: HttpsCallable = httpsCallable(
      fbFunc, 
      "updateApplicationTimestampOnCall",
    );
    await updateApplicationTimestampOnCall();

    // -------------------------------------------------------------------------
    // Log success message to console.
    console.log("Mentor application updated successfully!");
  
  // ---------------------------------------------------------------------------
  // Log and explicitly throw error to caller if mentor application update fails.
  } catch (error) {
    const errorMessage: string =
      `Mentor application update failed at applyMentorHandler with error: ${error}`;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
