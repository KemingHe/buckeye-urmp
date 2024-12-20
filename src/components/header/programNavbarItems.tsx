// ./src/components/header/programNavbarItems.tsx
//
// Reusable navbar items for the Research Mentorship Program.

// NextJS defaults to maximizing server-side rendering (SSR) for performance for static components.

// Local component imports.
import { MenuItem } from "@components/MenuItem";

// Local route constant imports.
import {
  ABOUT_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  MENTORS_ROUTE,
  RESEARCH_POSTINGS_ROUTE,
  SUPER_ADMIN_DASHBOARD_ROUTE,
} from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export function HomeLinkItem(): JSX.Element {
  return <MenuItem href={HOME_ROUTE} text="Home" />;
}

// -----------------------------------------------------------------------------
export function DashboardLinkItem(): JSX.Element {
  return <MenuItem href={DASHBOARD_ROUTE} text="Dashboard" />;
}

// -----------------------------------------------------------------------------
export function AdminDashboardLinkItem(): JSX.Element {
  return <MenuItem href={ADMIN_DASHBOARD_ROUTE} text="Admin Dashboard" />;
}

// -----------------------------------------------------------------------------
export function SuperAdminDashboardLinkItem(): JSX.Element {
  return (
    <MenuItem href={SUPER_ADMIN_DASHBOARD_ROUTE} text="SuperAdmin Dashboard" />
  );
}

// -----------------------------------------------------------------------------
export function MentorsLinkItem(): JSX.Element {
  return <MenuItem href={MENTORS_ROUTE} text="Mentors" />;
}

// -----------------------------------------------------------------------------
export function ResearchPostingsLinkItem(): JSX.Element {
  return <MenuItem href={RESEARCH_POSTINGS_ROUTE} text="Research Postings" />;
}

// -----------------------------------------------------------------------------
export function AboutLinkItem(): JSX.Element {
  return <MenuItem href={ABOUT_ROUTE} text="About" />;
}
