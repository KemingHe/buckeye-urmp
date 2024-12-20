// ./src/components/Hero.tsx
//
// Mixed/dynamic, hero component with sign-in client child component,
// for the Research Mentorship Program homepage.

// NextJS defaults to maximized static optimization when not specified.

// NextJS essential imports.
import dynamic from "next/dynamic";
import Image from "next/image";
import { ulid } from "ulidx";

// Static loading component imports.
import SignInDummy from "@components/signIn/SignInDummy";

// Local client-only component imports.
const SignInParent = dynamic(() => import("@components/signIn/SignInParent"), {
  ssr: false,
  loading: () => <SignInDummy />,
});

export default function Hero(): JSX.Element {
  // ---------------------------------------------------------------------------
  // Generate ULID for carousel item.
  const carouselId: string = ulid();

  // ---------------------------------------------------------------------------
  return (
    <section className="bux-hero bux-hero--scarlet bux-hero--card-left bux-hero--3x2">
      <div
        id={`bux-hero__carousel-${carouselId}-items`}
        className="bux-hero__carousel-items"
      >
        <div
          id={`bux-hero__carousel-${carouselId}-tab-1`}
          className="bux-hero__container showing"
        >
          <div className="bux-hero__content">
            <h2 className="bux-hero__header">
              <span>Find your mentor today!</span>
            </h2>
            <div className="bux-hero__subheader">
              <span>
                Or help others by becoming a mentor. Sign in to get started.
              </span>
            </div>
            <SignInParent />
          </div>
          <div className="bux-hero__image-container">
            <div className="bux-hero__image bux-hero__image--3x2">
              <Image
                src="/images/slideshow/research-photo-1-1024px.png"
                className="bux-image"
                alt="Professor Jiyoung Lee and graduate students in her water quality testing lab in the College of Public Health."
                height={683}
                width={1024}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
