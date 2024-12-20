// ./src/components/dashboard/ApplyLinkCardDummy.tsx
//
// Generic, static dummy component as placeholder for ApplyLinkCard.

// NextJS defaults to server-side rendering when not specified.

// NextJS essential imports.
import Image from "next/image";

// Local schema and utility imports.
import type { ApplyLinkCardProps } from "@components/dashboard/ApplyLinkCard";

// -----------------------------------------------------------------------------
export function ApplyLinkCardDummy({
  title,
  message,
  callToAction,
  image,
  link,
  callToActionLink,
}: ApplyLinkCardProps): JSX.Element {
  return (
    <div className="bux-card">
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
            <span>{callToAction}</span>
          </div>
        )}
      </div>
    </div>
  );
}
