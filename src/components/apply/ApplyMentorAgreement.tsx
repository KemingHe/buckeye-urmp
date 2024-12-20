// ./src/components/apply/ApplyMentorAgreement.tsx
//
// Static, client-only mentor application agreement component
// for users to read and click agree before rendering the mentor application form.

// Explicitly declare as a NextJS client component.
"use client";

// Local component imports.
import Title from "@components/Title";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
interface ApplyMentorAgreementProps {
  acceptAgreement: () => void;
}

export default function ApplyMentorAgreement({
  acceptAgreement,
}: ApplyMentorAgreementProps) {
  return (
    <>
      <Title title="Mentor Agreement" />
      <div className="bux-container bux-pad-bottom-sp-64 flex flex-col space-y-4">
        <p>
          We applaud your decision to help out a fellow Buckeye through their
          undergraduate research endeavor. Here are 3 key points to consider as
          a peer mentor:
        </p>
        <ul className="bux-list-ul space-y-8">
          <li>
            <i>Get to know your mentee’s interest and motivation!</i> What are
            your mentee’s desired research fields? Pay attention to how broad or
            specific they are.
          </li>
          <li>
            <i>Help your mentee establish concrete goals!</i> This could range
            anywhere from exploring working as a lab assistant, all the way to
            eventually publishing their own academic journal article.
          </li>
          <li>
            <i>Advocate for your mentee!</i> Make sure they are rewarded fairly
            through either academic credits, financial compensation, letters of
            recommendation, etc.
          </li>
        </ul>
        <div className="pt-6">
          <button
            className="bux-button"
            onClick={acceptAgreement}
            type="button"
          >
            I'm Ready to Apply!
          </button>
        </div>
      </div>
    </>
  );
}
