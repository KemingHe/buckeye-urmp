// ./src/schemas/UserType.ts
//
// User onboarding-stage-separated tuple, zod schema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// -----------------------------------------------------------------------------
export const UserTypeTuple = [
  "superAdmin",
  "admin",
  "newSignUp",
  "mentee",
  "mentor",
] as const;
export const UserTypeSchema: ZodSchema = z.enum(UserTypeTuple);
export type  UserType = z.infer<typeof UserTypeSchema>;
