// ./src/components/admin/AdminDashboardParent.tsx
//
// Parent component for the admin dashboard main component.
// Sets up auth, user contexts and guards for the /admin/dashboard page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import AdminDashboardError from "@components/admin/AdminDashboardError";
import AdminDashboardLoading from "@components/admin/AdminDashboardLoading";
import AdminDashboardMain from "@components/admin/AdminDashboardMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import AuthGuard from "@guards/AuthGuard";
import RoleGuard from "@guards/RoleGuard";

// -----------------------------------------------------------------------------
export default function AdminDashboardParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={AdminDashboardLoading}
      ErrorComponent={AdminDashboardError}
    >
      <AuthGuard>
        <UserProvider
          LoadingComponent={AdminDashboardLoading}
          ErrorComponent={AdminDashboardError}
        >
          <RoleGuard roleList={["superAdmin", "admin"]}>
            <AdminDashboardMain />
          </RoleGuard>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
