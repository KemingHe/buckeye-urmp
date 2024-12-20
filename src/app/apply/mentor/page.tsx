// ./src/app/apply/mentor/page.tsx
//
// Mixed/dynamic page for applying as a mentor to the Research Mentorship Program.

// NextJS defaults to maximizing server-side rendering (SSR) for pages.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import ApplyLoading from "@components/apply/ApplyLoading";

// -----------------------------------------------------------------------------
// Dynamic, client-only component imports.
const ApplyMentorParent = dynamic(
  () => import("@components/apply/ApplyMentorParent"),
  {
    ssr: false,
    loading: () => <ApplyLoading />,
  },
);

// -----------------------------------------------------------------------------
export default function ApplyMentorPage(): JSX.Element {
  return <ApplyMentorParent />;
}
