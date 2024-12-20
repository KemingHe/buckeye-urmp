// ./src/components/Footer.tsx
//
// Static footer component for the Research Mentorship Program.

// Explicitly declare as a NextJS static, server-side rendering (SSR) component.
"use server";

// NextJS essential imports.
import Image from "next/image";
import Link from "next/link";

// -----------------------------------------------------------------------------
export default async function Footer(): Promise<JSX.Element> {
  return (
    <footer className="bux-footer bux-footer--white">
      <div className="bux-container bux-grid bux-grid--footer">
        {/* Footer left side with OSU logo and department info. */}
        <div className="bux-footer__col bux-footer__col--left bux-grid__cell bux-grid__cell--12 bux-grid__cell--5@md">
          {/* OSU logo with link to official site. */}
          {/* <div className="bux-footer__logo">
            <Link href="http://osu.edu" target="_blank" rel="noreferrer">
              <Image
                src="/images/brand/osu-horiz-gray.svg"
                alt="The Ohio State University"
                height={45}
                width={290}
                priority={true}
              />
            </Link>
          </div> */}
          {/* USG logo with link to official site. */}
          <div className="bux-footer__logo">
            <Link href="https://usg.osu.edu" target="_blank" rel="noreferrer">
              <Image
                src="/images/brand/USG _logo_trans_bg_250x50px.svg"
                alt="Undergraduate Student Government at The Ohio State University"
                height={50}
                width={250}
                priority={true}
              />
            </Link>
          </div>
          {/* USG title, address, and contact. */}
          <div>
            <div className="bux-footer__contact bux-footer__contact--address">
              <p className="bux_footer__site-name">
                Undergraduate Student Government
              </p>
              <p className="bux_footer__site-name pb-1">
                at The Ohio State University
              </p>
              <p className="bux_footer__address">Ohio Union</p>
              <p className="bux_footer__address">1739 N. High St.</p>
              <p className="bux_footer__address">Columbus, OH 43210</p>
            </div>
            <div className="bux-footer__contact bux-footer__contact--email-phone">
              <p className="bux_footer__email">
                Site:&nbsp;
                <Link className="bux-link" href="https://usg.osu.edu">
                  usg.osu.edu
                </Link>
              </p>
              <p className="bux_footer__email">
                Email:&nbsp;
                <Link className="bux-link" href="mailto:usg@osu.edu">
                  usg@osu.edu
                </Link>
              </p>
              <p className="bux_footer__phone">
                Phone:&nbsp;
                <Link className="bux-link" href="tel:614-292-2101">
                  614-292-2101
                </Link>
              </p>
            </div>
          </div>

          {/* DEV title, address, and contact. */}
          <div className="pt-3">
            <div className="bux-footer__contact bux-footer__contact--address">
              <hr />
              {/* DEV logo with link to official site. */}
              <div className="bux-footer__logo">
                <Link href="https://osu.dev" target="_blank" rel="noreferrer">
                  <Image
                    src="/images/brand/DEV_logo_trans_bg_100x50px.svg"
                    alt="Software Engineering Club at The Ohio State University"
                    height={50}
                    width={100}
                    priority={true}
                  />
                </Link>
              </div>
              <p className="bux_footer__site-name">
                Software Engineering Club (DEV)
              </p>
              <p className="bux_footer__site-name pb-1">
                at The Ohio State University
              </p>
            </div>
            <div className="bux-footer__contact bux-footer__contact--email-phone">
              <p className="bux_footer__email">
                Site:&nbsp;
                <Link className="bux-link" href="https://osu.dev">
                  osu.dev
                </Link>
              </p>
              <p className="bux_footer__email">
                Email:&nbsp;
                <Link className="bux-link" href="mailto:usg@osu.edu">
                  dev@osu.edu
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Footer right side with social media links. */}
        <div className="bux-footer__col bux-footer__col--right bux-grid__cell bux-grid__cell--12 bux-grid__cell--7@md">
          <div className="bux-footer__social">
            <ul className="bux-social-links bux-social-links--white">
              {/* Facebook social media link. */}
              <li className="bux-social-links__item bux-social-links__item--Facebook">
                <Link
                  className="bux-social-links__link"
                  href="https://www.facebook.com/OhioStateUniversityUSG/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="visually-hidden">
                    Facebook profile — external
                  </span>
                  <span className="icon icon-facebook" aria-hidden="true" />
                </Link>
              </li>
              {/* Instagram social media link. */}
              <li className="bux-social-links__item bux-social-links__item--Instagram">
                <Link
                  className="bux-social-links__link"
                  href="https://www.instagram.com/usg_osu/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="visually-hidden">
                    Instagram profile — external
                  </span>
                  <span className="icon icon-instagram" aria-hidden="true" />
                </Link>
              </li>
              {/* X social media link. */}
              <li className="bux-social-links__item bux-social-links__item--X">
                <Link
                  className="bux-social-links__link"
                  href="https://x.com/usgosu"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="visually-hidden">X profile — external</span>
                  <span className="icon icon-x" aria-hidden="true" />
                </Link>
              </li>
              {/* LinkedIn social media link. */}
              {/* <li className="bux-social-links__item bux-social-links__item--LinkedIn">
                <Link
                  className="bux-social-links__link"
                  href="https://www.linkedin.com/school/the-ohio-state-university/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="visually-hidden">
                    LinkedIn profile — external
                  </span>
                  <span className="icon icon-linkedin" aria-hidden="true" />
                </Link>
              </li> */}
              {/* YouTube social media link. */}
              {/* <li className="bux-social-links__item bux-social-links__item--YouTube">
                <Link
                  className="bux-social-links__link"
                  href="https://www.youtube.com/user/ohiostateuniversity"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="visually-hidden">
                    YouTube profile — external
                  </span>
                  <span className="icon icon-youtube" aria-hidden="true" />
                </Link>
              </li> */}
            </ul>
          </div>
          {/* Footer fine print with accessibility and legal links. */}
          <div className="bux-footer__fine-print">
            <div className="bux-footer__ada">
              If you have a disability and experience difficulty accessing this
              content, please contact the Undergraduate Research Mentorship
              Program director at
              <Link className="bux-link" href="mailto:desai.479@osu.edu">
                &nbsp;desai.479@osu.edu&nbsp;
              </Link>
              {/* or{" "}
              <Link className="bux-link" href="tel:614-292-1760">
                614-292-1760
              </Link> */}
              .
            </div>
            {/* <div className="bux-footer__links">
              <ul>
                <li className="bux_footer__link">
                  <Link className="bux-link" href="https://go.osu.edu/privacy">
                    Privacy Statement
                  </Link>
                </li>
                <li className="bux_footer__link">
                  <Link
                    className="bux-link"
                    href="https://go.osu.edu/nondiscrimination-notice"
                  >
                    Non-discrimination Notice
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="bux-footer__copyright">
              © 2024 Undergraduate Student Government at The Ohio State
              University
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
