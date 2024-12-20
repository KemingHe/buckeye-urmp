// ./src/components/research/ResearchPostingsTitle.tsx
//
// Reusable title component for research postings page.

// NextJS defaults to maximizing server-side rendering for static content.

// Local static title component import.
import Title from "@components/Title";

// -----------------------------------------------------------------------------
export default function ResearchPostingsTitle(): JSX.Element {
  return <Title title="Research Postings" />;
}
