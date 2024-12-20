// ./src/schemas/UndergradPreProfRoute.ts
//
// OSU Undergraduate Pre-Professional Route zod schema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// -----------------------------------------------------------------------------
export const UndergradPreProfRouteArray: string[] = [
  "Not Applicable",
  
  "Pre-Dentistry",
  "Pre-Law",
  "Pre-Medicine",
  "Pre-Optometry",
  "Pre-Pharmacy",
  "Pre-Veterinary Medicine",
];
export const UndergradPreProfRouteSchema: ZodSchema = z
  .string()
  .refine(
    (rawRoute) => UndergradPreProfRouteArray.includes(rawRoute), {
      message: `Please select a valid option or "Not Applicable".`,
    });
export type UndergradPreProfRoute = z.infer<typeof UndergradPreProfRouteSchema>;
