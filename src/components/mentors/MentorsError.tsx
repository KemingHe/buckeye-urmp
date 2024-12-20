// ./src/components/mentors/MentorsError.tsx
//
// Static, error component for the /mentors page.
// Used for when auth or user context is errored.
// Adds alert to the mentors loading component.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// React essential import.
import React from "react";

// Local component imports.
import AlertContextError from "@components/AlertContextError";
import MentorsLoading from "@components/mentors/MentorsLoading";

// -----------------------------------------------------------------------------
export default function MentorsError(): JSX.Element {
  return (
    <>
      <AlertContextError />
      <MentorsLoading />
    </>
  );
}
