import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";

export function validateRequest(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  return next(
    new ApiError(422, "Validation failed. Please check your input.", result.array()),
  );
}

