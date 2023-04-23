import Router from "next/router";

/**
 * Handles 401 Unauthorized error response and navigates to the login page.
 *
 * @async
 * @function
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleUnauthorized = async (): Promise<void> => {
  console.warn("handleError hook 401: Navigate to /login");
  await Router.push("/login");
};