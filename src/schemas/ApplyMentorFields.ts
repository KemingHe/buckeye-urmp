// ./src/schemas/ApplyMentorFields.ts
//
// Zod schema and type definition for the apply mentor form fields.

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local schema imports.
import { CurrentResearchFieldsLiteSchema } from "@schemas/CurrentResearchFieldsLite";
import { NameSchema } from "@schemas/Name";
import { UndergradMajorsSchema } from "@schemas/UndergradMajors";
import { ProficientLanguagesSchema } from "@schemas/ProficientLanguages";
import { ProfileAndResearchDescriptionSchema } from "@schemas/ProfileAndResearchDescription";
import { UndergradPreProfRouteSchema } from "@schemas/UndergradPreProfRoute";
import { UndergradYearSchema } from "@schemas/UndergradYear";

// -----------------------------------------------------------------------------
export const ApplyMentorFieldsSchema: ZodSchema = z.object({

  // Generic info.
  firstName             : NameSchema,
  lastName              : NameSchema,

  // Academic info.
  proficientLanguages   : ProficientLanguagesSchema,
  academicYear          : UndergradYearSchema,
  currentMajors         : UndergradMajorsSchema,
  preProfessionalRoute  : UndergradPreProfRouteSchema,

  // Research info.
  currentResearchFields : CurrentResearchFieldsLiteSchema,
  profileAndResearchDescription : ProfileAndResearchDescriptionSchema,
});
export type ApplyMentorFields = z.infer<typeof ApplyMentorFieldsSchema>;
