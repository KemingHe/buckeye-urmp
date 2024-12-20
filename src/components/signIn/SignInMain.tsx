// ./src/components/signIn/SignInMain.tsx
//
// Client-only dynamic sign in/up component for the static/mixed hero component,
// which is then used for the static/mixed landing page.

// Explicitly declare as a NextJS client-only component.
"use client";

// NextJS and Firebase essential imports.
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ulid } from "ulidx";
import { type ZodSchema, z } from "zod";

// Local context and utility imports.
import { signInHandler } from "@handlers/signInHandler";
import { OSUEmailSchema } from "@schemas/OSUEmail";

// -----------------------------------------------------------------------------
// Sign in/up fields schema and type.
export const SignInFieldsSchema: ZodSchema = z.object({
  osuEmail: OSUEmailSchema,
});
export type SignInFields = z.infer<typeof SignInFieldsSchema>;

// -----------------------------------------------------------------------------
export default function SignInMain(): JSX.Element {
  // Generate unique ID for OSU email field input.
  const osuEmailId: string = ulid();

  // ---------------------------------------------------------------------------
  // React hook-form state and methods.
  const {
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<SignInFields>({
    criteriaMode: "all",
    resolver: zodResolver(SignInFieldsSchema),
  });

  // Error message state and setter for form submission handler.
  const [handlerErrored, setHandlerErrored] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // Reset form on successful submission.
  useEffect(() => {
    if (isSubmitSuccessful && !handlerErrored) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // ---------------------------------------------------------------------------
  // Sign in/up form submission handler.
  const onSubmit: SubmitHandler<SignInFields> = async (data: SignInFields) => {
    try {
      // Validate, prepare, and send sign-in link to OSU email.
      OSUEmailSchema.parse(data.osuEmail);
      await signInHandler(data.osuEmail);
      setHandlerErrored(false);
      alert(
        "A sign-in link has been sent to your OSU email. Please check your inbox.",
      );

      // Gracefully catch, log, and display Firebase Auth error to user.
    } catch (error) {
      setHandlerErrored(true);
      console.error(error);
      setError("osuEmail", {
        type: "manual",
        message:
          "An unexpected error occurred. Help us fix this by reporting it.",
      });
    }
  };

  // ---------------------------------------------------------------------------
  // NOT using generic Input component because need to fine-tune styling.
  return (
    <form className="w-60 space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="bux-text-field">
        {/* OSU email field input. */}
        <input
          {...register("osuEmail")}
          aria-describedby={`bux-text-field__error-message-${osuEmailId}`}
          aria-invalid={errors.osuEmail ? "true" : "false"}
          className={`bux-text-field__input ${
            errors.osuEmail ? "bux-text-field__input--error" : ""
          }`}
          disabled={isLoading || isSubmitting}
          id={`bux-text-field__text-input-${osuEmailId}`}
          placeholder="buckeye.1@osu.edu"
          type="email"
        />
        {/* OSU email field error message. */}
        {errors.osuEmail && (
          <span
            className="text-white"
            id={`bux-text-field__error-message-${osuEmailId}`}
          >
            {`Error: ${errors.osuEmail.message}`}
          </span>
        )}
      </div>
      {/* Sign in/up form submission button. */}
      <button
        className="bux-button bux-button--alt"
        disabled={isLoading || isSubmitting}
        type="submit"
      >
        {isLoading || isSubmitting ? "Loading..." : "Sign In/Up"}
      </button>
    </form>
  );
}
