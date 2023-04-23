import React from 'react';
import Router from 'next/router';

/**
 * Handles bad request error response and updates flow data if provided.
 *
 * @async
 * @function
 * @param {any} responseData - The response data to handle.
 * @param {React.Dispatch<React.SetStateAction<any>>} [setFlow] - The state setter function to update flow data.
 * @returns {Promise<void>} - A promise that resolves with no value.
 */
export const handleBadRequest = async (
  responseData: any,
  setFlow?: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  if (responseData.error?.id == 'session_already_available') {
    await Router.push('/');
  } else if (setFlow) {
    console.warn('sdkError 400: update flow data');
    setFlow(responseData);
  }
};
