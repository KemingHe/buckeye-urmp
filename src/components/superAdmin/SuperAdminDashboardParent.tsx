// ./src/components/superAdmin/SuperAdminDashboardParent.tsx
//
// Parent component for the super admin dashboard main component.
// Sets up auth, user contexts and guards for the dashboard/superadmin page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import SuperAdminDashboardError from "@components/superAdmin/SuperAdminDashboardError";
import SuperAdminDashboardLoading from "@components/superAdmin/SuperAdminDashboardLoading";
import SuperAdminDashboardMain from "@components/superAdmin/SuperAdminDashboardMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import AuthGuard from "@guards/AuthGuard";
import RoleGuard from "@guards/RoleGuard";

// -----------------------------------------------------------------------------
export default function SuperAdminDashboardParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={SuperAdminDashboardLoading}
      ErrorComponent={SuperAdminDashboardError}
    >
      <AuthGuard>
        <UserProvider
          LoadingComponent={SuperAdminDashboardLoading}
          ErrorComponent={SuperAdminDashboardError}
        >
          <RoleGuard roleList={["superAdmin"]}>
            <SuperAdminDashboardMain />
          </RoleGuard>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
