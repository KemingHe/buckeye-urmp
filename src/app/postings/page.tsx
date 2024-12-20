// ./src/app/research/postings/page.tsx
//
// SSR, static page for displaying all current research postings at Ohio State University.

// Explicitly declare as a NextJS server page component to maximize performance.
// This page is statically generated and revalidated every 1 hour.
"use server";

// React esssential import.
import React from "react";

// Research posting schema and type imports.
import { type ResearchPosting, ResearchPostingSchema } from "@keminghe/osu";

// Local static component imports.
import { Alert } from "@components/Alert";
import ResearchPostingCard from "@components/research/ResearchPostingCard";
import ResearchPostingsTitle from "@components/research/ResearchPostingsTitle";
import {
  InvalidPostingsAlert,
  MissingPostingsAlert,
  MissingTimestampAlert,
  RequestFailureAlert,
} from "@components/research/customAlerts";
import {
  InvalidPostingsLoading,
  MissingPostingsLoading,
  MissingTimestampLoading,
  RequestFailureLoading,
} from "@components/research/customLoadings";

// Local datetime formatter utility import.
import formatISOString from "@utils/formatISOString";

// -----------------------------------------------------------------------------
// Latest research postings API response interface.
// biome-ignore format: added alignment for clarity.
interface LatestPostingsAPIResponse {
  fetchTimestamp: string;
  postings      : ResearchPosting[];
}

// -----------------------------------------------------------------------------
export default async function ResearchPostingsPage(): Promise<JSX.Element> {
  // Fetch latest research postings from the API.
  let response: Response;
  try {
    response = await fetch(
      "https://us-central1-dev-research-mentorship-prod.cloudfunctions.net/serveLatestResearchPostings",
      {
        method: "GET",

        // Revalidate (re-cache) the page every 1 hours (3600 seconds).
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}.`);
    }
  } catch (error) {
    console.error("Error accessing latest research postings:", error);
    return (
      <>
        <RequestFailureAlert />
        <ResearchPostingsTitle />
        <RequestFailureLoading />
      </>
    );
  }

  // Parse the API response.
  const { fetchTimestamp, postings } =
    (await response.json()) as LatestPostingsAPIResponse;

  // Check for missing timestamp.
  if (!fetchTimestamp) {
    console.error("API response missing fetch timestamp.");
    return (
      <>
        <MissingTimestampAlert />
        <ResearchPostingsTitle />
        <MissingTimestampLoading />
      </>
    );
  }

  // Check for missing postings.
  if (!postings || postings.length === 0) {
    console.error("API response missing non-empty research postings array.");
    return (
      <>
        <MissingPostingsAlert />
        <ResearchPostingsTitle />
        <MissingPostingsLoading />
      </>
    );
  }

  // Check for invalid postings.
  try {
    ResearchPostingSchema.array().parse(postings);
  } catch (error) {
    console.error("API response contains invalid research postings:", error);
    return (
      <>
        <InvalidPostingsAlert />
        <ResearchPostingsTitle />
        <InvalidPostingsLoading />
      </>
    );
  }

  // -----------------------------------------------------------------------------
  return (
    <>
      <Alert
        type="info"
        title="Postings Updated"
        message={`Updated ${formatISOString(fetchTimestamp)}. Check back for more opportunities.`}
        additionalText="Official Source: https://ugresearch.osu.edu/research-postings"
      />
      <ResearchPostingsTitle />
      <div className="bux-container space-y-5">
        {postings.map((posting: ResearchPosting) => (
          <ResearchPostingCard key={posting.title} researchPosting={posting} />
        ))}
      </div>
    </>
  );
}
