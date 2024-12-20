// ./src/app/not-found.tsx
//
// Static, server-rendered 404 page for 'research.osu.dev'.

// Explicitly declare as a NextJS server component.
"use server";

// NextJS essential imports.
import Image from "next/image";
import Link from "next/link";

export default async function NotFoundPage(): Promise<JSX.Element> {
  return (
    <div className="bux-container">
      <div className="visually-hidden text-center">404 Page Not Found</div>
      <div className="grid grid-cols-8 gap-4 items-center justify-center">
        <div className="col-span-1" />
        <div className="col-span-3 p-4">
          <h1 className="text-5xl font-bold">O-H! Oh, no.</h1>
          <div className="omc-error__subtitle text-2xl mt-2">Server error</div>
          <div className="omc-error__subtitle-content text-base mt-2">
            The page you are trying to visit has moved, no longer exists or the
            website address is incorrect.
          </div>
          <p className="omc-error__description text-base mt-4">
            We continuously update our websites to better serve the Ohio State
            community. As a result, some URLs may have changed. We apologize for
            the inconvenience. What can we help you find?
          </p>
        </div>
        <div className="col-span-3 p-4 flex justify-center items-center">
          <Image
            src="/images/brand/o_h_oh_no.svg"
            alt="O-H Oh No"
            width={330}
            height={303}
            priority={true}
          />
        </div>
        <div className="col-span-1" />
      </div>
      <div className="grid grid-cols-8 gap-4 items-center justify-center">
        <div className="col-span-1" />
        <div className="col-span-6 p-4">
          <ul className="bux-link-list">
            <li className="bux-link-list__item">
              <Link className="bux-text-link" href="https://osu.edu/search/">
                Search osu.edu
              </Link>
              <div className="bux-link-list__text">
                Type in keywords to search for a website, person or place at the
                university.
              </div>
            </li>
            <li className="bux-link-list__item">
              <Link className="bux-text-link" href="https://osu.edu//a-z-list">
                Browse A-Z lists
              </Link>
              <div className="bux-link-list__text">
                Browse websites alphabetically or browsing places by
                alphabetical order, letter code or building number.
              </div>
            </li>
            <li className="bux-link-list__item">
              <Link className="bux-text-link" href="mailto:webmaster@osu.edu">
                Contact the webmaster
              </Link>
              <div className="bux-link-list__text">
                If you have questions, comments or concerns, please email us for
                support.
              </div>
            </li>
          </ul>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
