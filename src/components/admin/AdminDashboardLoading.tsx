// ./src/components/admin/AdminDashboardLoading.tsx
//
// Static loading component for the admin dashboard page
// when Firebase Auth and Firestore user contexts are loading.

// NextJS defaults to maximizing performance with server-side rendering when not specified.

// Local component imports.
import { Loading } from "@components/Loading";

// -----------------------------------------------------------------------------
export default function AdminDashboardLoading(): JSX.Element {
  return (
    <Loading
      title="Loading Admin Dashboard..."
      message="Just a moment, please."
      image={{
        src: "/images/loading/loading-6-1024px.png",
        width: 1024,
        height: 683,
        alt: "omecoming, stained glass block O in the rotunda.",
      }}
    />
  );
}
