// ./src/components/bugReport/BugReportParent.tsx
//
// Parent component for the bug report main component.
// Sets up auth, user context, and guards for the /bug-report page.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component imports.
import BugReportDummy from "@components/bugReport/BugReportDummy";
import BugReportError from "@components/bugReport/BugReportError";
import { BugReportMain } from "@components/bugReport/BugReportMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import CheckBlacklistGuard from "@guards/CheckBlacklistGuard";

// -----------------------------------------------------------------------------
export default function BugReportParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={BugReportDummy}
      ErrorComponent={BugReportError}
    >
      <CheckBlacklistGuard>
        <UserProvider
          LoadingComponent={BugReportDummy}
          ErrorComponent={BugReportError}
        >
          <BugReportMain />
        </UserProvider>
      </CheckBlacklistGuard>
    </AuthProvider>
  );
}
