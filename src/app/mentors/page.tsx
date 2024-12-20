// ./src/app/mentors/page.tsx
//
// Mixed/dynamic mentors page for the Research Mentorship Program,
// loads the client-side mentors component.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import MentorsLoading from "@components/mentors/MentorsLoading";

// -----------------------------------------------------------------------------
// Dynamic client component imports.
const MentorsParent = dynamic(
  () => import("@components/mentors/MentorsParent"),
  {
    ssr: false,
    loading: () => <MentorsLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function MentorsPage(): JSX.Element {
  return <MentorsParent />;
}
