// ./src/app/auth/verify/page.tsx
//
// Auth verification page for password-less email sign-in/up.

// NextJS defaults to maximized static optimization when not specified.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Static dummy component imports.
import VerifyLoading from "@components/verify/VerifyLoading";

// -----------------------------------------------------------------------------
// Local client-only component imports.
const VerifyParent = dynamic(() => import("@components/verify/VerifyParent"), {
  ssr: false,
  loading: () => <VerifyLoading />,
});

// -----------------------------------------------------------------------------
export default function VerifyPage(): JSX.Element {
  return <VerifyParent />;
}
