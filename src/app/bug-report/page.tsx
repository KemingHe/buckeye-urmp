// ./src/app/dev/bug-report/page.tsx
//
// Mixed/dynamic page for reporting bugs and issues
// with the Research Mentorship Program to the development team.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import BugReportDummy from "@components/bugReport/BugReportDummy";

// -----------------------------------------------------------------------------
// Dynamic, client-only component imports.
const BugReportParent = dynamic(
  () => import("@components/bugReport/BugReportParent"),
  {
    ssr: false,
    loading: () => <BugReportDummy />,
  },
);

// -----------------------------------------------------------------------------
export default function BugReportPage(): JSX.Element {
  return <BugReportParent />;
}
