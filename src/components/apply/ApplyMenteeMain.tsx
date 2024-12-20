// ./src/components/apply/ApplyMenteeMain.tsx
//
// Dynamic, client-only mentee application main component,
// renders first the agreement, then the applicaiton form.
// Wrapped in auth, user providers and guards by parent component.

// Explicitly declare as a NextJS client component.
"use client";

// Local component imports.
import ApplyMenteeAgreement from "@components/apply/ApplyMenteeAgreement";
import ApplyMenteeForm from "@components/apply/ApplyMenteeForm";

// Local hook imports.
import {
  type UseAcceptAgreementInterface,
  useAcceptAgreement,
} from "@hooks/useAcceptAgreement";

// -----------------------------------------------------------------------------
export default function ApplyMenteeMain(): JSX.Element {
  // Agreement acceptance state.
  const { accepted, acceptAgreement }: UseAcceptAgreementInterface =
    useAcceptAgreement();

  // ---------------------------------------------------------------------------
  // Render agreement or form based on acceptance state.
  if (!accepted) {
    return <ApplyMenteeAgreement acceptAgreement={acceptAgreement} />;
  }

  return <ApplyMenteeForm />;
}
