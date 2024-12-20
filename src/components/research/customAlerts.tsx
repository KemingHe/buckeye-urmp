// ./src/components/research/customAlerts.tsx
//
// Custom alert components for research postings page.

// NextJS defaults to maximizing server-side rendering for static content.

// Local static alert component import.
import { Alert } from "@components/Alert";

// -----------------------------------------------------------------------------
const alertIssueMessage =
  "Our own servers are experiencing issues. Please see postings from the official source below.";
const alertIssueAdditionalText =
  "Official Source: https://ugresearch.osu.edu/research-postings";

// -----------------------------------------------------------------------------
export function ResearchPostingsPageAlert(): JSX.Element {
  return (
    <Alert
      type="info"
      title="Loading Latest Postings"
      message="Loading..."
      additionalText="Just a moment, please."
    />
  );
}

// -----------------------------------------------------------------------------
export function RequestFailureAlert(): JSX.Element {
  return (
    <Alert
      type="warning"
      title="Fetch Request Failed"
      message={alertIssueMessage}
      additionalText={alertIssueAdditionalText}
    />
  );
}

// -----------------------------------------------------------------------------
export function MissingTimestampAlert(): JSX.Element {
  return (
    <Alert
      type="warning"
      title="Timestamp Unavailable"
      message={alertIssueMessage}
      additionalText={alertIssueAdditionalText}
    />
  );
}

// -----------------------------------------------------------------------------
export function MissingPostingsAlert(): JSX.Element {
  return (
    <Alert
      type="warning"
      title="Postings Unavailable"
      message={alertIssueMessage}
      additionalText={alertIssueAdditionalText}
    />
  );
}

// -----------------------------------------------------------------------------
export function InvalidPostingsAlert(): JSX.Element {
  return (
    <Alert
      type="warning"
      title="Postings Invalid"
      message={alertIssueMessage}
      additionalText={alertIssueAdditionalText}
    />
  );
}
