// ./src/components/admin/AdminDashboardError.tsx
//
// Static, error component for the admin dashboard page.
// Used for when auth and/or user context is errored.
// Adds alert to the admin dashboard loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import AlertContextError from "@components/AlertContextError";
import AdminDashboardLoading from "@components/admin/AdminDashboardLoading";

// -----------------------------------------------------------------------------
export default function AdminDashboardError(): JSX.Element {
  return (
    <>
      <AlertContextError />
      <AdminDashboardLoading />
    </>
  );
}
