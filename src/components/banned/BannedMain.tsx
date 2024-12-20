// ./src/components/banned/BannedMain.tsx
//
// Static, client-only component for displaying a user's blacklisted status.
// Wrapped in auth providers and guards.

// NextJS defaults to maximizing server-side rendering (SSR) when not specified.

// Local component imports.
import { Alert } from "@components/Alert";

// -----------------------------------------------------------------------------
export default function BannedMain(): JSX.Element {
  return (
    <Alert
      type="error"
      title="User Blacklisted"
      message="You have been banned from using this platform."
      additionalText="If this is a mistake, please contact dev@osu.edu for assistance."
    />
  );
}
