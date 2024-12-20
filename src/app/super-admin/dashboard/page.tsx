// ./src/app/dashboard/superadmin/page.tsx
//
// Mixed/dynamic super admin dashboard page for the Research Mentorship Program,
// loads the client-side super admin dashboard parent component.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import SuperAdminDashboardLoading from "@components/superAdmin/SuperAdminDashboardLoading";

// -----------------------------------------------------------------------------
// Dynamic client component imports.
const SuperAdminDashboardParent = dynamic(
  () => import("@components/superAdmin/SuperAdminDashboardParent"),
  {
    ssr: false,
    loading: () => <SuperAdminDashboardLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function AdminDashboardPage(): JSX.Element {
  return <SuperAdminDashboardParent />;
}
