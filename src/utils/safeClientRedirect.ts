// ./src/utils/safeClientRedirect.ts
//
// Helper function to handle client-side redirects safely,
// by short-circuiting (if already on the correct route),
// (else) setting redirecting state, and using NextJS client router for redirect.

// NextJS essential imports.
import { useRouter } from "next/navigation";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface SafeClientRedirectProps {
  currentRoute    : string;
  targetRoute     : string;
  startRedirecting: () => void;
  clientRouter    : ReturnType<typeof useRouter>;
}

// -----------------------------------------------------------------------------
export function safeClientRedirect({
  currentRoute,
  targetRoute,
  startRedirecting,
  clientRouter,
}: SafeClientRedirectProps): void {
  // Short-circuit if already on the target route.
  if (currentRoute === targetRoute) return;

  // Start redirecting.
  startRedirecting();

  // Redirect to target route.
  clientRouter.push(targetRoute);
}
