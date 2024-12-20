// ./src/components/admin/MentorApplicantCard.tsx
//
// Mentor applicant card component displaying mentor applicant info and actions.

// NextJS defaults to maximizing server-side rendering for static components.

// Local admin action handler imports.
import { approveApplicantHandler } from "@handlers/approveApplicantHandler";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MentorApplicantCardProps {
  isLoading                    : boolean;
  startLoading                 : () => void;
  stopLoading                  : () => void;
  id                           : string;
  fullName                     : string;
  osuEmail                     : string;
  academicYear                 : string;
  currentMajors                : string[];
  preProfessionalRoute         : string | null;
  proficientLanguages          : string[] | null;
  currentResearchFields        : string;
  profileAndResearchDescription: string;
}

export function MentorApplicantCard({
  isLoading,
  startLoading,
  stopLoading,
  id,
  fullName,
  osuEmail,
  academicYear,
  currentMajors,
  preProfessionalRoute,
  proficientLanguages,
  currentResearchFields,
  profileAndResearchDescription,
}: MentorApplicantCardProps): JSX.Element {
  return (
    <div>
      <div className="bux-card bux-card--linked-headeline">
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
              <p className="m-0 pt-1 text-sm" style={{ color: "#ba0c2f" }}>
                <span className="icon-envelope pe-1" />
                <span>{osuEmail}</span>
              </p>
              {proficientLanguages && (
                <p className="m-0">
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
        </div>
      </div>
      <div className="flex ps-1 pt-2 space-x-4">
        <button
          aria-disabled={isLoading}
          className={`bux-button ${isLoading ? "bux-button--disabled" : ""}`}
          disabled={isLoading}
          onClick={() =>
            approveApplicantHandler({
              applicantId: id,
              startLoading,
              stopLoading,
            })
          }
          type="button"
        >
          Approve
        </button>
        <button
          aria-disabled={isLoading}
          className={`bux-button ${isLoading ? "bux-button--alt-disabled" : "bux-button--alt"}`}
          disabled={isLoading}
          onClick={() => console.log(`Reject ${fullName} as a mentor.`)}
          type="button"
        >
          Waitlist
        </button>
        {/*TODO: add bux-button--icon-disabled class*/}
        <button
          aria-disabled={isLoading}
          className="bux-button bux-button--icon"
          disabled={isLoading}
          onClick={() => console.log(`Blacklist ${fullName} as a bad actor.`)}
          type="button"
        >
          Ban
        </button>
      </div>
    </div>
  );
}
