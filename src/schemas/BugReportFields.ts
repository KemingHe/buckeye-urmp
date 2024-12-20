// ./src/schemas/BugReportFields.ts
//
// Bug-report fields Zod schema and type definition,
// for client-side bug report form validation.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// Local constant imports.
import { DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
// Bug report message schema and type definition.
export const BugReportMessageSchema: ZodSchema = z
  .string()
  .min(1, {
    message: "Please let us know the details of your issue.",
  })
  .max(DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH, {
    message: `Please limit your message to ${DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH} characters.`,
  });
export type BugReportMessage = z.infer<typeof BugReportMessageSchema>;

// -----------------------------------------------------------------------------
// Bug report device array, schema, and type definition.
export const BugReportDeviceTypeArray: string[] = ["desktop", "mobile"];
export const BugReportDeviceTypeSchema: ZodSchema = z
  .string()
  .refine(
    (rawType) => BugReportDeviceTypeArray.includes(rawType),
    {
      message: "Please select the platform your device is on.",
    },
  );
export type BugReportDeviceType = z.infer<typeof BugReportDeviceTypeSchema>;

// -----------------------------------------------------------------------------
// Bug report issue type array, schema, and type definition.
export const BugReportIssueTypeArray: string[] = [ "frontend", "backend" ];
export const BugReportIssueTypeSchema: ZodSchema = z
  .string()
  .refine(
    (rawType) => BugReportIssueTypeArray.includes(rawType),
    {
      message: "Please select the type of issue you are experiencing.",
    },
  );
export type BugReportIssueType = z.infer<typeof BugReportIssueTypeSchema>;

// -----------------------------------------------------------------------------
export const BugReportFieldsSchema: ZodSchema = z.object({
  message   : BugReportMessageSchema,
  deviceType: BugReportDeviceTypeSchema,
  issueType : BugReportIssueTypeSchema,
});
export type BugReportFields = z.infer<typeof BugReportFieldsSchema>;
