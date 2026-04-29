export function getEnv(name, fallback = undefined) {
  // Vite exposes env vars on import.meta.env
  const value = import.meta.env?.[name];
  return value ?? fallback;
}

