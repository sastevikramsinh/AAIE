export const THEME_STORAGE_KEY = "aaie-theme";

export function getStoredThemePreference() {
  if (typeof window === "undefined") return "system";
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || "system";
  } catch {
    return "system";
  }
}

export function getSystemThemePreference() {
  if (typeof window === "undefined") return "light";
  try {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function resolveTheme(preference) {
  if (preference === "system") return getSystemThemePreference();
  return preference === "dark" ? "dark" : "light";
}

export function applyTheme(preference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
}

export function setStoredThemePreference(preference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // ignore
  }
}

