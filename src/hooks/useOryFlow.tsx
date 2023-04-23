import { useCallback, useEffect, useState } from 'react';
import {
  LoginFlow,
  RecoveryFlow,
  RegistrationFlow,
  VerificationFlow,
} from '@ory/client';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { HandleError } from '../error/HandleError';

import { FlowType, UpdateFlowParameters } from '../types';
import { selectFlow } from '../helpers/selectFlow';
import { SetUriFlow } from '../helpers/setUriFlow';
import { selectBrowserFlow } from '../helpers/selectBrowserFlow';
import { updateBodyFlowPropertyName } from '../helpers/updateBodyFlowPropertyName';
import { updateFlow } from '../helpers/updateFlow';
import { useSession } from '../components/OrySessionProvider';
import { FrontendApi, Session } from '@ory/client';

type AuthFlow = LoginFlow | RegistrationFlow | VerificationFlow | RecoveryFlow;

type OryFlowHook = {
  (
    flowType: FlowType,
    redirects: {
      loginSuccess: string;
    },
    options?: {
      flowId?: string;
      refresh?: boolean;
      aal?: string;
      returnTo?: string;
    },
    callbacks?: {
      loginSuccess: (values: UpdateFlowParameters) => Promise<void>;
    }
  ): {
    flow: AuthFlow | null;
    submitFlow: (
      values: UpdateFlowParameters
    ) => Promise<void | AxiosError<any>>;
  };
};

export const useOryFlow: OryFlowHook = (flowType, redirects, options) => {
  const [flow, setFlow] = useState<AuthFlow | null>(null);
  const { oryClient } = useSession();
  const router = useRouter();

  const flowId = String(options?.flowId || '');
  const refresh = Boolean(options?.refresh);
  const aal = String(options?.aal || '');
  const returnTo = String(options?.returnTo || '');

  if (!oryClient) {
    throw new Error(
      'OryClient is not initialized, this probably means that you forgot to wrap your app with OrySessionProvider.'
    );
  }

  /**
   * When an ID is provided, we fetch the flow.
   * This flow contains information about the login scheme and how the UI should look like.
   * @param id The ID of the flow
   */
  const getFlow = useCallback(
    async (id: string) => {
      return selectFlow(oryClient, flowType, {
        requestedParameters: { id },
      })
        .then(({ data }) => {
          setFlow(data);
          SetUriFlow(router, data.id);
        })
        .catch(handleError);
    },
    [flowType]
  );

  /**
   * This function handles errors.
   */
  const handleError = useCallback(
    (error: AxiosError) => {
      const handle = HandleError(getFlow, setFlow, '/login', true);
      return handle(error);
    },
    [getFlow]
  );

  /**
   * This function creates a new login flow.
   * @param refresh Refresh the session - check for password update
   * @param aal The AAL - check for two-factor authentication
   * @param returnTo The returnTo URL - where to redirect the user after login
   */
  const createFlow = useCallback(
    async (refresh: boolean, aal: string, returnTo: string) => {
      return selectBrowserFlow(oryClient, flowType, {
        requestedParameters: { refresh, aal, returnTo },
      })
        .then(({ data }) => {
          setFlow(data);
          SetUriFlow(router, data.id);
        })
        .catch(handleError);
    },
    [flowType, handleError]
  );

  /**
   * This effect is called when the router is ready.
   */
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (flowId) {
      getFlow(flowId).catch((err) => {
        createFlow(refresh, aal, returnTo);
      });
      return;
    }

    // Otherwise we initialize it
    createFlow(refresh, aal, returnTo);
  }, [router.isReady]);

  const submitFlow = (values: UpdateFlowParameters) => {
    return updateFlow(oryClient, flowType, {
      requestedParameters: {
        flow: String(flow?.id),
        [updateBodyFlowPropertyName(flowType)]: values,
      },
    })
      .then(({ data }) => {
        if (flowType === 'login' || flowType === 'registration') {
          if (flow?.return_to) {
            router.push(flow?.return_to);
            return;
          }
          router.push(redirects.loginSuccess);
          return;
        }
        // @ts-ignore
        setFlow(data);
      })
      .catch(handleError);
  };
  return { flow, submitFlow };
};
