import { AxiosError } from "axios";
import Router from "next/router";

/**
 * Handles fatal errors received from Axios HTTP requests and redirects to the error page with a custom query.
 *
 * @async
 * @function
 * @param {AxiosError} error - The Axios error to handle.
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleFatalError = async (error: AxiosError<any>): Promise<void> => {
  console.warn("sdkError: fatal error redirect to /error");
  const { response } = error;
  const errorId = response?.data?.error?.id;
  const errorQuery = { error: JSON.stringify(error, null, 2), id: errorId };
  const flowType = Router.pathname;
  const errorPath = {
    pathname: "/error",
    query: {
      ...errorQuery,
      flowType
    }
  };
  await Router.push(errorPath);
};
