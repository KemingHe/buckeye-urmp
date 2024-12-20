// ./src/components/dashboard/TimelineHorizontal.tsx
//
// Horizontal timeline sub-component used in the timeline main component.

// Explicitly declare as a NextJS client-only component.
"use client";

// NextJS and Firebase essential imports.

// Local user context imports.
import { type UserContextProps, useUserContext } from "@contexts/UserContext";

// -----------------------------------------------------------------------------
export default function TimelineHorizontal(): JSX.Element {
  const status: string = "Incomplete";

  return (
    <div className="bux-timeline-horizontal">
      <div
        className="bux-timeline-horizontal__item"
        style={{ opacity: status === "Incomplete" ? 1 : 0.5 }}
        data-testid="timeline-item"
      >
        <div
          className="bux-timeline-horizontal__marker"
          aria-hidden="true"
          style={{
            backgroundColor: status === "Incomplete" ? "#BA0C2F" : "#FFF",
          }}
          data-testid="timeline-marker"
        />
        <div className="bux-timeline-horizontal__content">
          <h3 className="bux-timeline__heading">Step 1. Sign Up</h3>
          <div className="bux-timeline__date">Done!</div>
          <p>
            Congrats on signing up! Here's how you apply to become a mentee or
            mentor.
          </p>
        </div>
      </div>
      <div
        className="bux-timeline-horizontal__item"
        style={{ opacity: status === "Pending" ? 1 : 0.5 }}
        data-testid="timeline-item"
      >
        <div
          className="bux-timeline-horizontal__marker"
          aria-hidden="true"
          style={{
            backgroundColor: status === "Pending" ? "#BA0C2F" : "#FFF",
          }}
          data-testid="timeline-marker"
        />
        <div className="bux-timeline-horizontal__content">
          <h3 className="bux-timeline__heading">Step 2. Apply</h3>
          <div className="bux-timeline__date">Pending...</div>
          <p>(Description: congrats and moving forward.)</p>
        </div>
      </div>
      <div
        className="bux-timeline-horizontal__item"
        style={{ opacity: status === "Accepted" ? 1 : 0.5 }}
        data-testid="timeline-item"
      >
        <div
          className="bux-timeline-horizontal__marker"
          aria-hidden="true"
          style={{
            backgroundColor: status === "Accepted" ? "#BA0C2F" : "#FFF",
          }}
          data-testid="timeline-marker"
        />
        <div className="bux-timeline-horizontal__content">
          <h3 className="bux-timeline__heading">Step 3. Accepted</h3>
          <div className="bux-timeline__date">Pending...</div>
          <p>(Description: congrats and moving forward.)</p>
        </div>
      </div>
    </div>
  );
}
