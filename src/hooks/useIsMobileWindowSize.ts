// ./src/hooks/useIsMobileWindowSize.ts
//
// Wrapper hook for useWindowSize, (client/browser-only),
// to determine if the current window size is for mobile devices.

// Explicitly declare as a NextJS client-only hook/module.
"use client";

// Local client hook  and utility imports.
import { useWindowSize } from "@hooks/useWindowSize";
import { DEFAULT_DESKTOP_MOBILE_WIDTH_BREAKPOINT } from "@constants/windowConstants";

export default function useIsMobileWindowSize(): boolean {
  // Unconditional hook call (1/1).
  // Get the current window size.
  const windowSize = useWindowSize();

  // Short-circuit and warn if window or window size is undefined.
  if (typeof window === "undefined") {
    console.warn("Warning: window is undefined, note this hook is client-only.");
    return false;
  }

  if (windowSize.width === undefined) {
    console.warn("Warning: window width is undefined, please investigate.");
    return false;
  }

  // Determine if the current window size is for mobile devices.
  return windowSize.width < DEFAULT_DESKTOP_MOBILE_WIDTH_BREAKPOINT;
}
