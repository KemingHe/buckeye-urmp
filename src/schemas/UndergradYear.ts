// ./src/schemas/UndergradYear.ts
//
// OSU Undergraduate Year zod schema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// -----------------------------------------------------------------------------
export const UndergradYearArray: string[] = [
  "High School",
  "Freshman (1st Year)",
  "Sophomore (2nd Year)",
  "Junior (3rd Year)",
  "Senior (4th Year)",
  "SuperSenior (5+ Years)",
];
export const UndergradYearSchema: ZodSchema = z
  .string()
  .refine((rawYear) => UndergradYearArray.includes(rawYear), {
    message: "Please select a valid academic year.",
  });
export type UndergradYear = z.infer<typeof UndergradYearSchema>;
