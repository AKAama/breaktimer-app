import i18n, { type i18n as I18nInstance, type TFunction } from "i18next";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

export type LanguagePreference = "system" | "en" | "zh-CN";
export type ResolvedLanguage = "en" | "zh-CN";

export const LANGUAGE_PREFERENCES: LanguagePreference[] = [
  "system",
  "en",
  "zh-CN",
];

const resources = {
  en: { translation: en },
  "zh-CN": { translation: zhCN },
};

let initialized = false;

export function isChineseLocale(locale: string | undefined | null): boolean {
  if (!locale) return false;
  const normalized = locale.toLowerCase().replace("_", "-");
  return normalized === "zh" || normalized.startsWith("zh-");
}

export function resolveLanguage(
  preference: LanguagePreference | undefined | null,
  systemLocale: string,
): ResolvedLanguage {
  if (preference === "en") return "en";
  if (preference === "zh-CN") return "zh-CN";
  return isChineseLocale(systemLocale) ? "zh-CN" : "en";
}

/** Browser/renderer system locale. Main process should pass app.getLocale(). */
export function getRendererSystemLocale(): string {
  const nav =
    typeof globalThis !== "undefined"
      ? (globalThis as { navigator?: { language?: string } }).navigator
      : undefined;
  if (nav?.language) {
    return nav.language;
  }
  return "en";
}

export function initI18n(
  preference: LanguagePreference = "system",
  systemLocale = "en",
): I18nInstance {
  const lng = resolveLanguage(preference, systemLocale);

  if (!initialized) {
    // Use sync init so main-process tray/notifications can call t() immediately.
    void i18n.init({
      resources,
      lng,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
    initialized = true;
  } else if (i18n.language !== lng) {
    void i18n.changeLanguage(lng);
  }

  return i18n;
}

export function changeAppLanguage(
  preference: LanguagePreference,
  systemLocale = "en",
): ResolvedLanguage {
  const lng = resolveLanguage(preference, systemLocale);
  if (!initialized) {
    initI18n(preference, systemLocale);
  } else {
    void i18n.changeLanguage(lng);
  }
  return lng;
}

export function t(key: string, options?: Record<string, unknown>): string {
  if (!initialized) {
    initI18n();
  }
  return (i18n.t as TFunction)(key, options);
}

export function getI18n(): I18nInstance {
  if (!initialized) {
    initI18n();
  }
  return i18n;
}

export { default as i18n } from "i18next";
