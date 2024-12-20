// ./src/components/superAdmin/SuperAdminDashboardError.tsx
//
// Static, error component for the super admin dashboard page.
// Used for when auth and/or user context is errored.
// Adds alert to the super admin dashboard loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// React essential import.
import React from "react";

// Local component imports.
import AlertContextError from "@components/AlertContextError";
import SuperAdminDashboardLoading from "@components/superAdmin/SuperAdminDashboardLoading";

// -----------------------------------------------------------------------------
export default function SuperAdminDashboardError(): JSX.Element {
  return (
    <>
      <AlertContextError />
      <SuperAdminDashboardLoading />
    </>
  );
}
