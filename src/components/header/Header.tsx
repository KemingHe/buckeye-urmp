// ./src/components/header/Header.tsx
//
// Header component with static OSU navbar and dynamic program navbar.

// NextJS defaults to maximized static optimization when not specified.

// NextJS essential imports.
import dynamic from "next/dynamic";

// Local static/mixed component imports.
import OSUNavbar from "@components/header/OSUNavbar";
import ProgramNavBarDummy from "@components/header/ProgramNavbarDummy";

// -----------------------------------------------------------------------------
// Local client-only component and hook imports.
const ProgramNavbarParent = dynamic(
  () => import("@src/components/header/ProgramNavbarParent"),
  {
    ssr: false,
    loading: () => <ProgramNavBarDummy />,
  },
);

// -----------------------------------------------------------------------------
export default function Header(): JSX.Element {
  return (
    <header>
      <OSUNavbar />
      <ProgramNavbarParent />
    </header>
  );
}
