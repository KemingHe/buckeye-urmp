// ./src/components/apply/ApplyMentorMain.tsx
//
// Dynamic, client-only mentor application main component,
// renders first the agreement, then the applicaiton form.
// Wrapped in auth, user providers and guards by parent component.

// Explicitly declare as a NextJS client component.
"use client";

// Local component imports.
import ApplyMentorAgreement from "@components/apply/ApplyMentorAgreement";
import ApplyMentorForm from "@components/apply/ApplyMentorForm";

// Local hook imports.
import {
  type UseAcceptAgreementInterface,
  useAcceptAgreement,
} from "@hooks/useAcceptAgreement";

// -----------------------------------------------------------------------------
export default function ApplyMentorMain(): JSX.Element {
  // Agreement acceptance state.
  const { accepted, acceptAgreement }: UseAcceptAgreementInterface =
    useAcceptAgreement();

  // ---------------------------------------------------------------------------
  // Render agreement or form based on acceptance state.
  if (!accepted) {
    return <ApplyMentorAgreement acceptAgreement={acceptAgreement} />;
  }

  return <ApplyMentorForm />;
}
