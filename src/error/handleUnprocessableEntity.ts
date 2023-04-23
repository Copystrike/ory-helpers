import Router from "next/router";

/**
 * Handles unprocessable entity response.
 * @param {Object} responseData - The response data.
 * @param {Function} getFlow - A function to get flow data.
 * @returns {Promise<void>}
 */
export const handleUnprocessableEntity = async (
  responseData: any,
  getFlow?: (flowId: string) => Promise<any>
): Promise<void> => {
  const redirectBrowserTo = responseData.redirect_browser_to;
  if (!redirectBrowserTo) {
    return;
  }

  const currentUrl = new URL(window.location.href);
  const redirect = new URL(redirectBrowserTo);

  if (currentUrl.host !== redirect.host) {
    console.warn("sdkError 422: Host changed redirect");
    window.location.href = redirectBrowserTo;
    return;
  }

  if (currentUrl.pathname !== redirect.pathname) {
    console.warn("sdkError 422: Update path");
    await Router.push(redirect.pathname + redirect.search);
    return;
  }

  const flowId = redirect.searchParams.get("flow");
  if (!flowId || !getFlow) {
    console.warn("sdkError 422: Redirect browser to");
    window.location.href = redirectBrowserTo;
    return;
  }

  console.warn("sdkError 422: Update flow");
  try {
    await getFlow(flowId);
  } catch (error) {
    console.error("Error getting flow:", error);
  }
};