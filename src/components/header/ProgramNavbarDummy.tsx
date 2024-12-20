// ./src/components/header/ProgramNavbarDummy.tsx
//
// Static dummy for the header component when client-only links are loading.

// NextJS defaults to server-side rendering (SSR) when not specified.

// -----------------------------------------------------------------------------
export default function ProgramNavbarDummy(): JSX.Element {
  return (
    <div className="bux-menu-wrapper">
      <div className="bux-container bux-grid bux-container--menu">
        <nav
          id="bux-main-menu"
          aria-label="Main Navigation"
          className="disclosure-nav disclosure-nav-orientation-horizontal"
        >
          <ul className="bux-menu">
            <li className="bux-menu__item">
              <span className="bux-menu__link cursor-pointer">Home</span>
            </li>
            <li className="bux-menu__item">
              <span className="bux-menu__link cursor-pointer">Loading...</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
