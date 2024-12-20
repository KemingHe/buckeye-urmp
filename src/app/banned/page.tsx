// ./src/app/banned/page.tsx
//
// Mixed/dynamic page for displaying a user's blacklisted status.

// NextJS defaults to maximizing server-side rendering (SSR) when not specified.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static component imports.
import BannedLoading from "@components/banned/BannedLoading";

// -----------------------------------------------------------------------------
// Dynamic, client-only component imports.
const BannedParent = dynamic(() => import("@components/banned/BannedParent"), {
  ssr: false,
  loading: () => <BannedLoading />,
});

// -----------------------------------------------------------------------------
export default async function BannedPage(): Promise<JSX.Element> {
  return <BannedParent />;
}
