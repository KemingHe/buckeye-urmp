// ./src/components/Title.tsx
//
// Simple static title component, displays title text, link, parent, and slogan.

// NextJS defaults to server-side rendering when not specified.

// NextJS essential imports.
import Link from "next/link";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface TitleProps {
  title        : string;
  titleLink   ?: string;
  titleParent ?: string;
  titleSlogan ?: string;
}

// -----------------------------------------------------------------------------
export default function Title({
  title,
  titleLink,
  titleParent,
  titleSlogan,
}: TitleProps): JSX.Element {
  return (
    <div id="masthead" className="bux-header">
      <div className="bux-container bux-grid">
        <div className="bux-header__col bux-header__col--left bux-grid__cell bux-grid__cell--12 bux-grid__cell--8@md bux-grid__cell--9@xl">
          <div className="bux-header__site-name-container">
            {titleParent && (
              <div className="bux-header__site-name-parent">{titleParent}</div>
            )}
            <div className="bux-header__site-name">
              {titleLink ? <Link href={titleLink}>{title}</Link> : title}
              {titleSlogan && (
                <div className="bux-header__site-name-slogan">
                  {titleSlogan}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
