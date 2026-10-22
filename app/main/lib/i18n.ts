import { app } from "electron";
import {
  changeAppLanguage,
  initI18n,
  t as translate,
  type LanguagePreference,
} from "../../shared/i18n";

export function initMainI18n(preference: LanguagePreference = "system"): void {
  initI18n(preference ?? "system", app.getLocale());
}

export function syncMainLanguage(preference: LanguagePreference): void {
  changeAppLanguage(preference ?? "system", app.getLocale());
}

export function t(key: string, options?: Record<string, unknown>): string {
  return translate(key, options);
}
