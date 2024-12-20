// ./src/components/apply/ApplyLoading.tsx
//
// Static loading component for the apply mentee and mentor pages
// when the client-only dynamic apply component is loading.

// NextJS defaults to maximizing performance with server-side rendering when not specified.

// Local component imports.
import { Loading } from "@components/Loading";

// -----------------------------------------------------------------------------
export default function ApplyLoading(): JSX.Element {
  return (
    <Loading
      title="Loading Application..."
      message="Just a moment, please."
      image={{
        src: "/images/loading/loading-5-1024px.png",
        width: 1024,
        height: 683,
        alt: "Katherine Seamen works to see how different salts affect the freexing point of pure water.1620 General Chemistry for Majors room 350 Celeste Laboratory of Chemistry. OSAM Spring 2023.",
      }}
    />
  );
}
