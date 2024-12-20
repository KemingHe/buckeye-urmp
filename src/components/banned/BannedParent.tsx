// ./src/components/banned/BannedParent.tsx
//
// Parent component for the banned main component.
// Sets up auth, user context and guards for the /banned page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import BannedError from "@components/banned/BannedError";
import BannedLoading from "@components/banned/BannedLoading";
import BannedMain from "@components/banned/BannedMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import RequiresBlacklistGuard from "@guards/RequiresBlacklistGuard";

// -----------------------------------------------------------------------------
export default function BannedParent(): JSX.Element {
  return (
    <AuthProvider LoadingComponent={BannedLoading} ErrorComponent={BannedError}>
      <UserProvider
        LoadingComponent={BannedLoading}
        ErrorComponent={BannedError}
      >
        <RequiresBlacklistGuard>
          <BannedMain />
        </RequiresBlacklistGuard>
      </UserProvider>
    </AuthProvider>
  );
}
