import { AxiosError } from "axios";
import React from "react";
import { handleUnprocessableEntity } from "./handleUnprocessableEntity";
import { handleGone } from "./handleGone";
import { handleNotFound } from "./handleNotFound";
import { handleForbidden } from "./handleForbidden";
import { handleUnauthorized } from "./handleUnauthorized";
import { handleFatalError } from "./handleFatalError";
import { handleBadRequest } from "./handleBadRequest";


/**
 * Handles errors received from Axios HTTP requests and executes an appropriate action based on the error status.
 *
 * @function
 * @param {((flowId: string) => Promise<void | AxiosError>)|undefined} getFlow - A function that fetches flow data for a given ID.
 * @param {React.Dispatch<React.SetStateAction<any>>|undefined} setFlow - A state setter function to update flow data.
 * @param {string|undefined} defaultNav - A string value to use as the default URL for page navigation.
 * @param {boolean} fatalToError - A boolean value indicating whether to treat fatal errors as regular errors.
 * @returns {Function} - A function that handles the error response and returns a promise.
 */
export const HandleError = (
  getFlow:
    | ((flowId: string) => Promise<void | AxiosError>)
    | undefined = undefined,
  setFlow: React.Dispatch<React.SetStateAction<any>> | undefined = undefined,
  defaultNav: string | undefined = undefined,
  fatalToError = false
) => {
  return async (error: AxiosError): Promise<AxiosError | void> => {
    if (!error.response || error.response?.status === 0) {
      window.location.href = `/error?error=${encodeURIComponent(
        JSON.stringify(error.response)
      )}`;
      return Promise.resolve();
    }

    const responseData = error.response?.data || {};


    switch (error.response?.status) {
      case 400: {
        return handleBadRequest(responseData, setFlow);
      }
      case 401: {
        return handleUnauthorized();
      }
      case 403: {
        return handleForbidden(responseData);
      }
      case 404: {
        return handleNotFound(error);
      }
      case 410: {
        return handleGone(responseData, defaultNav, getFlow);
      }
      case 422: {
        return handleUnprocessableEntity(responseData, getFlow);
      }
      default: {
        if (fatalToError) {
          return handleFatalError(error);
        } else {
          throw error;
        }
      }
    }
  };
};
