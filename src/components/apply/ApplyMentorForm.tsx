// ./src/components/apply/ApplyMentorForm.tsx
//
// Client-only mentor application form component,
// wrapped in auth, user providers and guards,
// uses apply mentor handler.

// Explicitly declare as a NextJS client-only component.
"use client";

// NextJS and Firebase essential imports.
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

// Local component imports.
import { Alert, type AlertProps } from "@components/Alert";
import { Input } from "@components/Input";
import { MultiSelect } from "@components/MultiSelect";
import { Select } from "@components/Select";
import { Textarea } from "@components/Textarea";
import Title from "@components/Title";

// Local context imports.
import { useUserContext } from "@contexts/UserContext";

// Local utility imports.
import {
  type ApplyMentorHandlerProps,
  applyMentorHandler,
} from "@handlers/applyMentorHandler";
import pause from "@utils/pause";

// Local constant imports.
import { ProficientLanguagesArray } from "@schemas/ProficientLanguages";
import { UndergradPreProfRouteArray } from "@schemas/UndergradPreProfRoute";
import { UndergradYearArray } from "@schemas/UndergradYear";
import { UndergradMajorsArray } from "@src/schemas/UndergradMajors";

// Local form schema and type imports.
import {
  type ApplyMentorFields,
  ApplyMentorFieldsSchema,
} from "@schemas/ApplyMentorFields";

// -----------------------------------------------------------------------------
export default function ApplyMentorForm(): JSX.Element {
  // Firebase Auth and Firestore user context.
  const { userDocRef } = useUserContext();

  // React hook-form state and methods.
  const {
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    setValue,
  } = useForm<ApplyMentorFields>({
    criteriaMode: "all",
    resolver: zodResolver(ApplyMentorFieldsSchema),
    defaultValues: {
      proficientLanguages: [],
    },
  });

  // Alert message state and setter for visual feedback.
  const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
    undefined,
  );

  // Apply mentor handler error state and setter.
  const [handlerErrored, setHandlerErrored] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // On successful submission, show success alert, and wait for redirect.
  useEffect(() => {
    if (isSubmitSuccessful && !handlerErrored) {
      const handleSubmissionSuccess = async (): Promise<void> => {
        setAlertProps({
          type: "success",
          title: "Mentor Application Submitted",
          message: "Success: Your mentor application has been submitted.",
          additionalText:
            "Thank you for applying. Redirecting to dashboard in 3... 2... 1...",
        });
        await pause(2.5);

        // Redirect handled by RoleGuard.
      };

      handleSubmissionSuccess();
    }
  }, [isSubmitSuccessful, handlerErrored]);

  // ---------------------------------------------------------------------------
  // Mentor application form submission handler.
  const onSubmit: SubmitHandler<ApplyMentorFields> = async (
    data: ApplyMentorFields,
  ): Promise<void> => {
    try {
      // Validate, prepare, and submit mentor application data to Firestore.
      if (!userDocRef) {
        throw new Error("Error: No user document reference found.");
      }

      ApplyMentorFieldsSchema.parse(data);
      const applyMentorData: ApplyMentorHandlerProps = {
        userDocRef,
        sanitizedFields: data,
      };
      await applyMentorHandler(applyMentorData);
      setHandlerErrored(false);

      // Gracefully catch, log, and display mentor application submission failure to user.
    } catch (error) {
      console.error(error);
      setAlertProps({
        type: "warning",
        title: "Mentor Application Submission Failure",
        message: "Error: Mentor application submission failed.",
        additionalText:
          "Apologies, we are actively investigating. **Try refreshing the page.** Please help us by reporting your case.",
      });
    }
  };

  // ---------------------------------------------------------------------------
  // Mentor application form render.
  return (
    <>
      {alertProps && <Alert {...alertProps} />}
      <Title title="Mentor Application" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bux-container bux-pad-bottom-sp-96 flex flex-col space-y-4">
          <div className="flex flex-row space-x-10">
            <Input
              name="firstName"
              type="text"
              placeholder="Brutus"
              register={register}
              error={errors.firstName}
              isLoading={isLoading || isSubmitting || isSubmitSuccessful}
              labelText="First Name"
              className="w-60"
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Buckeye"
              register={register}
              error={errors.lastName}
              isLoading={isLoading || isSubmitting || isSubmitSuccessful}
              labelText="Last Name"
              className="w-60"
            />
          </div>
          <Select
            name="academicYear"
            register={register}
            error={errors.academicYear}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={UndergradYearArray.map((year: string) => ({
              value: year,
              label: year,
            }))}
            labelText="Academic Year"
            className="w-60"
          />
          <MultiSelect
            name="proficientLanguages"
            register={register}
            error={errors.proficientLanguages}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={ProficientLanguagesArray.map((language: string) => ({
              value: language,
              label: language,
            }))}
            onChange={(selectedOptions) => {
              setValue(
                "proficientLanguages",
                selectedOptions.map((option) => option.value),
              );
            }}
            labelText="Proficient Languages"
            helperText="Are you fluent in any languages other than English? (Optional)"
            className="w-full"
          />
          <MultiSelect
            name="currentMajors"
            register={register}
            error={errors.currentMajors}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={UndergradMajorsArray.map((major: string) => ({
              value: major,
              label: major,
            }))}
            onChange={(selectedOptions) => {
              setValue(
                "currentMajors",
                selectedOptions.map((option) => option.value),
              );
            }}
            labelText="Current Major(s)"
            helperText="Type to search and select from list."
            className="w-full"
          />
          <Select
            name="preProfessionalRoute"
            register={register}
            error={errors.preProfessionalRoute}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={UndergradPreProfRouteArray.map((route: string) => ({
              value: route,
              label: route,
            }))}
            labelText="Pre-Professional Route"
            className="w-60"
          />
          <Textarea
            name="currentResearchFields"
            placeholder="What topics are you currently researching?"
            register={register}
            error={errors.currentResearchFields}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            labelText="Current Research Fields"
            className="w-full"
          />
          <Textarea
            name="profileAndResearchDescription"
            placeholder="In a short paragraph, describe your research experience and achievements. Don't forget to include the name of your research lab and professor/advisor."
            register={register}
            error={errors.profileAndResearchDescription}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            labelText="Profile and Research Description"
            className="w-full"
          />
          <div className="pt-4">
            <button
              className="bux-button"
              disabled={isLoading || isSubmitting || isSubmitSuccessful}
              type="submit"
            >
              {isLoading || isSubmitting || isSubmitSuccessful
                ? "Loading..."
                : "Submit Mentor Application"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
