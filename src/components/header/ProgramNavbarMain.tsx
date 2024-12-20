// ./src/components/header/ProgramNavbarMain.tsx
//
// Client-only navbar main component.

// Explicitly declare as a NextJS client component.
"use client";

// React essential import.
import React from "react";

// Local auth and user context imports.
import { useAuthContext } from "@contexts/AuthContext";
import { useUserContext } from "@contexts/UserContext";

// Local component imports.
import SignOutButton from "@components/header/SignOutButton";
import {
  AdminDashboardLinkItem,
  DashboardLinkItem,
  HomeLinkItem,
  MentorsLinkItem,
  ResearchPostingsLinkItem,
  SuperAdminDashboardLinkItem,
} from "@components/header/programNavbarItems";

// -----------------------------------------------------------------------------
export default function ProgramNavbarMain(): JSX.Element {
  // Firebase Auth and Firestore user context.
  const { user } = useAuthContext();
  const { userData } = useUserContext();

  // ---------------------------------------------------------------------------
  // Nav link item render helper functions.
  function renderHomeOrDashboardLink(): JSX.Element {
    if (user && userData) {
      if (userData.userType === "superAdmin") {
        return (
          <>
            <SuperAdminDashboardLinkItem />
            <AdminDashboardLinkItem />
          </>
        );
      }

      if (userData.userType === "admin") {
        return <AdminDashboardLinkItem />;
      }

      // Render dashboard link for regular signed-in users.
      return <DashboardLinkItem />;
    }

    // Render home link if user is not signed in.
    return <HomeLinkItem />;
  }

  function renderMentorsLink(): JSX.Element | null {
    if (
      user &&
      userData &&
      // Render mentors link for superAdmin, admin, and approved users.
      (userData.userType === "superAdmin" ||
        userData.userType === "admin" ||
        userData.adminApproved)
    ) {
      return <MentorsLinkItem />;
    }

    // Do not render mentors link for unapproved users.
    return null;
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="bux-menu-wrapper">
      <div className="bux-container bux-grid bux-container--menu">
        <nav
          id="bux-main-menu"
          aria-label="Main Navigation"
          className="disclosure-nav disclosure-nav-orientation-horizontal"
        >
          <ul className="bux-menu">
            {renderHomeOrDashboardLink()}
            {renderMentorsLink()}
            <ResearchPostingsLinkItem />
            {/* <AboutLinkItem /> */}
            {user && <SignOutButton />}
          </ul>
        </nav>
      </div>
    </div>
  );
}
