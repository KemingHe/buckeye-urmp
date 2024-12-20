// ./src/constants/topLanguagesTupleLite.ts
//
// Top 15 language options string literals, for creating zod enums,
// subset of the top 200 most used world languages.

const TopLanguagesTupleLite = [
  "English - English",
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
] as const;

export default TopLanguagesTupleLite;
