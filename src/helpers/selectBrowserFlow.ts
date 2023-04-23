import { FlowType, RequestedBrowserParameters } from '../types';
import { FrontendApi } from '@ory/client';
import { AxiosRequestConfig } from 'axios';

/**
 * Selects the correct browser flow based on the flow type.
 * @param flowType - The flow type.
 * @param requestedParameters - The requested parameters.
 * @param options - The Axios request options.
 */
export const selectBrowserFlow = async (
  oryClient: FrontendApi,
  flowType: FlowType,
  {
    requestedParameters,
    options,
  }: {
    requestedParameters: RequestedBrowserParameters;
    options?: AxiosRequestConfig;
  }
) => {
  switch (flowType) {
    case 'login':
      return oryClient.createBrowserLoginFlow(requestedParameters, options);
    case 'registration':
      return oryClient.createBrowserRegistrationFlow(
        requestedParameters,
        options
      );
    case 'verification':
      return oryClient.createBrowserVerificationFlow(
        requestedParameters,
        options
      );
    case 'recovery':
      return oryClient.createBrowserRecoveryFlow(requestedParameters, options);
    default:
      throw new Error('Invalid flow type');
  }
};
