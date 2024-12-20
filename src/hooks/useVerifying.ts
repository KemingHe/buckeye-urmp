// ./src/hooks/useVerifying.ts
//
// Generic, client-only, verifying state hook for the verify main component.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential imports.
import { useState } from "react";

// biome-ignore format: added alignment for clarity.
export interface UseVerifyingInterface {
  isVerifying   : boolean;
  startVerifying: () => void;
}

export function useVerifying(): UseVerifyingInterface {
  const [isVerifying, setIsVerifying] = useState(false);
  return {
    isVerifying,
    startVerifying: () => { setIsVerifying(true) },
  };
}
