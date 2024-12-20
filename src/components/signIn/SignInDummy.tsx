// ./src/components/signIn/SignInDummy.tsx
//
// Static sign-in dummy component for the hero component on the homepage,
// placeholder as the client-only sign-in component loads.

// NextJS defaults to server-side rendering (SSR) when not specified.

// -----------------------------------------------------------------------------
export default function SignInDummy(): JSX.Element {
  return (
    <form className="w-60 space-y-2">
      {/* Static dummy OSU email field input. */}
      <div className="bux-text-field">
        <input
          className="bux-text-field__input"
          disabled={true}
          name="osuEmail"
          placeholder="buckeye.1@osu.edu"
          type="email"
        />
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
