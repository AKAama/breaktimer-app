import {
  changeAppLanguage,
  getRendererSystemLocale,
} from "../../shared/i18n";
import { LanguagePreference } from "../../types/settings";

export function applyLanguagePreference(
  preference: LanguagePreference | undefined | null,
): void {
  changeAppLanguage(preference ?? "system", getRendererSystemLocale());
}
