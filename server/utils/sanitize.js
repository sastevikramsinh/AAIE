function sanitizeString(input) {
  if (typeof input !== "string") return input;
  return input.replace(/<[^>]*>/g, "").trim();
}

export function sanitizeBody(req, _res, next) {
  if (!req.body || typeof req.body !== "object") return next();

  const traverse = (obj) => {
    if (Array.isArray(obj)) return obj.map((item) => traverse(item));
    if (obj && typeof obj === "object") {
      const out = {};
      for (const [key, value] of Object.entries(obj)) {
        out[key] = traverse(value);
      }
      return out;
    }
    return sanitizeString(obj);
  };

  req.body = traverse(req.body);
  next();
}

