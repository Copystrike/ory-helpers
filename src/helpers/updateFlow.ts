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
      // @ts-expect-error something wrong with the types, but it works
      return oryClient.updateLoginFlow(requestedParameters, options);
    case 'registration':
      // @ts-expect-error something wrong with the types, but it works
      return oryClient.updateRegistrationFlow(requestedParameters, options);
    case 'verification':
      // @ts-expect-error something wrong with the types, but it works
      return oryClient.updateVerificationFlow(requestedParameters, options);
    case 'recovery':
      // @ts-expect-error something wrong with the types, but it works
      return oryClient.updateRecoveryFlow(requestedParameters, options);
    default:
      throw new Error('Invalid flow type');
  }
};
