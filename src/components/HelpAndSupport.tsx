// ./src/components/HelpAndSupport.tsx
//
// Static help and support component with link to bug report page.

// Explicitly declare as a NextJS static, server-side rendering (SSR) component.
"use server";

// NextJS essential imports.
import Link from "next/link";

// Local route constant import.
import { BUG_REPORT_ROUTE } from "@constants/routeConstants";

// -----------------------------------------------------------------------------
export default async function HelpAndSupport(): Promise<JSX.Element> {
  return (
    // Forced to use inline styling due to custom bux-style sibling components.
    <div style={{ padding: "15px" }}>
      <div className="bux-panel">
        <h5 className="bux-panel__heading">Help and Support</h5>
        <p>
          Undergraduate Research Mentorship Program is a{" "}
          <b>peer-mentorship initiative</b> for aspiring undergrad researcher at
          The Ohio State University. This platform is actively maintained
          entirely by <b>student developers</b> from the Software Engineering
          Club (DEV) at The Ohio State University. Your feedback helps us
          improve the site. For inquiries, please <b>contact</b> our{" "}
          <b>program director</b> using the <i>Contact Us</i> link below.
        </p>
        <div className="flex flex-row space-x-4">
          <Link className="bux-button" href={BUG_REPORT_ROUTE}>
            Report a Bug
          </Link>
          <Link
            className="bux-button bux-button--alt"
            href="mailto:desai.479@osu.edu"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
