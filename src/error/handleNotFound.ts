import { AxiosError } from "axios";
import Router from "next/router";

/**
 * Handles 404 Not Found error response and navigates to the error page with the error details.
 *
 * @async
 * @function
 * @param {AxiosError} error - The error to handle.
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleNotFound = async (error: AxiosError): Promise<void> => {
  console.warn("sdkError 404: Navigate to Error");
  const errorMsg = {
    data: error.response?.data || error,
    status: error.response?.status,
    statusText: error.response?.statusText,
    url: window.location.href
  };
  await Router.push({
    pathname: "/error",
    query: {
      error: encodeURIComponent(JSON.stringify(errorMsg))
    }
  });
};