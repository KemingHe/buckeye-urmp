// ./src/utils/formatISOString.ts
//
// Utility function to format an ISO string to a human-readable format.

// Data-fns formatter import.
import { format } from "date-fns";

// -----------------------------------------------------------------------------
export default function formatISOString(isoString: string): string {
  return format(new Date(isoString), "PPP");
}
