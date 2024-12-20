// ./src/components/header/SignOutButton.tsx
//
// Client-only sign out button, for authed users to sign out.

// Explicitly declare as a NextJS client component.
"use client";

// NextJS and Firebase essential imports.
import { signOut } from "firebase/auth";

// Local Firebase Auth imports.
import { fbAuth } from "@lib/firebaseClientApp";

// Local hook imports.
import { type UseLoadingInterface, useLoading } from "@hooks/useLoading";

// -----------------------------------------------------------------------------
export default function SignOutButton(): JSX.Element {
  // Setup loading state.
  const { isLoading, startLoading, stopLoading }: UseLoadingInterface =
    useLoading();

  // ---------------------------------------------------------------------------
  // Setup sign out event handler.
  async function handleSignOut(
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    event.preventDefault();
    try {
      startLoading();
      await signOut(fbAuth);

      // Catch and log any sign-out errors.
    } catch (error) {
      console.error("Sign-out failed at SignOutButton with error:", error);

      // Stop loading after successful sign out or error.
    } finally {
      stopLoading();
    }
  }

  // ---------------------------------------------------------------------------
  return (
    <li className="bux-menu__item">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isLoading}
        className="bux-menu__link cursor-pointer"
      >
        {isLoading ? "Loading..." : "Sign Out"}
      </button>
    </li>
  );
}
