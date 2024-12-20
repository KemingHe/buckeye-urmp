// ./src/constants/schemaConstants.ts
//
// Contants used for Zod schema definitions.

// Generic info constants.
export const DEFAULT_MAX_FIRST_OR_LAST_NAME_LENGTH = 100;
export const DEFAULT_MAX_EMAIL_ADDRESS_LENGTH = 100;

// Academic info constants.
export const DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT = 3;
export const DEFAULT_MAX_UNDERGRAD_MAJORS_COUNT = 3;

// Research info constants.
export const DEFAULT_MAX_RESEARCH_FIELD_LENGTH = 100;
export const DEFAULT_MAX_RESEARCH_FIELDS_COUNT = 10;
export const DEFAULT_MAX_PROFILE_AND_RESEARCH_DESCRIPTION_LENGTH = 1000;

// Utility constants.
export const DEFAULT_MAX_BUG_REPORT_MESSAGE_LENGTH = 1000;

// Constants for lite versions of schemas.
export const DEFAULT_MAX_LITE_UNDERGRAD_MAJOR_LENGTH = 100;
export const DEFAULT_MIN_LITE_DESIRED_RESEARCH_FIELDS_LENGTH = 20;
export const DEFAULT_MAX_LITE_DESIRED_RESEARCH_FIELDS_LENGTH = 1000;
export const DEFAULT_MAX_LITE_CURRENT_RESEARCH_FIELDS_LENGTH = 1000;
