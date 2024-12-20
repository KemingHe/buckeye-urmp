// ./src/components/mentors/MentorsParent.tsx
//
// Parent component for the mentors main component.
// Sets up auth, user contexts and guards for the /mentors page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import MentorsError from "@components/mentors/MentorsError";
import MentorsLoading from "@components/mentors/MentorsLoading";
import MentorsMain from "@components/mentors/MentorsMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import AdminOrApprovedGuard from "@guards/AdminOrApprovedGuard";
import AuthGuard from "@guards/AuthGuard";
import RoleGuard from "@guards/RoleGuard";

// -----------------------------------------------------------------------------
export default function MentorsParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={MentorsLoading}
      ErrorComponent={MentorsError}
    >
      <AuthGuard>
        <UserProvider
          LoadingComponent={MentorsLoading}
          ErrorComponent={MentorsError}
        >
          <RoleGuard roleList={["superAdmin", "admin", "mentee", "mentor"]}>
            <AdminOrApprovedGuard>
              <MentorsMain />
            </AdminOrApprovedGuard>
          </RoleGuard>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
