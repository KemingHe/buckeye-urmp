// ./src/components/signIn/SignInError.tsx
//
// Static sign-in error component for the auth context provider
// at sign-in parent. Error variant of the sign-in dummy component.

// NextJS defaults to maximizing server-side rendering (SSR) when not specified.

// NextJS essential imports.
import { ulid } from "ulidx";

// -----------------------------------------------------------------------------
export default function SignInError(): JSX.Element {
  // Generate unique ID for OSU email field input.
  const osuEmailId: string = ulid();

  return (
    <form className="w-60 space-y-2">
      {/* Static error OSU email field input. */}
      <div className="bux-text-field">
        <input
          aria-describedby={`bux-text-field__error-message-${osuEmailId}`}
          aria-invalid={true}
          className="bux-text-field__input bux-text-field__input--error"
          disabled={true}
          id={`bux-text-field__text-input-${osuEmailId}`}
          name="osuEmail"
          placeholder="buckeye.1@osu.edu"
          type="email"
        />
        <span
          className="text-white"
          id={`bux-text-field__error-message-${osuEmailId}`}
        >
          Error: An unexpected error occurred. Help us fix this by reporting it
        </span>
      </div>
      {/* Static dummy form submission button. */}
      <button
        className="bux-button bux-button--alt"
        disabled={true}
        type="submit"
      >
        Loading...
      </button>
    </form>
  );
}
