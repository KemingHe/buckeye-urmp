// ./src/components/AlertContextError.tsx
//
// Static, warning component for generic context errors,
// uses the generic Alert component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Local component imports.
import { Alert } from "@components/Alert";

// -----------------------------------------------------------------------------
export default function AlertContextError(): JSX.Element {
  return (
    <Alert
      type="warning"
      title="Context Error"
      message="Error: We are unable to determine your account status."
      additionalText="Apologies, we are actively investigating. Help us by reporting your case."
    />
  );
}
