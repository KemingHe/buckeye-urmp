// ./src/components/dashboard/DashboardMain.tsx
//
// Client-only dashboard main component for the dashboard page,
// nested within the dashboard parent component.

// Explicitly declare as a NextJS client-only component.
"use client";

// Local context imports.
import { useAuthContext } from "@contexts/AuthContext";
import { useUserContext } from "@contexts/UserContext";

// Local component imports.
import ApplyLinks from "@components/dashboard/ApplyLinks";
import ApplyWait from "@components/dashboard/ApplyWait";

// -----------------------------------------------------------------------------
export default function DashboardMain(): JSX.Element | null {
  // Firebase Auth and Firestore user context.
  const { user } = useAuthContext();
  const { userData } = useUserContext();

  // ---------------------------------------------------------------------------
  // Render mentee and mentor application links if user is a new sign up user.
  if (user && userData && userData.userType === "newSignUp") {
    return <ApplyLinks />;
  }

  // ---------------------------------------------------------------------------
  // Render the wait room if user already applied as a mentee or mentor
  // and is waiting for approval.
  if (
    user &&
    userData &&
    (userData.userType === "mentee" || userData.userType === "mentor")
  ) {
    return <ApplyWait />;
  }

  // ---------------------------------------------------------------------------
  // Defaults to null if no conditions are met as best security practice.
  return null;
}
