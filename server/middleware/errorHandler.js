// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode >= 500
      ? "Something went wrong. Please try again later."
      : err.message || "Request failed.";

  // Avoid leaking stack traces to clients in production.
  const response = {
    message,
    ...(err.details ? { details: err.details } : {}),
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  };

  res.status(statusCode).json(response);
}

