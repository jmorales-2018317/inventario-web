import { CoreResponseError } from "@/services/client/types";

export const API_ERROR_MESSAGES = {
  UNKNOWN: "An unexpected error occurred, please try again later.",
} as const;

export const getApiErrorMessage = (
  error: CoreResponseError["error"],
): string => {
  return error?.message || error?.reason || API_ERROR_MESSAGES.UNKNOWN;
};

// we use never as we know this function doesn't return anything
// only throw an exception.
export const handleApiError = (error: unknown, context?: string): never => {
  const logContext = context ? `[${context}]` : "";
  if (error instanceof Error) {
    console.error(`${logContext} Error:`, error.message);
    throw error;
  }

  if (typeof error === "object" && error !== null && "error" in error) {
    const apiError = error as CoreResponseError;
    const message = getApiErrorMessage(apiError.error);
    throw new Error(message);
  }

  throw new Error(API_ERROR_MESSAGES.UNKNOWN);
};  