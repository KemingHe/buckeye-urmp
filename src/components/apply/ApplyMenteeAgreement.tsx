// ./src/components/apply/ApplyMenteeAgreement.tsx
//
// Static, client-only, terms and conditions agreement component
// for users to read and click agree before rendering the mentee application form.

// Explicitly declare as a NextJS client component.
"use client";

// Local component imports.
import Title from "@components/Title";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
interface ApplyMenteeAgreementProps {
  acceptAgreement: () => void;
}

export default function ApplyMenteeAgreement({
  acceptAgreement,
}: ApplyMenteeAgreementProps) {
  return (
    <>
      <Title title="Mentee Agreement" />
      <div className="bux-container bux-pad-bottom-sp-64 flex flex-col space-y-4">
        <p>
          Welcome! Here are 3 key points to consider <b>before</b> scheduling a
          meeting with your peer mentor:
        </p>
        <ul className="bux-list-ul space-y-8">
          <li>
            <i>What are you looking to research?</i> When it comes to your
            fields of interest, try to be as specific as possible in order to
            find your best matching peer mentor, and eventually, your research
            professor.
          </li>
          <li>
            <i>What do you wish to get out of research?</i> On top of the
            experience itself, make sure you are rewarded fairly through either
            academic credits, financial compensation, letters of recommendation,
            etc.
          </li>
          <li>
            <i>
              Also consider how research can further your pre-professional path,
            </i>{" "}
            if applicable.
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
