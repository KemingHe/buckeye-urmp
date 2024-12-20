// ./src/handlers/approveApplicantHandler.ts
//
// Client-side async handler for approving new mentee and mentor applicants.
// Explicitly throws errors when update fails.

// Explicitly declare as a client-side module.
"use client";

// NextJS and Firestore essential imports.
import {
  collection,
  doc,
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
import { fbStore, fbFunc } from "@lib/firebaseClientApp";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ApplyMenteeHandlerProps {
  applicantId : string;
  startLoading: () => void;
  stopLoading : () => void;
}

export async function approveApplicantHandler({
  applicantId,
  startLoading,
  stopLoading,
}: ApplyMenteeHandlerProps): Promise<void> {
  try {
    startLoading();

    // -------------------------------------------------------------------------
    // Validate applicant document exists at applicantDocRef.
    const applicantDocRef: DocumentReference<DocumentData> = doc(collection(fbStore, "users"), applicantId);
    const applicantDocSnap: DocumentSnapshot<DocumentData> = await getDoc(applicantDocRef);
    if (!applicantDocSnap.exists()) {
      throw new Error(`Applicant document does not exist at applicantDocRef: "${applicantDocRef}".`);
    }

    // -------------------------------------------------------------------------
    // Update applicant document adminApproved field to true.
    await setDoc(
      applicantDocRef,
      { adminApproved: true }, 
      { merge: true },
    );

    // -------------------------------------------------------------------------
    // Update applicant approval timestamp.
    const updateApprovalTimestampOnCall: HttpsCallable = httpsCallable(
      fbFunc, 
      "updateApprovalTimestampOnCall",
    );
    await updateApprovalTimestampOnCall({ applicantId });

    // -------------------------------------------------------------------------
    // Log success message to console.
    console.log("Applicant approved and timestamped successfully!");

  // ---------------------------------------------------------------------------
  // Log and explicitly throw error to caller if mentee application update fails.
  } catch (error) {
    const errorMessage: string = 
      `Applicant approval and timestamp failed with error: ${error}`;
      
    console.error(errorMessage);
    throw new Error(errorMessage);

  // ---------------------------------------------------------------------------
  // Stop loading state on completion or error.  
  } finally {
    stopLoading();
  }
}
