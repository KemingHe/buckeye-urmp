// ./src/components/Loading.tsx
//
// Static loading component.

// NextJS defaults to server-side rendering when not specified.

// NextJS essential imports.
import Image from "next/image";

// Local schema and utility imports.
import type { ImageData } from "@src/schemas/ImageData";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface LoadingProps {
  title  : string;
  message: string;
  image  : ImageData;
}

// -----------------------------------------------------------------------------
export function Loading({ title, message, image }: LoadingProps): JSX.Element {
  return (
    <div className="bux-grid bux-pad-top-sp-32 bux-pad-bottom-sp-96">
      <div className="bux-grid__cell bux-grid__cell--3" />
      <div className="bux-grid__cell bux-grid__cell--6">
        <div className="bux-tile">
          <Image
            className="bux-image bux-image--16x9"
            src={image.src}
            width={image.width}
            height={image.height}
            priority={true}
            alt={image.alt}
          />
          <div className="bux-tile__content">
            <h3 className="bux-tile__header">
              <span className="bux-tile__text">{title}</span>
            </h3>
            <div className="bux-tile__body">{message}</div>
          </div>
        </div>
      </div>
      <div className="bux-grid__cell bux-grid__cell--3" />
    </div>
  );
}
