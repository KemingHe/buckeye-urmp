// ./src/app/research/postings/loading.tsx
//
// Static placeholder loading page component for when
// the SSR research postings page is completing its fetch.

// NextJS defaults to maximizing server-side rendering (SSR) when not specified.

// React essential import.
import React from "react";

import ResearchPostingsTitle from "@components/research/ResearchPostingsTitle";
// Local component imports.
import { ResearchPostingsPageAlert } from "@components/research/customAlerts";
import { ResearchPostingsPageLoading } from "@components/research/customLoadings";

// -----------------------------------------------------------------------------
export default function ResearchPostingsLoading(): JSX.Element {
  return (
    <>
      <ResearchPostingsPageAlert />
      <ResearchPostingsTitle />
      <ResearchPostingsPageLoading />
    </>
  );
}
