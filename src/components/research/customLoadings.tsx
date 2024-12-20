// ./src/components/research/customLoadings.tsx
//
// Custom loading components for research postings page.

// NextJS defaults to maximizing server-side rendering for static content.

// Local static loading component import.
import { Loading } from "@components/Loading";
import type { ImageData } from "@schemas/ImageData";

// -----------------------------------------------------------------------------
const loadingIssueMessage: string =
  "Apologies, we are actively investigating. Help us by reporting your case.";
const loadingImage: ImageData = {
  src: "/images/loading/loading-1-1024px.png",
  width: 1024,
  height: 683,
  alt: "Approximately 600 Ohio State University students, student-athletes and staff members from the Office of Student Life, Department of Athletics and Alumni Association packing more than 200,000 meals at French Field House. The meals, combined with 125,000 non-perishable meals packed by Ohio State students earlier this month, will be donated Wednesday to the Military Veterans Resource Center (MRVC) for distribution through their Veterans Food Banks in Ohio.",
};

// -----------------------------------------------------------------------------
export function ResearchPostingsPageLoading(): JSX.Element {
  return (
    <Loading
      title="Loading..."
      message="One moment while we fetch the latest research postings."
      image={loadingImage}
    />
  );
}

// -----------------------------------------------------------------------------
export function RequestFailureLoading(): JSX.Element {
  return (
    <Loading
      title="Request to server failed."
      message={loadingIssueMessage}
      image={loadingImage}
    />
  );
}

// -----------------------------------------------------------------------------
export function MissingTimestampLoading(): JSX.Element {
  return (
    <Loading
      title="Timestamp temporarily unavailable."
      message={loadingIssueMessage}
      image={loadingImage}
    />
  );
}

// -----------------------------------------------------------------------------
export function MissingPostingsLoading(): JSX.Element {
  return (
    <Loading
      title="Postings temporarily unavailable."
      message={loadingIssueMessage}
      image={loadingImage}
    />
  );
}

// -----------------------------------------------------------------------------
export function InvalidPostingsLoading(): JSX.Element {
  return (
    <Loading
      title="Unable to retrieve valid postings."
      message={loadingIssueMessage}
      image={loadingImage}
    />
  );
}
