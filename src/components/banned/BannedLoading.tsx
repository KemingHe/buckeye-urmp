// ./src/components/banned/BannedLoading.tsx
//
// Static, loading component for the banned page.
// Used for when auth context is loading.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import { Alert } from "@components/Alert";

// -----------------------------------------------------------------------------
export default function BannedLoading(): JSX.Element {
  return (
    <Alert
      type="info"
      title="Loading Auth Context"
      message="Loading..."
      additionalText="Just a moment, please."
    />
  );
}
