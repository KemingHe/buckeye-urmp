// ./src/guards/AuthGuard.tsx
//
// Composite guard component,
// first checks if user is blacklisted,
// then checks if user is authenticated.
// Uses useAuthContext. Must be nested inside AuthProvider.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential imports.
import type { ReactNode } from "react";

// Local component imports.
import CheckBlacklistGuard from "@guards/CheckBlacklistGuard";
import RequiresSignedInGuard from "@guards/RequiresSignedInGuard";

// -----------------------------------------------------------------------------
export default function AuthGuard({
  children,
}: { children: ReactNode }): JSX.Element {
  return (
    <CheckBlacklistGuard>
      <RequiresSignedInGuard>{children}</RequiresSignedInGuard>
    </CheckBlacklistGuard>
  );
}
