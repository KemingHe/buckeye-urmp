// ./src/components/verify/VerifyError.tsx
//
// Static, error component for the auth verification page.
// Used for when auth or user context is errored.
// Adds alert to the verify loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import { Alert } from "@components/Alert";
import VerifyLoading from "@components/verify/VerifyLoading";

// -----------------------------------------------------------------------------
export default function VerifyError(): JSX.Element {
  return (
    <>
      <Alert
        type="warning"
        title="Auth Context Error"
        message="Error: We are unable to determine your account status."
        additionalText="Apologies, we are actively investigating. **Try signing in again.** Help us by reporting your case."
      />
      <VerifyLoading />
    </>
  );
}
