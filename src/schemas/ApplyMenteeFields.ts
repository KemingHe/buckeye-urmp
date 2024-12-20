// ./src/schemas/ApplyMenteeFields.ts
//
// Zod schema and type definition for the apply mentee form fields.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// Local schema imports.
import { DesiredResearchFieldsLiteSchema } from "@schemas/DesiredResearchFieldsLite";
import { NameSchema } from "@schemas/Name";
import { UndergradMajorsSchema } from "@schemas/UndergradMajors";
import { UndergradPreProfRouteSchema } from "@schemas/UndergradPreProfRoute";
import { UndergradYearSchema } from "@schemas/UndergradYear";

// -----------------------------------------------------------------------------
export const ApplyMenteeFieldsSchema: ZodSchema = z.object({

  // Generic info.
  firstName             : NameSchema,
  lastName              : NameSchema,

  // Academic info.
  academicYear          : UndergradYearSchema,
  currentMajors         : UndergradMajorsSchema,
  preProfessionalRoute  : UndergradPreProfRouteSchema,

  // Research info.
  desiredResearchFields : DesiredResearchFieldsLiteSchema,
});
export type ApplyMenteeFields = z.infer<typeof ApplyMenteeFieldsSchema>;
