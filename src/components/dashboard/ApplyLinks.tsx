// ./src/components/dashboard/ApplyLinks.tsx
//
// Static links for redirecting users to apply as mentee or mentor.

// NextJS defaults to maximizing server-side rendering (ssr) when not specified.

// Local component imports.
import Title from "@components/Title";
import { ApplyLinkCard } from "@components/dashboard/ApplyLinkCard";

// -----------------------------------------------------------------------------
export default function ApplyLinks(): JSX.Element {
  return (
    <>
      <Title title="Application Portal" />
      <div className=" bux-container flex flex-col md:flex-row justify-center items-center gap-8 py-12">
        <div className="flex-1">
          <ApplyLinkCard
            title="Mentee Application"
            image={{
              src: "/images/dashboard/mentee-1-1024px.png",
              width: 1024,
              height: 683,
              alt: "Mentee applying for mentorship program.",
            }}
            link="/apply/mentee"
            callToAction="Find a mentor today!"
            callToActionLink="/apply/mentee"
          />
        </div>
        <div className="flex-1">
          <ApplyLinkCard
            title="Mentor Application"
            image={{
              src: "/images/dashboard/mentor-2-1024px.png",
              width: 1024,
              height: 683,
              alt: "Mentor applying for mentorship program.",
            }}
            link="/apply/mentor"
            callToAction="Become a mentor today!"
            callToActionLink="/apply/mentor"
          />
        </div>
      </div>
    </>
  );
}
