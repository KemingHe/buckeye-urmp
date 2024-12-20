// ./src/hooks/useRedirecting.ts
//
// Generic, client-only, redirecting state hook for NextJS client components.

// Explicitly declare as a NextJS client hook.
"use client";

// React essential imports.
import { useState } from "react";

// biome-ignore format: added alignment for clarity.
export interface UseRedirectingInterface {
  isRedirecting   : boolean;
  startRedirecting: () => void;
}

export function useRedirecting(): UseRedirectingInterface {
  const [isRedirecting, setIsRedirecting] = useState(false);
  return {
    isRedirecting,
    startRedirecting: () => { setIsRedirecting(true) },
  };
}
