// ./src/components/research/ResearchPostingCard.tsx
//
// Single, static, research posting card component.

// NextJS defaults to maximizing server-side rendering for static content.

// NextJS essential imports.
import Link from "next/link";

// Research posting type imports.
import type { ResearchPosting } from "@keminghe/osu";

// -----------------------------------------------------------------------------
export default function ResearchPostingCard({
  researchPosting,
}: { researchPosting: ResearchPosting }): JSX.Element {
  return (
    <div className="bux-card bux-card--linked-headeline">
      <Link
        className="bux-card__link"
        href={researchPosting.link}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="bux-card__content flex flex-row items-center justify-between w-full p-4">
        <div className="flex-1">
          <span className="bux-card__taxonomy">
            {researchPosting.department}
          </span>
          <h3 className="bux-card__heading">
            <span>{researchPosting.title}</span>
          </h3>
          <div className="bux-card__body flex flex-col pt-2 space-y-1">
            <p className="m-0">
              <b>Application Deadline:</b>&nbsp;
              {researchPosting.applicationDeadline}
            </p>
            {/* <p>
              <b>Public/Private:</b>&nbsp;
              {researchPosting.publicOrPrivate}
            </p> */}
            <p className="m-0">
              <b>Compensation Types:</b>&nbsp;
              {researchPosting.compensationTypes.join(", ")}
            </p>
            <p className="bux-card__read-time pt-2">
              <b>Hours Per Week:</b>&nbsp;
              {researchPosting.hoursPerWeek}
            </p>
          </div>
        </div>
        <div className="w-6">
          <span
            className="icon-chevron-right text-4xl text-center"
            style={{ color: "#ba0c2f" }}
          />
        </div>
      </div>
    </div>
  );
}
