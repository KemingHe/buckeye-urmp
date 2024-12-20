// ./src/components/mentors/MentorCard.tsx
//
// Mentor card component displaying mentor info and contact actions.

// NextJS defaults to maximizing server-side rendering for static components.

// NextJS essential imports.
import Link from "next/link";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MentorCardProps {
  fullName                      : string;
  osuEmail                      : string;
  academicYear                  : string;
  currentMajors                 : string[];
  preProfessionalRoute          : string | null;
  proficientLanguages           : string[] | null;
  currentResearchFields         : string;
  profileAndResearchDescription : string;
}

export function MentorCard({
  fullName,
  osuEmail,
  academicYear,
  currentMajors,
  preProfessionalRoute,
  proficientLanguages,
  currentResearchFields,
  profileAndResearchDescription,
}: MentorCardProps): JSX.Element {
  return (
    <div className="bux-card bux-card--linked-headeline">
      <Link
        className="bux-card__link"
        href={`mailto:${osuEmail}`}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="bux-card__content flex flex-row items-center justify-between w-full p-4 space-x-4">
        <div className="flex-1">
          {currentMajors.length > 0 &&
            currentMajors.map((major, index) => (
              <span key={major} className="bux-card__taxonomy">
                {major}
                {index < currentMajors.length - 1 && (
                  <>&nbsp;&nbsp;&#124;&nbsp;&nbsp;</>
                )}
              </span>
            ))}
          <h3 className="bux-card__heading">
            <span>{fullName}</span>
          </h3>
          <div className="bux-card__body flex flex-col">
            <p className="m-0">
              {academicYear}
              {preProfessionalRoute && (
                <>&nbsp;&#124;&nbsp;{preProfessionalRoute}</>
              )}
            </p>
            {proficientLanguages && (
              <p className="m-0 pt-1">
                <span
                  className="icon-microphone pe-1 text-sm"
                  style={{ color: "#ba0c2f" }}
                />
                {proficientLanguages.map((language, index) => (
                  <span
                    key={language}
                    className="text-sm"
                    style={{ color: "#ba0c2f" }}
                  >
                    {language}
                    {index < proficientLanguages.length - 1 && (
                      <>&nbsp;&nbsp;&#124;&nbsp;&nbsp;</>
                    )}
                  </span>
                ))}
              </p>
            )}
            <p className="m-0 pt-3">
              <b>Personal Bio:</b>
              <br />
              {profileAndResearchDescription}
            </p>
            <p className="m-0 pt-3">
              <b>Current Research:</b>
              <br />
              {currentResearchFields}
            </p>
          </div>
        </div>
        <div className="w-6">
          <span
            className="icon-envelope-fill text-4xl text-center"
            style={{ color: "#ba0c2f" }}
          />
        </div>
      </div>
    </div>
  );
}
