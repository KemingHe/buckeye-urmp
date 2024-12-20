# V0 All Possible User Fields

The following snippet displays all possible fields and field schemas for a generic user.

```Typescript

import UserType from "@models/users/UserType";
import {
  OSUEmail,
  UndergradMajor,
  UndergradPreProfRoute,
  UndergradYear,
} from "@models/osu";
import {
  DEFAULT_MAX_FIRST_NAME_LENGTH,
  DEFAULT_MAX_LAST_NAME_LENGTH,
  DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT,
  DEFAULT_MAX_RESEARCH_DESCRIPTION_LENGTH,
  DEFAULT_MAX_RESEARCH_FIELD_LENGTH,
  DEFAULT_MAX_RESEARCH_FIELDS_COUNT
} from "@models/defaultSchemaConstants";

const User = z.object({
  
  // System info.
  id                           : z.string().min(1),
  creationTimestamp            : z.string().datetime({ offset: true }),
  applicationTimestamp         : z.string().datetime({ offset: true }),
  approvalTimestamp            : z.string().datetime({ offset: true }),

  // Generic info.
  userType                     : z.literal(UserType.enum.Admin),
  adminApproved                : z.boolean(),
  emailAddress                 : OSUEmail,
  profilePictureLink           : z.string().url(),
  firstName                    : z.string().min(1).max(DEFAULT_MAX_FIRST_NAME_LENGTH),
  lastName                     : z.string().min(1).max(DEFAULT_MAX_LAST_NAME_LENGTH),

  // Academic info.
  proficientLanguages          : z.array(Top200WorldLanguage).min(1).max(DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT),
  academicYear                 : UndergradYear,
  currentMajor                 : UndergradMajor,
  preProfessionalRoute         : z.nullable(UndergradPreProfRoute),

  // Research info.
  currentResearchFields        : z.array(z.string().min(1).max(DEFAULT_MAX_RESEARCH_FIELD_LENGTH)).min(1).max(DEFAULT_MAX_RESEARCH_FIELDS_COUNT),
  profileAndResearchDescription: z.string().min(1).max(DEFAULT_MAX_RESEARCH_DESCRIPTION_LENGTH),
  desiredResearchFields        : z.array(z.string().min(1).max(DEFAULT_MAX_RESEARCH_FIELD_LENGTH)).min(1).max(DEFAULT_MAX_RESEARCH_FIELDS_COUNT),
  calendarSchedulingLink       : z.nullable(z.string().url()),
});

```
