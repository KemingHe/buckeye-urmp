// ./src/schemas/Name.ts
//
// Zod schema and type for first or last name. 

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local utility imports.
import { DEFAULT_MAX_FIRST_OR_LAST_NAME_LENGTH } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export const NameSchema: ZodSchema = z
  .string()
  .min(1, {
    message: "Please enter a valid name.",
  })
  .max(DEFAULT_MAX_FIRST_OR_LAST_NAME_LENGTH, {
    message: `Please limit your name to ${DEFAULT_MAX_FIRST_OR_LAST_NAME_LENGTH} characters.`,
  });
export type Name = z.infer<typeof NameSchema>;
