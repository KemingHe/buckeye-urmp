// ./src/components/dashboard/DashboardParent.tsx
//
// Parent component for the dashboard main component.
// Sets up auth, user contexts and guards for the /dashboard page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import DashboardError from "@components/dashboard/DashboardError";
import DashboardLoading from "@components/dashboard/DashboardLoading";
import DashboardMain from "@components/dashboard/DashboardMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import AuthGuard from "@guards/AuthGuard";
import RoleGuard from "@guards/RoleGuard";

// -----------------------------------------------------------------------------
export default function DashboardParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={DashboardLoading}
      ErrorComponent={DashboardError}
    >
      <AuthGuard>
        <UserProvider
          LoadingComponent={DashboardLoading}
          ErrorComponent={DashboardError}
        >
          <RoleGuard roleList={["newSignUp", "mentee", "mentor"]}>
            <DashboardMain />
          </RoleGuard>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
