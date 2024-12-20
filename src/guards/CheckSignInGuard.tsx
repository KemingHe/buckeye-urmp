// ./src/guards/CheckSignInGuard.tsx
//
// Redirects users away if they are already authenticated.
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

// Local hook import.
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
  SUPER_ADMIN_DASHBOARD_ROUTE,
} from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default function CheckSignInGuard({
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

  // User context state.
  const { userData, userContextLoading, userContextError }: UserContextProps =
    useUserContext();

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
      !userContextLoading &&
      !userContextError &&
      !isRedirecting &&
      // Check if user is authenticated, and user data is available.
      user &&
      userData
    ) {
      // -------------------------------------------------------------------
      // Redirect to super admin dashboard if user is a super admin.
      if (userData.userType === "superAdmin") {
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: SUPER_ADMIN_DASHBOARD_ROUTE,
          startRedirecting,
          clientRouter,
        });
        return;
      }

      // Redirect to admin dashboard if user is an admin.
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
  }, [
    authContextLoading,
    authContextError,
    userContextLoading,
    userContextError,
    user,
    userData,
    isRedirecting,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null if auth context is loading, errored, or user is authenticated.
  if (
    authContextLoading ||
    authContextError ||
    userContextLoading ||
    userContextError ||
    isRedirecting ||
    // Prevent unauthorized access to protected routes.
    user
  ) {
    return null;
  }

  // Render children if user is not authenticated.
  return <>{children}</>;
}
