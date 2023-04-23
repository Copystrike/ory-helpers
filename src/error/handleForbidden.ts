import Router from 'next/router';

/**
 * Handles 403 Forbidden error response and executes the appropriate action based on the error ID.
 *
 * @async
 * @function
 * @param {any} responseData - The response data to handle.
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleForbidden = async (responseData: any): Promise<void> => {
  switch (responseData.error?.id) {
    case 'session_aal2_required':
      await Router.push('/login?aal2=true');
      Router.reload();
      break;
    case 'session_refresh_required':
      if (responseData.redirect_browser_to) {
        console.warn(
          'sdkError 403: Redirect browser to',
          responseData.redirect_browser_to
        );
        Router.push(responseData.redirect_browser_to);
      }
      break;
  }
};
