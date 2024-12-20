// ./src/components/header/OSUNavbar.tsx
//
// Static standard OSU navbar for header component.

// Expicitly declare as a NextJS static server-rendered component.
"use server";

// NextJS essentail imports.
import Image from "next/image";
import Link from "next/link";

// -----------------------------------------------------------------------------
export default async function OSUNavbar(): Promise<JSX.Element> {
  return (
    <nav
      id="osu-navbar"
      className="bux-osu-nav"
      aria-label="Ohio State links"
      aria-labelledby="osu-nav-trigger"
      aria-modal="true"
    >
      <div className="bux-osu-nav__overlay" />
      <div className="bux-osu-nav__wrapper">
        <div className="bux-container">
          <div id="osu-navname-block">
            {/* OSU logo with link to official site. */}
            {/* <Link className="bux-osu-nav__osu-logo-link" href="https://osu.edu">
              <Image
                className="bux-osu-nav__osu-logo-img"
                src="/images/brand/osu-navbar.svg"
                alt="The Ohio State University Homepage"
                width={320}
                height={50}
                priority={true}
              />
            </Link> */}
            {/* USG logo with link to official site. */}
            <Link
              className="bux-osu-nav__osu-logo-link"
              href="https://usg.osu.edu"
            >
              <Image
                src="/images/brand/USG _logo_trans_bg_250x50px.svg"
                alt="Undergraduate Student Government at The Ohio State University"
                height={50}
                width={250}
                priority={true}
              />
            </Link>
          </div>
          <div id="osu-navlinks-block">
            <button
              type="button"
              id="osu-nav-trigger"
              aria-controls="osu-navlinks"
              aria-expanded="false"
            >
              <span className="visually-hidden">Show Links</span>
            </button>
            <ul
              id="osu-navlinks"
              aria-labelledby="osu-nav-trigger"
              className="bux-osu-nav__links"
            >
              <li className="bux-osu-nav__link">
                <Link href="https://usg.osu.edu/">About USG</Link>
              </li>
              <li className="bux-osu-nav__link">
                <Link href="https://osu.dev/">About DEV</Link>
              </li>
              <li className="bux-osu-nav__link">
                <Link href="/bug-report">Get Help</Link>
              </li>
              {/* <li className="bux-osu-nav__link">
                <Link href="https://www.osu.edu/map">Map</Link>
              </li>
              <li className="bux-osu-nav__link">
                <Link href="http://buckeyelink.osu.edu/">Buckeye Link</Link>
              </li>
              <li className="bux-osu-nav__link">
                <Link href="https://email.osu.edu/">Webmail</Link>
              </li>
              <li className="bux-osu-nav__link">
                <Link href="https://www.osu.edu/search/">
                  Search Ohio State
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
