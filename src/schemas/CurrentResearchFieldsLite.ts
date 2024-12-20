// ./src/schemas/CurrentResearchFieldsLite.ts
//
// Simplified, freeform version of the CurrentResearchFields schema.
// Non-empty and limits max charactors.

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local constant imports.
import { DEFAULT_MAX_LITE_CURRENT_RESEARCH_FIELDS_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export const CurrentResearchFieldsLiteSchema: ZodSchema = z
  .string()
  .min(1, {
    message: "Please enter a valid research field.",
  })
  .max(DEFAULT_MAX_LITE_CURRENT_RESEARCH_FIELDS_LENGTH, {
    message: `Please limit your research fields to ${DEFAULT_MAX_LITE_CURRENT_RESEARCH_FIELDS_LENGTH} characters.`,
  });
export type CurrentResearchFieldsLite = z.infer<typeof CurrentResearchFieldsLiteSchema>;
