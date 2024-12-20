// ./src/components/admin/MenteeApplicantCard.tsx
//
// Mentee applicant card component displaying mentee applicant info and actions.

// NextJS defaults to maximizing server-side rendering for static components.

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MenteeApplicantCardProps {
  id                   : string;
  fullName             : string;
  osuEmail             : string;
  academicYear         : string;
  currentMajors        : string[];
  preProfessionalRoute : string | null;
  desiredResearchFields: string;
}

export function MenteeApplicantCard({
  id,
  fullName,
  osuEmail,
  academicYear,
  currentMajors,
  preProfessionalRoute,
  desiredResearchFields,
}: MenteeApplicantCardProps): JSX.Element {
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
              <p className="m-0 pt-3">
                <b>Desired Research Fields:</b>
                <br />
                {desiredResearchFields}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ps-1 pt-2 space-x-4">
        <button
          className="bux-button"
          onClick={() => console.log(`Approve ${fullName} as a mentee.`)}
          type="button"
        >
          Approve
        </button>
        <button
          className="bux-button bux-button--alt"
          onClick={() => console.log(`Reject ${fullName} as a mentee.`)}
          type="button"
        >
          Waitlist
        </button>
        <button
          className="bux-button bux-button--icon"
          onClick={() => console.log(`Blacklist ${fullName} as a bad actor.`)}
          type="button"
        >
          Ban
        </button>
      </div>
    </div>
  );
}
