import { FlowType, UpdateFlowParameters } from '../types';
import { FrontendApi } from '@ory/client';
import { AxiosRequestConfig } from 'axios';

/**
 * Updates the correct flow based on the flow type.
 * @param flowType - The flow type.
 * @param requestedParameters - The requested parameters.
 * @param options - The Axios request options.
 */
export const updateFlow = async (
  oryClient: FrontendApi,
  flowType: FlowType,
  {
    requestedParameters,
    options,
  }: {
    requestedParameters: Partial<UpdateFlowParameters>;
    options?: AxiosRequestConfig;
  }
) => {
  switch (flowType) {
    case 'login':
      console.log('login update flow');
      // @ts-ignore
      return oryClient.updateLoginFlow(requestedParameters, options);
    case 'registration':
      console.log('registration update flow');
      // @ts-ignore
      return oryClient.updateRegistrationFlow(requestedParameters, options);
    case 'verification':
      console.log('verification update flow');
      // @ts-ignore
      return oryClient.updateVerificationFlow(requestedParameters, options);
    case 'recovery':
      console.log('recovery update flow');
      // @ts-ignore
      return oryClient.updateRecoveryFlow(requestedParameters, options);
    default:
      console.log('default update flow');
      throw new Error('Invalid flow type');
  }
};
