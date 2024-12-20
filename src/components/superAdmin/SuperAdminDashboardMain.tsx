// ./src/components/superAdmin/SuperAdminDashboardMain.tsx
//
// Client-only super admin dashboard main component,
// wrapped in auth, user providers and guards,
// requires user is an authenticated super admin.

// Explicitly declare as a NextJS client-only component.
"use client";

// -----------------------------------------------------------------------------
export default function SuperAdminDashboardMain(): JSX.Element {
  return (
    <p>
      Placeholder for the super admin dashboard.{" "}
      <b>We are working hard on shipping this feature.</b> Sorry for the in
      convenience.
    </p>
  );
}
