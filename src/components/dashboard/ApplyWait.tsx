// ./src/components/dashboard/ApplyWait.tsx
//
// Static wait-for-approval component for the dashboard page,
// placeholder for the (later) dynamic dashboard component
// where users can view their application status and edit their profile.

// NextJS defaults to maximizing performance with server-side rendering when not specified.

// Local component imports.
import { Alert } from "@components/Alert";
import { Loading } from "@components/Loading";
import Title from "@components/Title";

// -----------------------------------------------------------------------------
export default function ApplyWait(): JSX.Element {
  return (
    <>
      <Alert
        type="success"
        title="Application Status"
        message="Success: Application Received!"
        additionalText="Thank you for applying. Your application is under active review. "
      />
      <Title title="Application Status" />
      <Loading
        title="Application Review In Progress..."
        message="Don't worry, we will email you within 7 to 10 business days."
        image={{
          src: "/images/loading/loading-4-1024px.png",
          width: 1024,
          height: 683,
          alt: "Three students work together in a lab.",
        }}
      />
    </>
  );
}
