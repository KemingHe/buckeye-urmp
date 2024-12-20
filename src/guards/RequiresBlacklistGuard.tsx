// ./src/guards/RequiresBlacklistGuard.tsx
//
// Redirects users away from the /banned page if they are NOT blacklisted.
// Single-duty client-only guard component.
// Uses both useAuthContext and useUserContext.
// Must be nested inside UserProvider.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential imports.
import React, { type ReactNode, useEffect } from "react";

// Local context import.
import { type AuthContextProps, useAuthContext } from "@contexts/AuthContext";
import { type UserContextProps, useUserContext } from "@contexts/UserContext";

// Local hook imports.
import {
  type UseRedirectingInterface,
  useRedirecting,
} from "@hooks/useRedirecting";

// Local utility import.
import { safeClientRedirect } from "@utils/safeClientRedirect";

// Local route constant imports.
import {
  ADMIN_DASHBOARD_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  SUPER_ADMIN_DASHBOARD_ROUTE,
} from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default function RequiresBlacklistGuard({
  children,
}: { children: ReactNode }): JSX.Element | null {
  // Auth context state.
  const {
    clientRouter,
    pathname,
    user,
    isBlacklisted,
    authContextLoading,
    authContextError,
  }: AuthContextProps = useAuthContext();

  // User context state.
  const { userData, userContextLoading, userContextError }: UserContextProps =
    useUserContext();

  // Redirecting state.
  const { isRedirecting, startRedirecting }: UseRedirectingInterface =
    useRedirecting();

  // ---------------------------------------------------------------------------
  // Make sure all loading is complete, no errors, and not redirecting.
  // Then check if user is blacklisted.
  useEffect(() => {
    if (
      !authContextLoading &&
      !authContextError &&
      !userContextLoading &&
      !userContextError &&
      !isRedirecting &&
      // Check if user is blacklisted.
      !isBlacklisted
    ) {
      // -----------------------------------------------------------------------
      // Redirect to home if user is not blacklisted, AND not authenticated.
      if (!user) {
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: HOME_ROUTE,
          startRedirecting,
          clientRouter,
        });
        return;
      }

      // ---------------------------------------------------------------------
      if (user && userData) {
        // Redirect to super admin dashboard if is not blacklisted, AND an authenticated super admin.
        if (userData.userType === "superAdmin") {
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: SUPER_ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

        // Redirect to admin dashboard if is not blacklisted, AND an authenticated admin.
        if (userData.userType === "admin") {
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

        // -------------------------------------------------------------------
        // Redirect to regular user dashboard otherwise.
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: DASHBOARD_ROUTE,
          startRedirecting,
          clientRouter,
        });
      }
    }
  }, [
    authContextLoading,
    authContextError,
    userContextLoading,
    userContextError,
    isRedirecting,
    isBlacklisted,
    user,
    userData,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null if auth context or user context is loading or errored.
  if (
    authContextLoading ||
    authContextError ||
    userContextLoading ||
    userContextError ||
    isRedirecting ||
    // Prevent unauthorized access to protected routes.
    !isBlacklisted
  ) {
    return null;
  }

  // Render children if user is blacklisted.
  return <>{children}</>;
}
