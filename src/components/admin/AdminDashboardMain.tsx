// ./src/components/admin/AdminDashboardMain.tsx
//
// Client-only admin dashboard main component,
// wrapped in auth, user providers and guards,
// requires user is an authenticated admin.

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
import AdminDashboardError from "@components/admin/AdminDashboardError";
import AdminDashboardLoading from "@components/admin/AdminDashboardLoading";
import {
  MenteeApplicantCard,
  type MenteeApplicantCardProps,
} from "@components/admin/MenteeApplicantCard";
import {
  MentorApplicantCard,
  type MentorApplicantCardProps,
} from "@components/admin/MentorApplicantCard";

// Local hook imports.
import { type UseLoadingInterface, useLoading } from "@hooks/useLoading";

// -----------------------------------------------------------------------------
export default function AdminDashboardMain(): JSX.Element {
  const { isLoading, startLoading, stopLoading }: UseLoadingInterface =
    useLoading();

  // ---------------------------------------------------------------------------
  // Fetch all pending mentor and mentee applications data from Firestore.
  const [
    mentorApplicantsData,
    loadingMentorApplicantsData,
    errorMentorApplicantsData,
  ] = useQueryData(
    query(
      collection(fbStore, "users"),
      where("userType", "==", "mentor"),
      where("adminApproved", "==", false),
    ),
  );

  const [
    menteeApplicantsData,
    loadingMenteeApplicantsData,
    errorMenteeApplicantsData,
  ] = useQueryData(
    query(
      collection(fbStore, "users"),
      where("userType", "==", "mentee"),
      where("adminApproved", "==", false),
    ),
  );

  // ---------------------------------------------------------------------------
  // Transform the fetched data to match the MentorApplicantCardProps interface.
  const [mentorApplicants, setMentorApplicants] = useState<
    MentorApplicantCardProps[]
  >([]);
  useEffect(() => {
    if (mentorApplicantsData) {
      setMentorApplicants(
        mentorApplicantsData.map((doc: DocumentData) =>
          (
          // biome-ignore format: added alignment for clarity.
          {
            isLoading                    : isLoading || loadingMentorApplicantsData,
            startLoading                 : startLoading,
            stopLoading                  : stopLoading,
            id                           : doc.id,
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
      setMentorApplicants([]);
    }
  }, [mentorApplicantsData]);

  // Transform the fetched data to match the MenteeApplicantCardProps interface.
  const [menteeApplicants, setMenteeApplicants] = useState<
    MenteeApplicantCardProps[]
  >([]);
  useEffect(() => {
    if (menteeApplicantsData) {
      setMenteeApplicants(
        menteeApplicantsData.map((doc: DocumentData) =>
          (
          // biome-ignore format: added alignment for clarity.
          {
            id                   : doc.id,
            fullName             : `${doc.firstName} ${doc.lastName}`,
            osuEmail             : doc.emailAddress,
            academicYear         : doc.academicYear,
            currentMajors        : doc.currentMajors,
            preProfessionalRoute : doc.preProfessionalRoute,
            desiredResearchFields: doc.desiredResearchFields,
          }
        ),
        ),
      );
    } else {
      setMenteeApplicants([]);
    }
  }, [menteeApplicantsData]);

  // ---------------------------------------------------------------------------
  // Display loading, error, or mentor and mentee applicant cards.
  if (loadingMentorApplicantsData || loadingMenteeApplicantsData) {
    return <AdminDashboardLoading />;
  }

  if (errorMentorApplicantsData || errorMenteeApplicantsData) {
    return <AdminDashboardError />;
  }

  return (
    <>
      {/* Mentor Applicants */}
      <Title title="Mentor Applicants" />
      <div className="bux-container space-y-5">
        {mentorApplicants.length > 0 ? (
          mentorApplicants.map((mentorApplicant) => (
            <MentorApplicantCard
              key={mentorApplicant.osuEmail}
              {...mentorApplicant}
            />
          ))
        ) : (
          <Alert
            type="info"
            title="No Mentor Applicants Found"
            message="All available mentor applicants have been approved."
          />
        )}
      </div>
      <div className="bux-container pt-4">
        <hr className="cux-horizontal-rule" />
      </div>
      {/* Mentee Applicants */}
      <Title title="Mentee Applicants" />
      <div className="bux-container space-y-5">
        {menteeApplicants.length > 0 ? (
          menteeApplicants.map((menteeApplicant) => (
            <MenteeApplicantCard
              key={menteeApplicant.osuEmail}
              {...menteeApplicant}
            />
          ))
        ) : (
          <Alert
            type="info"
            title="No Mentee Applicants Found"
            message="All available mentee applicants have been approved."
          />
        )}
      </div>
    </>
  );
}
