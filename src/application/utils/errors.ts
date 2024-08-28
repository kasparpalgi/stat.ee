import { Response, Request } from "express";
import { buildNullResponse } from "../../application/build_response";

export function handleErrors(
  req: Request,
  res: Response,
  err: Error,
  correlationID: string
): void {
  let message: Record<string, any>;
  let statusCode: number;
  switch (err.message) {
    case "ID not found":
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "company-not-found",
          message: "ID not found.",
          details: "The requested company could not be located in the system.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "The company ID may be incorrect. Please verify the ID and try again.",
        },
      };
      break;
    case "Yearly data not found":
    case "Monthly data not found":
    case "Data does not exist":
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "data-not-found",
          message: "Monthly/Yearly data not found.",
          details: "The requested monthly or yearly data could not be located.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "The data may not exist for the specified month or year. There may be a temporary issue with data access. Please try again later.",
        },
      };
      break;
    case "ID must be an 8-digit number":
      statusCode = 400;
      message = {
        request_id: correlationID,
        statusCode: 400,
        status: "error",
        error: {
          code: "invalid-id-format",
          message: "Invalid ID format.",
          details: "The provided ID must be an 8-digit number.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion: "Please enter an ID consisting of exactly 8 digits.",
        },
      };
      break;
    case "Cluster is not valid":
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "invalid-cluster",
          message: "Invalid cluster provided.",
          details:
            "The specified cluster is not valid. The cluster 'muu' is not supported.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "Double-check if the provided cluster is not 'muu'. If the issue persists, contact the system administrator.",
        },
      };
      break;
    case "Monthly MEA not found":
    case "Monthly SDS not found":
    case "Yearly SDS not found":
    case "Yearly MEA not found":
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "not-found",
          details:
            "The requested monthly Mean Equivalent Assets (MEA) data could not be located.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "The data may not exist for the specified month or year. There may be a temporary issue with data access. Please try again later. If possible, consult the relevant documentation for details.",
        },
      };
      break;
    case "Unable to choose normSuffix":
    default:
      statusCode = 500;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "internal-error", // Use a generic code for unspecified errors
          message: err.message, // Capture the original error message
          details: "An unexpected error occurred.",
          timestamp: new Date().toISOString(),
          path: req.path,
        },
      };
      break;
  }

  const emptyResponse = buildNullResponse();
  res.setHeader("X-Error-Info", JSON.stringify(message));
  res.status(statusCode).json(emptyResponse);

  return;
}
