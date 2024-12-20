// ./src/hooks/useAcceptAgreement.ts
//
// Generic, client-only, agreement acceptance hook for NextJS client components.

// Explicitly declare as a NextJS client hook.
"use client";

// React essential imports.
import { useState } from "react";

// biome-ignore format: added alignment for clarity.
export interface UseAcceptAgreementInterface {
  accepted       : boolean;
  acceptAgreement: () => void;
}

export function useAcceptAgreement(): UseAcceptAgreementInterface {
  const [accepted, setAccepted] = useState(false);
  return {
    accepted,
    acceptAgreement: () => { setAccepted(true) },
  };
}
