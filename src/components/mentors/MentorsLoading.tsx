// ./src/components/mentors/MentorsLoading.tsx
//
// Static loading component for the mentors page
// when the client-only dynamic mentors component or context is loading.

// NextJS defaults to maximizing server-side rendering (ssr) when not specified.

// Local generic static loading component imports.
import { Loading } from "@components/Loading";

// -----------------------------------------------------------------------------
export default function MentorsLoading(): JSX.Element {
  return (
    <Loading
      title="Loading Mentors..."
      message="Just a moment, please."
      image={{
        src: "/images/loading/loading-7-1024px.png",
        width: 1024,
        height: 683,
        alt: "School of Environment and Natural Resources professor Rattan Lal, whose research involves soil, at Waterman Farm with team members.",
      }}
    />
  );
}
