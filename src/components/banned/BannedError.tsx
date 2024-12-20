// ./src/components/banned/BannedError.tsx
//
// Static, error component for the banned page.
// Use for when auth context is errored.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import AlertContextError from "@components/AlertContextError";

// -----------------------------------------------------------------------------
export default function BannedError(): JSX.Element {
  return <AlertContextError />;
}
