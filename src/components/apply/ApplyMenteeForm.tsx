// ./src/components/apply/ApplyMenteeForm.tsx
//
// Client-only mentee application form component,
// wrapped in auth, user providers and guards,
// uses apply mentee handler.

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
  type ApplyMenteeHandlerProps,
  applyMenteeHandler,
} from "@handlers/applyMenteeHandler";
import pause from "@utils/pause";

// Local constant imports.
import { UndergradPreProfRouteArray } from "@schemas/UndergradPreProfRoute";
import { UndergradYearArray } from "@schemas/UndergradYear";
import { UndergradMajorsArray } from "@src/schemas/UndergradMajors";

// Local form schema and type imports.
import {
  type ApplyMenteeFields,
  ApplyMenteeFieldsSchema,
} from "@schemas/ApplyMenteeFields";

// -----------------------------------------------------------------------------
export default function ApplyMenteeForm(): JSX.Element {
  // Firebase Auth and Firestore user context.
  const { userDocRef } = useUserContext();

  // React hook-form state and methods.
  const {
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    setValue,
  } = useForm<ApplyMenteeFields>({
    criteriaMode: "all",
    resolver: zodResolver(ApplyMenteeFieldsSchema),
  });

  // Alert message state and setter for visual feedback.
  const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
    undefined,
  );

  // Apply mentee handler error state and setter.
  const [handlerErrored, setHandlerErrored] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // On successful submission, show success alert, and wait for redirect.
  useEffect(() => {
    if (isSubmitSuccessful && !handlerErrored) {
      const handleSubmissionSuccess = async (): Promise<void> => {
        setAlertProps({
          type: "success",
          title: "Mentee Application Submitted",
          message: "Success: Your mentee application has been submitted.",
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
  // Mentee application form submission handler.
  const onSubmit: SubmitHandler<ApplyMenteeFields> = async (
    data: ApplyMenteeFields,
  ) => {
    try {
      // Validate, prepare, and submit mentee application data to Firestore.
      if (!userDocRef) {
        throw new Error("User document reference is not available.");
      }

      ApplyMenteeFieldsSchema.parse(data);
      const applyMenteeData: ApplyMenteeHandlerProps = {
        userDocRef,
        sanitizedFields: data,
      };
      await applyMenteeHandler(applyMenteeData);
      setHandlerErrored(false);

      // Gracefully catch, log, and display mentee application submission failure to user.
    } catch (error) {
      console.error(error);
      setHandlerErrored(true);
      setAlertProps({
        type: "warning",
        title: "Mentee Application Submission Failure",
        message: "Error: Mentee application submission failed.",
        additionalText:
          "Apologies, we are actively investigating. **Try refreshing the page.** Please help us by reporting your case.",
      });
    }
  };

  // ---------------------------------------------------------------------------
  // Mentee application form render.
  return (
    <>
      {alertProps && <Alert {...alertProps} />}
      <Title title="Mentee Application" />
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
            name="desiredResearchFields"
            placeholder="What are your looking to research? Be as general or specific as you like."
            register={register}
            error={errors.desiredResearchFields}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            labelText="Desired Research Fields"
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
                : "Submit Mentee Application"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
