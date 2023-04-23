import Router from "next/router";

/**
 * Handles 410 Gone error response and executes the appropriate action based on the response data.
 *
 * @async
 * @function
 * @param {any} responseData - The response data to handle.
 * @param {string|undefined} defaultNav - The default URL to navigate to.
 * @param {((flowId: string) => Promise<any>)|undefined} getFlow - A function that fetches flow data for a given ID.
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleGone = async (
  responseData: any,
  defaultNav?: string,
  getFlow?: (flowId: string) => Promise<any>
): Promise<void> => {
  if (defaultNav) {
    console.warn("sdkError 410: Navigate to", defaultNav);
    await Router.push(defaultNav);
    return;
  }

  if (getFlow && responseData.use_flow_id) {
    console.warn("sdkError 410: Update flow");
    try {
      await getFlow(responseData.use_flow_id);
    } catch (error) {
      console.error(error);

      if (defaultNav) {
        await Router.push(defaultNav);
      } else {
        throw error;
      }
    }
  }
};