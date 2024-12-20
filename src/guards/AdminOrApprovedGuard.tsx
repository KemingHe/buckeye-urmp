// ./src/guards/AdminOrApprovedGuard.tsx
//
// Guard for pages like /mentors that checks user auth and data,
// and only allows access for admin or admin approved user.
// Redirects users to home or dashboard if check fails.
// Single-duty client-only guard component.
// Uses useAuthContext and useUserContext. Must be nested inside UserProvider.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential import.
import React from "react";

// React essential imports.
import { type ReactNode, useEffect } from "react";

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
import { DASHBOARD_ROUTE, HOME_ROUTE } from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default function AdminOrApprovedGuard({
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
  // Local function to check if user is admin or approved.
  function verifyAdminOrApproved(): boolean {
    // Fail if user data or user type is not available.
    if (!userData || !userData.userType) return false;

    // Short-circuit if user is admin.
    if (userData.userType === "superAdmin" || userData.userType === "admin")
      return true;

    // Short-circuit if user is approved.
    if (userData.adminApproved) return true;

    return false;
  }

  // ---------------------------------------------------------------------------
  // Redirect to home or dashboard if user is not admin or approved.
  useEffect(() => {
    // Wait for auth and user context to load before checking admin or approved.
    if (
      !authContextLoading &&
      !authContextError &&
      !userContextLoading &&
      !userContextError &&
      !isRedirecting
    ) {
      // -----------------------------------------------------------------------
      // Short-circuit and redir to home if user is not authenticated.
      if (!user) {
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: HOME_ROUTE,
          startRedirecting,
          clientRouter,
        });
        return;
      }

      // -----------------------------------------------------------------------
      // Check if user is admin or approved, skip if user data is not yet available.
      if (
        user &&
        userData &&
        userData.userType &&
        // Perform check after user data is available.
        !verifyAdminOrApproved()
      ) {
        // Redirect to regular dashboard if user is not admin or approved.
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
    user,
    userData,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null if auth context is loading, errored,
  // or if user is not admin or approved.
  if (
    authContextLoading ||
    authContextError ||
    userContextLoading ||
    userContextError ||
    isRedirecting ||
    // Prevent unauthorized access to protected routes.
    !user ||
    !userData ||
    !userData.userType ||
    !verifyAdminOrApproved()
  ) {
    return null;
  }

  // Render children if user is admin or approved.
  return <>{children}</>;
}
