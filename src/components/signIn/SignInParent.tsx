// ./src/components/signIn/SignInParent.tsx
//
// Wrapper component for the sign in main component,
// providing the auth context and guard components.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local component imports.
import SignInDummy from "@components/signIn/SignInDummy";
import SignInError from "@components/signIn/SignInError";
import SignInMain from "@components/signIn/SignInMain";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import CheckBlacklistGuard from "@guards/CheckBlacklistGuard";
import CheckSignInGuard from "@guards/CheckSignInGuard";

// -----------------------------------------------------------------------------
export default function SignInParent(): JSX.Element {
  return (
    <AuthProvider LoadingComponent={SignInDummy} ErrorComponent={SignInError}>
      <CheckBlacklistGuard>
        <UserProvider
          LoadingComponent={SignInDummy}
          ErrorComponent={SignInError}
        >
          <CheckSignInGuard>
            <SignInMain />
          </CheckSignInGuard>
        </UserProvider>
      </CheckBlacklistGuard>
    </AuthProvider>
  );
}
