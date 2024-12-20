// ./src/components/dashboard/DashboardError.tsx
//
// Static, error component for the /dashboard page.
// Used for when auth or user context is errored.
// Adds alert to the dashboard loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import AlertContextError from "@components/AlertContextError";
import DashboardLoading from "@components/dashboard/DashboardLoading";

// -----------------------------------------------------------------------------
export default function DashboardError(): JSX.Element {
  return (
    <>
      <AlertContextError />
      <DashboardLoading />
    </>
  );
}
