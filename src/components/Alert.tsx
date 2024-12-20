// ./src/components/Alert.tsx
//
// Static, generic alert component with switchable styles/types.

// NextJS defaults to maximizing server-side rendering (SSR) for statics.

// Zod essential imports.
import { type ZodSchema, z } from "zod";

// -----------------------------------------------------------------------------
// Define alert tuple, schema, and type.
export const AlertTypesTuple = ["info", "success", "warning", "error"] as const;
export const AlertTypeSchema: ZodSchema = z.enum(AlertTypesTuple);
export type AlertType = z.infer<typeof AlertTypeSchema>;

// -----------------------------------------------------------------------------
// biome-ignore format: added aligntment for clarity.
export interface AlertProps {
  type           : AlertType;
  title          : string;
  message        : string;
  additionalText?: string;
}

export function Alert({
  type,
  title,
  message,
  additionalText,
}: AlertProps): JSX.Element {
  return (
    <div style={{ padding: "15px" }}>
      <div className={`bux-alert bux-alert--${type}`}>
        <div className="bux-alert__icon" aria-hidden="true" />
        <div className="visually-hidden">
          {`${type.toUpperCase()}: ${title}`}
        </div>
        <div className="bux-alert__message">
          <h2 className="bux-alert__message-title">{message}</h2>
          {additionalText && (
            <div className="bux-alert__message-text">{additionalText}</div>
          )}
        </div>
      </div>
    </div>
  );
}
