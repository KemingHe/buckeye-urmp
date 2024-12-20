// ./src/app/dashboard/page.tsx
//
// Mixed/dynamic dashboard page for the Research Mentorship Program,
// loads the client-side dashboard component.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import DashboardLoading from "@components/dashboard/DashboardLoading";

// -----------------------------------------------------------------------------
// Dynamic client component imports.
const DashboardParent = dynamic(
  () => import("@components/dashboard/DashboardParent"),
  {
    ssr: false,
    loading: () => <DashboardLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function DashboardPage(): JSX.Element {
  return <DashboardParent />;
}
