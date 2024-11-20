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
      // 404 Not Found for a resource that cannot be located
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "company-not-found",
          message: "Company not found.",
          details: "The requested company identifier does not exist in the system.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "Verify the company ID. If you believe this is an error, contact support.",
        },
      };
      break;
    case "Yearly data not found":
    case "Monthly data not found":
    case "Data does not exist":
      // 404 Not Found for specific data unavailability 
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "data-not-found",
          message: "Requested data not available.",
          details: "The specific monthly or yearly data could not be located.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "The data may not exist for the specified period. Verify your request parameters.",
        },
      };
      break;
    case "ID must be an 8-digit number":
      // 422 Unprocessable Content for client-side request formatting errors
      statusCode = 422;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "invalid-request",
          message: "Invalid request format.",
          details: "Company ID must be exactly 8 digits.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion: "Provide a valid 8-digit company identifier.",
        },
      };
      break;
    case "Cluster is not valid":
      // 404 Not Found for an unsupported cluster
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "invalid-cluster",
          message: "Cluster not supported.",
          details: "The specified cluster 'muu' is not a valid cluster.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "Select a valid cluster. Contact support for available clusters.",
        },
      };
      break;
    case "Monthly MEA not found":
    case "Monthly SDS not found":
    case "Yearly SDS not found":
    case "Yearly MEA not found":
      // 404 Not Found for specific statistical data unavailability
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "statistical-data-not-found",
          message: "Statistical data unavailable.",
          details: "Requested statistical metrics could not be located.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion:
            "Verify data availability for the specific time period and cluster.",
        },
      };
      break;
    case "Unable to choose normSuffix":
      // 404 Not Found for normalization suffix determination failure
      statusCode = 404;
      message = {
        request_id: correlationID,
        statusCode: statusCode,
        status: "error",
        error: {
          code: "normalization-data-not-found",
          message: "Data normalization failed.",
          details: "Unable to determine the correct normalization suffix based on the company's year.",
          timestamp: new Date().toISOString(),
          path: req.path,
          suggestion: "Verify the company's year data. If the issue persists, contact technical support.",
        },
      };
      break;
    default:
      // Differentiate between database/connection errors and other server errors
      if (err.message.includes("database") || err.message.includes("connection")) {
        // 503 Service Unavailable for temporary database connectivity issues
        statusCode = 503;
        message = {
          request_id: correlationID,
          statusCode: statusCode,
          status: "error",
          error: {
            code: "service-unavailable",
            message: "Database service temporarily unavailable.",
            details: "The server cannot process the request due to database connectivity issues.",
            timestamp: new Date().toISOString(),
            path: req.path,
            suggestion: "Retry the request after the specified delay. If persistent, contact support.",
            retryAfter: 300 // seconds, matches the standard Retry-After HTTP header convention
          },
        };
      } else {
        // 500 Internal Server Error for unhandled server-side errors
        statusCode = 500;
        message = {
          request_id: correlationID,
          statusCode: statusCode,
          status: "error",
          error: {
            code: "internal-server-error",
            message: "Unexpected server error.",
            details: err.message || "An unhandled error occurred during request processing.",
            timestamp: new Date().toISOString(),
            path: req.path,
            suggestion: "This is an unexpected server-side error. Please contact technical support.",
          },
        };
      }
      break;
  }

  const emptyResponse = buildNullResponse();
  res.setHeader("X-Error-Info", JSON.stringify(message));
  res.status(statusCode).json(emptyResponse);

  return;
}
