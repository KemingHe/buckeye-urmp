// ./src/utils/isFieldError.ts
//
// Type guard utility function to check if a field error is present in the form state.

// react-hook-form essential imports.
import type { FieldError } from "react-hook-form";

// -----------------------------------------------------------------------------
export default function isFieldError(error: any): error is FieldError {
  return error && typeof error.message === "string";
}
