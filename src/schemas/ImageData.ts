// ./src/schemas/ImageData.ts
//
// Zod schema and type definition for generic image data,
// compatible with next/image.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// -----------------------------------------------------------------------------
export const ImageDataSchema: ZodSchema = z.object({
  src   : z.string(),
  width : z.number(),
  height: z.number(),
  alt   : z.string(),
});
export type ImageData = z.infer<typeof ImageDataSchema>;
