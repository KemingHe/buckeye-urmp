// ./src/hooks/useHandlerErrored.ts
//
// Generic, client-only, error flag hook for form handlers in NextJS client components.

// Explicitly declare as a NextJS client hook.
"use client";

// React essential imports.
import { useState } from "react";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface UseHandlerErroredInterface {
  handlerErrored   : boolean;
  setHandlerErrored: (value: boolean) => void;
}

export function useHandlerErrored(initialState: boolean = false): UseHandlerErroredInterface {
  const [handlerErrored, setHandlerErrored] = useState(false);
  return { handlerErrored, setHandlerErrored };
}
