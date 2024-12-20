// ./src/schemas/DesiredResearchFieldsLite.ts
//
// Simplified, freeform version of the DesiredResearchFields schema.
// Non-empty and limits max charactors.

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local constant imports.
import { DEFAULT_MIN_LITE_DESIRED_RESEARCH_FIELDS_LENGTH, DEFAULT_MAX_LITE_DESIRED_RESEARCH_FIELDS_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export const DesiredResearchFieldsLiteSchema: ZodSchema = z
  .string()
  .min(DEFAULT_MIN_LITE_DESIRED_RESEARCH_FIELDS_LENGTH, {
    message: `Please provide a short sentence or two, least ${DEFAULT_MIN_LITE_DESIRED_RESEARCH_FIELDS_LENGTH} characters.`,
  })
  .max(DEFAULT_MAX_LITE_DESIRED_RESEARCH_FIELDS_LENGTH, {
    message: `Please limit your research field to ${DEFAULT_MAX_LITE_DESIRED_RESEARCH_FIELDS_LENGTH} characters.`,
  });
export type DesiredResearchFieldsLite = z.infer<typeof DesiredResearchFieldsLiteSchema>;
