// ./src/hooks/useLoading.ts
//
// Generic, client-only, loading state hook for NextJS client components.

// Explicitly declare as a NextJS client hook.
"use client";

// React essential imports.
import { useState } from "react";

export interface UseLoadingInterface {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export function useLoading(initialState: boolean = false): UseLoadingInterface {
  const [isLoading, setIsLoading] = useState(initialState);
  return { 
    isLoading,
    startLoading: () => { setIsLoading(true) },
    stopLoading: () => { setIsLoading(false) },
  };
}
