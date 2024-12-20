// ./src/guards/CheckBlacklistGuard.tsx
//
// Redirects users to /banned if they are blacklisted.
// Single-duty client-only guard component.
// Uses useAuthContext. Must be nested inside AuthProvider.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential imports.
import React, { type ReactNode, useEffect } from "react";

// Local context import.
import { type AuthContextProps, useAuthContext } from "@contexts/AuthContext";

// Local hook import.
import {
  type UseRedirectingInterface,
  useRedirecting,
} from "@hooks/useRedirecting";

// Local utility import.
import { safeClientRedirect } from "@utils/safeClientRedirect";

// Local route constant imports.
import { BANNED_ROUTE } from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default function CheckBlacklistGuard({
  children,
}: { children: ReactNode }): JSX.Element | null {
  // Auth context state.
  const {
    clientRouter,
    pathname,
    isBlacklisted,
    authContextLoading,
    authContextError,
  }: AuthContextProps = useAuthContext();

  // Redirecting state.
  const { isRedirecting, startRedirecting }: UseRedirectingInterface =
    useRedirecting();

  // ---------------------------------------------------------------------------
  // Redirect to /banned if user is blacklisted.
  useEffect(() => {
    if (
      !authContextLoading &&
      !authContextError &&
      !isRedirecting &&
      // Check if user is blacklisted.
      isBlacklisted
    ) {
      safeClientRedirect({
        currentRoute: pathname,
        targetRoute: BANNED_ROUTE,
        startRedirecting,
        clientRouter,
      });
    }
  }, [
    authContextLoading,
    authContextError,
    isRedirecting,
    isBlacklisted,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null if auth context is loading, errored, or user is blacklisted.
  if (
    authContextLoading ||
    authContextError ||
    isRedirecting ||
    // Prevent unauthorized access to protected routes.
    isBlacklisted
  ) {
    return null;
  }

  // Render children if user is not blacklisted.
  return <>{children}</>;
}
