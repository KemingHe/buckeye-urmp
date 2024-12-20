// ./src/schemas/ProficientLanguages.ts
//
// Muti-select option zod schema and type definition,
// from top 50 (excluding English) most used languages in the world.

// Zod essential imports.
import { z, ZodSchema } from "zod";

// Local constant import.
import { DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT } from "@constants/schemaConstants";

// -----------------------------------------------------------------------------
export const ProficientLanguagesArray: string[] = [
  "Chinese, Mandarin - 普通话",
  "Hindi - हिन्दी",
  "Spanish - Español",
  "French - Français",
  "Arabic, Standard - العربية الفصحى",
  "Bengali - বাংলা",
  "Russian - Русский",
  "Portuguese - Português",
  "Indonesian - Bahasa Indonesia",
  "Urdu - اُردُو",
  "German, Standard - Deutsch",
  "Japanese - 日本語",
  "Swahili - Kiswahili",
  "Marathi - मराठी",
  "Telugu - తెలుగు",
  "Punjabi, Western - پنجابی",
  "Chinese, Wu - 吴语",
  "Tamil - தமிழ்",
  "Turkish - Türkçe",
  "Korean - 한국어",
  "Vietnamese - Tiếng Việt",
  "Chinese, Yue - 粤语",
  "Javanese - ꦧꦱꦗꦮ",
  "Italian - Italiano",
  "Arabic, Egyptian Spoken - العربية المصرية",
  "Hausa - هَوُسَ",
  "Thai - ไทย",
  "Gujarati - ગુજરાતી",
  "Kannada - ಕನ್ನಡ",
  "Persian, Iranian - فارسی",
  "Bhojpuri - भोजपुरी",
  "Chinese, Min Nan - 闽南语",
  "Chinese, Hakka - 客家话",
  "Chinese, Jinyu - 晋语",
  "Filipino - Filipino",
  "Burmese - မြန်မာစာ",
  "Polish - Polski",
  "Yoruba - Yorùbá",
  "Odia - ଓଡ଼ିଆ",
  "Malayalam - മലയാളം",
  "Chinese, Xiang - 湘语",
  "Maithili - मैथिली",
  "Ukrainian - Українська",
  "Arabic, Moroccan Spoken - الدارجة المغربية",
  "Punjabi, Eastern - ਪੰਜਾਬੀ",
  "Sunda - Basa Sunda",
  "Arabic, Algerian Spoken - الدارجة الجزائرية",
  "Arabic, Sudanese Spoken - اللهجة السودانية",
  "Pidgin, Nigerian - Naijá",
  "Zulu - isiZulu",
];

// -----------------------------------------------------------------------------
export const ProficientLanguagesSchema: ZodSchema = z
  .array(
    z
    .string()
    .refine((rawLanguage) => ProficientLanguagesArray.includes(rawLanguage), {
      message: "Please select a valid language.",
    })
  )
  .max(DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT, {
    message: `Please select up to ${DEFAULT_MAX_PROFICIENT_LANGUAGES_COUNT} languages.`,
  });
export type ProficientLanguages = z.infer<typeof ProficientLanguagesSchema>;
