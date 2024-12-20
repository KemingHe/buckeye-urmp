// ./src/components/bugReport/BugReportDummy.tsx
//
// Static bug-report dummy component for the bug-report page,
// placeholder as the client-only bug-report component loads.

// NextJS defaults to server-side rendering (SSR) when not specified.

// NextJS essential imports.
import { ulid } from "ulidx";

// Local component imports.
import Title from "@components/Title";

// Local constant import.
import { DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export default function BugReportDummy(): JSX.Element {
  // Generate unique ID for bug report.
  const messageTextareaId: string = ulid();
  const deviceTypeSelectId: string = ulid();
  const issueTypeSelectId: string = ulid();

  // ---------------------------------------------------------------------------
  return (
    <>
      <Title
        title="Bug Report"
        titleSlogan="We are grateful for your feedback, and are here to help!"
      />
      <form>
        <div className="bux-container bux-pad-bottom-sp-96 flex flex-col space-y-4">
          <div className="bux-text-area w-full">
            <textarea
              className="bux-text-area__text-area bux-text-area__text-area--disabled min-h-40"
              disabled={true}
              id={`bux-text-area__text-area-${messageTextareaId}`}
              maxLength={DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH}
              minLength={1}
              name="message"
              placeholder="What can we help you with today?"
            />
          </div>
          <div className="bux-selection-dropdown w-60">
            <label
              className="bux-selection-dropdown__label"
              htmlFor={`bux-selection-dropdown__selection-dropdown-${deviceTypeSelectId}`}
            >
              Platform
            </label>
            <div className="bux-selection-dropdown__input bux-selection-dropdown__input--disabled">
              <select
                disabled={true}
                id={`bux-selection-dropdown__selection-dropdown-${deviceTypeSelectId}`}
              >
                <option value="">-- Select --</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
          </div>
          <div className="bux-selection-dropdown w-60">
            <label
              className="bux-selection-dropdown__label"
              htmlFor={`bux-selection-dropdown__selection-dropdown-${issueTypeSelectId}`}
            >
              Issue Type
            </label>
            <div className="bux-selection-dropdown__input bux-selection-dropdown__input--disabled">
              <select
                disabled={true}
                id={`bux-selection-dropdown__selection-dropdown-${issueTypeSelectId}`}
              >
                <option value="">-- Select --</option>
                <option value="frontend">A Visual Bug</option>
                <option value="backend">Something Else</option>
              </select>
            </div>
          </div>
          <div className="pt-4">
            <button
              className="bux-button bux-button--alt"
              disabled={true}
              type="submit"
            >
              Loading...
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
