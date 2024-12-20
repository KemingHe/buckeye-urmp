// ./src/components/dashboard/ApplyLinkCard.tsx
//
// Generic, static link card component used by apply links component,
// for redirecting users to apply as mentee or mentor.

// NextJS defaults to server-side rendering when not specified.

// NextJS essential imports.
import Image from "next/image";
import Link from "next/link";

// Local schema and utility imports.
import type { ImageData } from "@schemas/ImageData";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ApplyLinkCardProps {
  title            : string;
  message         ?: string;
  callToAction    ?: string;
  image            : ImageData;
  link             : string;
  callToActionLink?: string;
}

export function ApplyLinkCard({
  title,
  message,
  callToAction,
  image,
  link,
  callToActionLink,
}: ApplyLinkCardProps): JSX.Element {
  // ---------------------------------------------------------------------------
  return (
    <div className="bux-card">
      {/* Hidden link for SEO, accessibility, and entire card. */}
      <Link
        className="bux-card__link"
        href={link}
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Image, title, message, and call to action with link. */}
      <Image
        className="bux-image bux-image--16x9"
        src={image.src}
        width={image.width}
        height={image.height}
        priority={true}
        alt={image.alt}
      />
      <div className="bux-card__content">
        <h3 className="bux-card__heading">
          <span>{title}</span>
        </h3>
        {message && (
          <div className="bux-card__body">
            <p>{message}</p>
          </div>
        )}
        {callToAction && (
          <div className="bux-card__cta">
            {callToActionLink ? (
              <Link href={callToActionLink}>
                <span>{callToAction}</span>
              </Link>
            ) : (
              <span>{callToAction}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
