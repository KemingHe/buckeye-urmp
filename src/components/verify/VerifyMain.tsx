// ./src/components/verify/VerifyMain.tsx
//
// Client-only verification component for password-less email sign-up or sign-in,
// to be dynamically loaded on the auth/verify page.

// Explicitly declare as a NextJS client component.
"use client";

// NextJS and Firebase essential imports.
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { type HttpsCallable, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

// Local Firebase Auth imports.
import { DEFAULT_LOCAL_STORAGE_KEY } from "@lib/actionCodeSettings";
import { fbAuth, fbFunc } from "@lib/firebaseClientApp";

// Local context imports.
import { useAuthContext } from "@contexts/AuthContext";

// Local hook imports.
import { type UseVerifyingInterface, useVerifying } from "@hooks/useVerifying";

// Local component imports.
import { Alert, type AlertProps } from "@components/Alert";
import { Loading } from "@components/Loading";

// Local utility imports.
import pause from "@utils/pause";

// -----------------------------------------------------------------------------
export default function VerifyMain(): JSX.Element {
  // Firebase Auth context.
  const { clientRouter } = useAuthContext();

  // Alert message state and setter.
  const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
    undefined,
  );

  // Verifying state and setter.
  const { isVerifying, startVerifying }: UseVerifyingInterface = useVerifying();

  // ---------------------------------------------------------------------------
  // Verify email link and sign in user
  useEffect(() => {
    // -------------------------------------------------------------------------
    // Define async function to verify email link.
    async function verifyEmailLink(): Promise<void> {
      // Set start verifying state to prevent multiple attempts.
      startVerifying();

      // -----------------------------------------------------------------------
      // Skip verification if email link is invalid.
      if (!isSignInWithEmailLink(fbAuth, window.location.href)) {
        setAlertProps({
          type: "warning",
          title: "Verification Failure",
          message: "Invalid email verification link.",
          additionalText:
            "Please try signing in/up again via our Home page. Auto-redirecting in 7 seconds...",
        });
        await pause(7);

        clientRouter.push("/");
        return;
      }

      // -----------------------------------------------------------------------
      // Obtain email for sign-in from local storage or prompt user.
      let email: string | null = window.localStorage.getItem(
        DEFAULT_LOCAL_STORAGE_KEY,
      );

      // If email not found in local storage, prompt user for email.
      if (!email) {
        email = prompt("Enter to confirm your @osu.edu email for sign-in/up:");
      }

      // If email still not provided, alert user and redirect to Home page.
      if (!email) {
        setAlertProps({
          type: "warning",
          title: "Verification Failure",
          message: "Email not provided for sign-in.",
          additionalText:
            "Please try again using the link sent to your email. Auto-redirecting in 7 seconds...",
        });
        await pause(7);

        clientRouter.push("/");
        return;
      }

      // -----------------------------------------------------------------------
      // Attempt sign-in with email link.
      try {
        await signInWithEmailLink(fbAuth, email, window.location.href);

        // ---------------------------------------------------------------------
        // Update user's last logged-in timestamp.
        const updateLastLoggedInTimestampOnCall: HttpsCallable = httpsCallable(
          fbFunc,
          "updateLastLoggedInTimestampOnCall",
        );

        updateLastLoggedInTimestampOnCall().catch((error: Error) => {
          console.error(
            "Non-critical error occurred completing user sign-in:",
            error,
          );
        });

        // ---------------------------------------------------------------------
        // Clean up local storage and alert user of success.
        window.localStorage.removeItem("emailForSignIn");
        setAlertProps({
          type: "success",
          title: "Verification Success",
          message: "Email verified successfully.",
          additionalText:
            "Auto-redirecting to your dashboard in 3... 2... 1...",
        });
        await pause(3);

        // Redirect will be handled by the CheckSignInGuard,
        // to either admin or regular user dashboard.

        // ---------------------------------------------------------------------
      } catch (error) {
        setAlertProps({
          type: "error",
          title: "Verification Error",
          message: "Incorrect email or expired verification link.",
          additionalText:
            "Apologies. Please try again, and report this issue to us. Auto-redirecting in 7 seconds...",
        });
        await pause(7);

        clientRouter.push("/");
      }
    }

    // -------------------------------------------------------------------------
    // Skip verification if already attempted.
    if (isVerifying) return;

    verifyEmailLink();

    // // Keep dep list empty to ensure verification runs only once
    // // per page component mount. Prevents inf loop and page flicker.
  }, []);

  // ---------------------------------------------------------------------------
  return (
    <>
      {alertProps && (
        <Alert
          type={alertProps.type}
          title={alertProps.title}
          message={alertProps.message}
          additionalText={alertProps.additionalText}
        />
      )}
      <Loading
        title="Verifying..."
        message="Just a moment, please."
        image={{
          src: "/images/loading/loading-2-1024px.png",
          width: 1024,
          height: 683,
          alt: "Sammy Stenger hugs PAWS dog Cascade during the Student Life RECESS event on the south oval. Photographed for OSAM Winter 2022.",
        }}
      />
    </>
  );
}
