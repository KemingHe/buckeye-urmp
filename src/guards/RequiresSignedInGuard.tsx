// ./src/guards/RequiresSignedInGuard.tsx
//
// Redirects users to home to sign in/up if they are not authenticated.
// Single-duty client-only guard component.
// Uses auth context. Must be nested inside AuthProvider.

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
import { HOME_ROUTE } from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default function RequiresSignedInGuard({
  children,
}: { children: ReactNode }): JSX.Element | null {
  // Auth context state.
  const {
    clientRouter,
    pathname,
    user,
    authContextLoading,
    authContextError,
  }: AuthContextProps = useAuthContext();

  // Redirecting state.
  const { isRedirecting, startRedirecting }: UseRedirectingInterface =
    useRedirecting();

  // ---------------------------------------------------------------------------
  // Make sure all loading is complete, no errors, and not redirecting.
  // Then check if user is authenticated.
  useEffect(() => {
    if (
      !authContextLoading &&
      !authContextError &&
      !isRedirecting &&
      // Check if user is authenticated.
      !user
    ) {
      // -----------------------------------------------------------------------
      // Redirect to home if user is not authenticated.
      safeClientRedirect({
        currentRoute: pathname,
        targetRoute: HOME_ROUTE,
        startRedirecting,
        clientRouter,
      });
    }
  }, [
    authContextLoading,
    authContextError,
    user,
    isRedirecting,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null if auth context is loading, errored, or user is not authenticated.
  if (
    authContextLoading ||
    authContextError ||
    isRedirecting ||
    // Prevent unauthorized access to protected routes.
    !user
  ) {
    return null;
  }

  // Render children if user is authenticated.
  return <>{children}</>;
}
