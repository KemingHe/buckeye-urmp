// ./src/components/verify/VerifyParent.tsx
//
// Parent component for the verify main component.
// Sets up auth, user contexts, and guards for the /auth/verify page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component imports.
import VerifyError from "@components/verify/VerifyError";
import VerifyLoading from "@components/verify/VerifyLoading";
import VerifyMain from "@components/verify/VerifyMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import CheckBlacklistGuard from "@guards/CheckBlacklistGuard";
import CheckSignInGuard from "@guards/CheckSignInGuard";

// -----------------------------------------------------------------------------
export default function VerifyParent(): JSX.Element {
  return (
    <AuthProvider LoadingComponent={VerifyLoading} ErrorComponent={VerifyError}>
      <CheckBlacklistGuard>
        <UserProvider
          LoadingComponent={VerifyLoading}
          ErrorComponent={VerifyError}
        >
          <CheckSignInGuard>
            <VerifyMain />
          </CheckSignInGuard>
        </UserProvider>
      </CheckBlacklistGuard>
    </AuthProvider>
  );
}
