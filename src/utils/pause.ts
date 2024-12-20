// ./src/utils/pause.ts
//
// Utility async function to pause for provided seconds.

// -----------------------------------------------------------------------------
export default async function pause(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
