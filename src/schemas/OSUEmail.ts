// ./src/schemas/OSUEmail.ts
//
// OSU email (refined Zod) custom schema definition and type exports.

// Zod essentail imports.
import { z, type ZodSchema } from "zod";
import { OSU_DOT_EDU_EMAIL_PATTERN } from "@keminghe/osu";

// Local utility imports.
import { DEFAULT_MAX_EMAIL_ADDRESS_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
const standardErrorMessage: string = "Please use your valid @osu.edu email address.";
export const OSUEmailSchema: ZodSchema = z
  .string()
  .regex(OSU_DOT_EDU_EMAIL_PATTERN, {
    message: standardErrorMessage,
  })
  .max(DEFAULT_MAX_EMAIL_ADDRESS_LENGTH, {
    message: standardErrorMessage,
  });
export type OSUEmail = z.infer<typeof OSUEmailSchema>;
