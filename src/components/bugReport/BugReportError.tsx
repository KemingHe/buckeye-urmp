// ./src/components/bugReport/BugReportError.tsx
//
// Static, error component for the /bug-report page.
// Used for when auth context is errored.
// Adds alert to the bug-report dummy component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import { Alert } from "@components/Alert";
import BugReportDummy from "@components/bugReport/BugReportDummy";

// -----------------------------------------------------------------------------
export default function BugReportError(): JSX.Element {
  return (
    <>
      <Alert
        type="warning"
        title="Auth Context Error"
        message="Error: We are unable to determine your account status."
        additionalText="Apologies, we are actively investigating. **Try refreshing the page.** Please contact dev@osu.edu for assistance."
      />
      <BugReportDummy />
    </>
  );
}
