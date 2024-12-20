// ./src/components/apply/ApplyMentorParent.tsx
//
// Parent component for the apply mentor main component.
// Sets up auth, user contexts and guards for the /apply/mentor page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import ApplyError from "@components/apply/ApplyError";
import ApplyLoading from "@components/apply/ApplyLoading";
import ApplyMentorMain from "@components/apply/ApplyMentorMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import AuthGuard from "@guards/AuthGuard";
import RoleGuard from "@guards/RoleGuard";

// -----------------------------------------------------------------------------
export default function ApplyMentorParent(): JSX.Element {
  return (
    <AuthProvider LoadingComponent={ApplyLoading} ErrorComponent={ApplyError}>
      <AuthGuard>
        <UserProvider
          LoadingComponent={ApplyLoading}
          ErrorComponent={ApplyError}
        >
          <RoleGuard roleList={["newSignUp"]}>
            <ApplyMentorMain />
          </RoleGuard>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
