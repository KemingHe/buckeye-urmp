// ./src/schemas/ProfileAndResearchDescription.ts
//
// Zod schema and type definition for the profile and research description form textarea field.

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local constant imports.
import { DEFAULT_MAX_PROFILE_AND_RESEARCH_DESCRIPTION_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export const ProfileAndResearchDescriptionSchema: ZodSchema = z
  .string()
  .min(1, {
    message: "Please enter a valid description about yourself and your current research.",
  })
  .max(DEFAULT_MAX_PROFILE_AND_RESEARCH_DESCRIPTION_LENGTH, {
    message: `Please limit your profile and research description to ${DEFAULT_MAX_PROFILE_AND_RESEARCH_DESCRIPTION_LENGTH} characters.`,
  });
export type ProfileAndResearchDescription = z.infer<typeof ProfileAndResearchDescriptionSchema>;
