// ./src/components/header/ProgramNavbarParent.tsx
//
// Parent component for the program navbar main component.
// Sets up auth and user contexts for the program navbar.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component and provider imports.
import ProgramNavbarDummy from "@components/header/ProgramNavbarDummy";
import ProgramNavbarMain from "@components/header/ProgramNavbarMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";

// -----------------------------------------------------------------------------
export default function ProgramNavbarParent(): JSX.Element {
  return (
    <AuthProvider
      LoadingComponent={ProgramNavbarDummy}
      ErrorComponent={ProgramNavbarDummy}
    >
      <UserProvider
        LoadingComponent={ProgramNavbarDummy}
        ErrorComponent={ProgramNavbarDummy}
      >
        <ProgramNavbarMain />
      </UserProvider>
    </AuthProvider>
  );
}
