// ./src/components/verify/VerifyLoading.tsx
//
// Static placeholder loading component for the auth verification page.

// NextJS defaults to server-side rendering (SSR) when not specified.

// Local static loading component import.
import { Loading } from "@components/Loading";

// -----------------------------------------------------------------------------
export default function VerifyLoading(): JSX.Element {
  return (
    <Loading
      title="Loading..."
      message="Just a moment, please."
      image={{
        src: "/images/loading/loading-2-1024px.png",
        width: 1024,
        height: 683,
        alt: "Sammy Stenger hugs PAWS dog Cascade during the Student Life RECESS event on the south oval. Photographed for OSAM Winter 2022.",
      }}
    />
  );
}
