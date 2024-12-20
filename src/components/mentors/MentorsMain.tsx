// ./src/components/mentors/MentorsMain.tsx
//
// Client-only mentors main component,
// wrapped in auth, user providers and guards,
// requires user is either an admin or approved mentee/mentor.

// Explicitly declare as a NextJS client-only component.
"use client";

// React essential imports.
import { useEffect, useState } from "react";

// Firebase essential imports.
import {
  type DocumentData,
  collection,
  query,
  where,
} from "firebase/firestore";

// react-firehooks essential import.
import { useQueryData } from "react-firehooks";

// Local Firebase client service import.
import { fbStore } from "@lib/firebaseClientApp";

// Local component imports.
import { Alert } from "@components/Alert";
import Title from "@components/Title";
import {
  MentorCard,
  type MentorCardProps,
} from "@components/mentors/MentorCard";
import MentorsError from "@components/mentors/MentorsError";
import MentorsLoading from "@components/mentors/MentorsLoading";

// -----------------------------------------------------------------------------
export default function MentorsMain(): JSX.Element {
  // Fetch all approved mentors data from Firestore.
  const [mentorsData, loadingMentorsData, errorMentorsData] = useQueryData(
    query(
      collection(fbStore, "users"),
      where("userType", "==", "mentor"),
      where("adminApproved", "==", true),
    ),
  );

  // ---------------------------------------------------------------------------
  // Transform the fetched data to match the MentorCardProps interface.
  const [mentors, setMentors] = useState<MentorCardProps[]>([]);
  useEffect(() => {
    if (mentorsData) {
      setMentors(
        mentorsData.map((doc: DocumentData) =>
          (
          // biome-ignore format: added alignment for clarity.
          {
            fullName                     : `${doc.firstName} ${doc.lastName}`,
            osuEmail                     : doc.emailAddress,
            academicYear                 : doc.academicYear,
            currentMajors                : doc.currentMajors,
            preProfessionalRoute         : doc.preProfessionalRoute,
            proficientLanguages          : doc.proficientLanguages,
            currentResearchFields        : doc.currentResearchFields,
            profileAndResearchDescription: doc.profileAndResearchDescription,
          }
        ),
        ),
      );
    } else {
      setMentors([]);
    }
  }, [mentorsData]);

  // ---------------------------------------------------------------------------
  // Display loading, error, or mentor cards.
  if (loadingMentorsData) {
    return <MentorsLoading />;
  }

  if (errorMentorsData) {
    return <MentorsError />;
  }

  return (
    <>
      <Title title="USG Approved Mentors" />
      <div className="bux-container space-y-5">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor.osuEmail} {...mentor} />
          ))
        ) : (
          <Alert
            type="info"
            title="No Mentors Available"
            message="Apologies, there are no availabled mentors at this time."
            additionalText="We are working hard on recruiting more mentors. Please check back later."
          />
        )}
      </div>
    </>
  );
}
