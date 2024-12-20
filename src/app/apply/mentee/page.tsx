// ./src/app/apply/mentee/page.tsx
//
// Mixed/dynamic page for applying as a mentee to the Research Mentorship Program.

// NextJS defaults to maximizing server-side rendering (SSR) for pages.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import ApplyLoading from "@components/apply/ApplyLoading";

// -----------------------------------------------------------------------------
// Dynamic, client-only component imports.
const ApplyMenteeParent = dynamic(
  () => import("@components/apply/ApplyMenteeParent"),
  {
    ssr: false,
    loading: () => <ApplyLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function ApplyMenteePage(): JSX.Element {
  return <ApplyMenteeParent />;
}
