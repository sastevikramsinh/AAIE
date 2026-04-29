export function logInfo(message, context = {}) {
  console.log(
    JSON.stringify({
      level: "info",
      message,
      context,
      timestamp: new Date().toISOString(),
    }),
  );
}

export function logError(message, error, context = {}) {
  console.error(
    JSON.stringify({
      level: "error",
      message,
      context,
      error: {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      },
      timestamp: new Date().toISOString(),
    }),
  );
}

