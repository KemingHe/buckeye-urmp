// ./src/components/apply/ApplyError.tsx
//
// Static, error component for the apply mentee and mentor pages.
// Used for when auth and/or user context is errored.
// Adds alert to the apply loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import AlertContextError from "@components/AlertContextError";
import ApplyLoading from "@components/apply/ApplyLoading";

// -----------------------------------------------------------------------------
export default function ApplyError(): JSX.Element {
  return (
    <>
      <AlertContextError />
      <ApplyLoading />
    </>
  );
}
