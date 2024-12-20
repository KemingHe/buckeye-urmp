// ./src/guards/RoleGuard.tsx
//
// Generic role guard component, checks if user has a specific user type.
// Single-duty client-only guard component.
// Uses useAuthConetxt and useUserContext. Must be nested inside UserProvider.

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
  HOME_ROUTE,
  SUPER_ADMIN_DASHBOARD_ROUTE,
} from "@constants/routeConstants";

// Local schema imports.
import { type UserType, UserTypeSchema } from "@schemas/UserType";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface RoleGuardProps {
  roleList: UserType[];
  children: ReactNode;
}

// -----------------------------------------------------------------------------
export default function RoleGuard({
  roleList,
  children,
}: RoleGuardProps): JSX.Element | null {
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
  // Local function to check if user has the required type.
  function verifyUserType(): boolean {
    // Fail if user data or user type is not available.
    if (!userData || !userData.userType) return false;

    // Fail and output error if props contain invalid user type.
    const roleListValidationResult = UserTypeSchema.array().safeParse(roleList);
    if (!roleListValidationResult.success) {
      console.error(
        "Error at RoleGuard/verifyUserType: ",
        roleListValidationResult.error,
      );
      return false;
    }

    // Fail and output error if user type is invalid.
    const userTypeValidationResult = UserTypeSchema.safeParse(
      userData.userType,
    );
    if (!userTypeValidationResult.success) {
      console.error(
        "Error at RoleGuard/verifyUserType: ",
        userTypeValidationResult.error,
      );
      return false;
    }

    return roleList.includes(userData.userType);
  }

  // ---------------------------------------------------------------------------
  // Redirect to dashboard if user doesn't have the required type.
  useEffect(() => {
    // Wait for auth and user context to load before checking user type.
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
      // Check if user has the required user type.
      // Skip if user type is not available.
      if (
        user &&
        userData &&
        userData.userType &&
        // Perform check after userData is available.
        !verifyUserType()
      ) {
        // Redirect to super admin dashboard if user is an authenticated super admin.
        if (userData.userType === "superAdmin") {
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: SUPER_ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

        // Redirect to admin dashboard if user is an authenticated admin.
        if (userData.userType === "admin") {
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

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
    user,
    userData,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Render null during loading, error, or redirecting.
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
    !verifyUserType()
  ) {
    return null;
  }

  // Render children if user has the required type.
  return <>{children}</>;
}
