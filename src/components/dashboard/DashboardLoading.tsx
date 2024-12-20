// ./src/components/dashboard/DashboardLoading.tsx
//
// Static loading component for the dashboard page
// when the client-only dynamic dashboard component is loading.

// NextJS defaults to server-side rendering when not specified.

// Local generic static loading component imports.
import { Loading } from "@components/Loading";

// -----------------------------------------------------------------------------
export default function DashboardLoading(): JSX.Element {
  return (
    <Loading
      title="Loading Dashboard..."
      message="Just a moment, please."
      image={{
        src: "/images/loading/loading-3-1024px.png",
        width: 1024,
        height: 683,
        alt: "Homecoming parade during Homecoming Week celebration featuring student organization floats, colleges, departments and community organizations.",
      }}
    />
  );
}
