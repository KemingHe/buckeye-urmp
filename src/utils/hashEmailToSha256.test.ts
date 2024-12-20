// ./src/utils/hashEmailToSha256.test.ts
//
// Unittest suite for the hashEmailToSha256 utility function.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing target import.
import hashEmailToSha256 from "@utils/hashEmailToSha256";

// -----------------------------------------------------------------------------
describe("hashEmailToSha256 utility function", () => {
  it("noremalizes and coverts an email to its Sha256 hash", () => {
    const testEmail: string = "buckeye.1@osu.edu";
    const testEmailWithUpper: string = "BUCKeye.1@osu.edu";
    const testEmailWithWhitespace: string = "  buckeye.1@osu.edu ";
    const correctHash: string = "1b6b6723b16820d3ece21fdf24801e68716fae30fa97d7183356fff78c9ef8e4";

    expect(hashEmailToSha256(testEmail)).toBe(correctHash);
    expect(hashEmailToSha256(testEmailWithUpper)).toBe(correctHash);
    expect(hashEmailToSha256(testEmailWithWhitespace)).toBe(correctHash);
  });

  it("returns an empty string if the email is empty", () => {
    expect (hashEmailToSha256("")).toBe("");
  });

  it("returns different hashes for different emails", () => {
    const testEmail1: string = "buckeye.1@osu.edu";
    const hashedEmail1: string = hashEmailToSha256(testEmail1);

    const testEmail2: string = "brutus.2@osu.edu";
    const hashedEmail2: string = hashEmailToSha256(testEmail2);

    expect(hashedEmail1).not.toBe(hashedEmail2);
  });
});
