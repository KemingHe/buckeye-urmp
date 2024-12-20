// ./src/app/dashboard/admin/page.tsx
//
// Mixed/dynamic admin dashboard page for the Research Mentorship Program,
// loads the client-side admin dashboard parent component.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import AdminDashboardLoading from "@components/admin/AdminDashboardLoading";

// -----------------------------------------------------------------------------
// Dynamic client component imports.
const AdminDashboardParent = dynamic(
  () => import("@components/admin/AdminDashboardParent"),
  {
    ssr: false,
    loading: () => <AdminDashboardLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function AdminDashboardPage(): JSX.Element {
  return <AdminDashboardParent />;
}
