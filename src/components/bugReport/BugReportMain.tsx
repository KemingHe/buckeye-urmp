// ./src/components/bugReport/BugReportMain.tsx
//
// Client-only dynamic bug-report main component for the bug-report page,
// uses the client-side auth, user context, and bug report handler.

// Explicitly declare as a NextJS client-only component.
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// NextJS and Firebase essential imports.
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

// Local component imports.
import { Alert, type AlertProps } from "@components/Alert";
import { Select } from "@components/Select";
import { Textarea } from "@components/Textarea";
import Title from "@components/Title";

// Local context imports.
import { useAuthContext } from "@contexts/AuthContext";
import { useUserContext } from "@contexts/UserContext";

// Local hook imports.
import {
  type UseRedirectingInterface,
  useRedirecting,
} from "@hooks/useRedirecting";

// Local utility imports.
import {
  type BugReportHandlerProps,
  bugReportHandler,
} from "@handlers/bugReportHandler";
import pause from "@utils/pause";
import { safeClientRedirect } from "@utils/safeClientRedirect";

// Local route constant imports.
import {
  ADMIN_DASHBOARD_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  SUPER_ADMIN_DASHBOARD_ROUTE,
} from "@constants/routeConstants";

// Local form schema and type imports.
import {
  type BugReportFields,
  BugReportFieldsSchema,
} from "@schemas/BugReportFields";

// -----------------------------------------------------------------------------
export function BugReportMain(): JSX.Element {
  // Firebase Auth context.
  const { clientRouter, pathname, user, authContextLoading, authContextError } =
    useAuthContext();

  // Firestore user context.
  const { userData, userContextLoading, userContextError } = useUserContext();

  // React hook-form state and methods.
  const {
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<BugReportFields>({
    criteriaMode: "all",
    resolver: zodResolver(BugReportFieldsSchema),
  });

  // Alert message state and setter for visual feedback.
  const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
    undefined,
  );

  // Error message state and setter for form submission handler.
  const [handlerErrored, setHandlerErrored] = useState<boolean>(false);

  // Redirecting state.
  const { isRedirecting, startRedirecting }: UseRedirectingInterface =
    useRedirecting();

  // ---------------------------------------------------------------------------
  // IMPORTANT: The following logic is UNIQUE to the BugReportMain component.
  // On successful submission, reset form, show success alert, and redirect.
  useEffect(() => {
    // Async function wrapper for "pause" and handles submission success.
    async function handleSubmissionSuccess() {
      reset();
      setAlertProps({
        type: "success",
        title: "Submission Success",
        message: "Success: Your bug report has been submitted.",
        additionalText:
          "Thank you for reporting. Rest assured that we are actively working on it. Redirecting in 3... 2... 1...",
      });
      await pause(3);
    }

    // -------------------------------------------------------------------------
    // Make sure all loading is complete, no errors, and not redirecting.
    if (
      // Check if contexts and router are not loading or errored.
      !authContextLoading &&
      !authContextError &&
      !userContextLoading &&
      !userContextError &&
      !isRedirecting &&
      // Check if react-hook-form is not loading or submitting.
      !isLoading &&
      !isSubmitting &&
      // Check if form submission was successful with no handler errors.
      isSubmitSuccessful &&
      !handlerErrored
    ) {
      // -----------------------------------------------------------------------
      // Redirect to home if user is not authenticated.
      if (!user) {
        handleSubmissionSuccess();
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: HOME_ROUTE,
          startRedirecting,
          clientRouter,
        });
        return;
      }

      // -----------------------------------------------------------------------
      if (user && userData) {
        // Redirect to super admin dashboard if user is authenticated super admin.
        if (userData.userType === "superAdmin") {
          handleSubmissionSuccess();
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: SUPER_ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

        // Redirect to admin dashboard if user is authenticated admin.
        if (userData.userType === "admin") {
          handleSubmissionSuccess();
          safeClientRedirect({
            currentRoute: pathname,
            targetRoute: ADMIN_DASHBOARD_ROUTE,
            startRedirecting,
            clientRouter,
          });
          return;
        }

        // -----------------------------------------------------------------------
        // Redirect to regular user dashboard otherwise.
        handleSubmissionSuccess();
        safeClientRedirect({
          currentRoute: pathname,
          targetRoute: DASHBOARD_ROUTE,
          startRedirecting,
          clientRouter,
        });
      }
    }
  }, [
    authContextLoading,
    authContextError,
    userContextLoading,
    userContextError,
    isRedirecting,
    isLoading,
    isSubmitting,
    isSubmitSuccessful,
    handlerErrored,
    user,
    userData,
    pathname,
    clientRouter,
  ]);

  // ---------------------------------------------------------------------------
  // Bug report form submission handler.
  // CANNOT use function due to typing as SubmitHandler<T>.
  const onSubmit: SubmitHandler<BugReportFields> = async (
    data: BugReportFields,
  ) => {
    try {
      // Validate, prepare, and submit bug report data to Firestore.
      BugReportFieldsSchema.parse(data);
      const bugReportData: BugReportHandlerProps = {
        contact: user?.email ? user.email : null,
        sanitizedFields: data,
      };
      await bugReportHandler(bugReportData);
      setHandlerErrored(false);

      // Gracefully catch, log, and display bug report submission failure to user.
    } catch (error) {
      setHandlerErrored(true);
      console.error(error);
      setAlertProps({
        type: "error",
        title: "Submission Failure",
        message: "Error: Bug report submission failed.",
        additionalText:
          "Apologies, we are actively investigating. **Try refreshing the page.** Please contact dev@osu.edu for assistance.",
      });
      setError("message", {
        type: "manual",
        message:
          "An unexpected error occurred. Please contact dev@osu.edu for assistance.",
      });
    }
  };

  // ---------------------------------------------------------------------------
  return (
    <>
      {alertProps && <Alert {...alertProps} />}
      <Title
        title="Bug Report"
        titleSlogan="We are grateful for your feedback, and are here to help!"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bux-container bux-pad-bottom-sp-96 flex flex-col space-y-4">
          {/* Bug report message textarea. */}
          <Textarea
            name="message"
            placeholder="What can we help you with today?"
            register={register}
            error={errors.message}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            className="w-full"
          />
          {/* Bug report form device type selection dropdown. */}
          <Select
            name="deviceType"
            register={register}
            error={errors.deviceType}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={[
              { value: "desktop", label: "Desktop" },
              { value: "mobile", label: "Mobile" },
            ]}
            labelText="Platform"
            className="w-60"
          />
          {/* Bug report issue type selection dropdown. */}
          <Select
            name="issueType"
            register={register}
            error={errors.issueType}
            isLoading={isLoading || isSubmitting || isSubmitSuccessful}
            options={[
              { value: "frontend", label: "A Visual Bug" },
              { value: "backend", label: "Something Else" },
            ]}
            labelText="Issue Type"
            className="w-60"
          />
          {/* Bug report form submission button. */}
          <div className="pt-4">
            <button
              className="bux-button"
              disabled={isLoading || isSubmitting || isSubmitSuccessful}
              type="submit"
            >
              {isLoading || isSubmitting || isSubmitSuccessful
                ? "Loading..."
                : "Submit Bug Report"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
