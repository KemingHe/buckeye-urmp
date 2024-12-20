// ./src/app/page.tsx
//
// Research Mentorship Program homepage.

// NextJS defaults to server-side rendering when not specified.

// Local static and mixed component imports.
// import { Alert } from "@components/Alert";
import Title from "@components/Title";
import Hero from "@components/signIn/Hero";

export default function HomePage(): JSX.Element {
  return (
    <>
      {/* <Alert
        type="success"
        title="Authentication Issue Resolved"
        message="Issue Update: Repeated alert and buggy auth issues have been resolved. "
        additionalText="Thank you for your patience. If you are still experiencing issues, let us know by reporting it."
      /> */}
      <Title
        title="Undergraduate Research Mentorship Program"
        titleParent="Undergraduate Student Government at The Ohio State University"
      />
      <Hero />
    </>
  );
}
