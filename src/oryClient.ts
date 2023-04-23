import fetchAdapter from '@haverstack/axios-fetch-adapter';
import { Configuration, FrontendApi } from '@ory/client';
import axiosFactory, { AxiosError, AxiosResponse } from 'axios';
import { edgeConfig } from '@ory/integrations/next';
import * as process from 'process';

const axios = axiosFactory.create({
  withCredentials: true,
});

axios.interceptors.response.use(
  (v: AxiosResponse) => Promise.resolve(v),
  (error: AxiosError) => {
    if (!error.config || !error.response) {
      console.debug(
        `Axios Intercepted Error ${JSON.stringify(error.response)}`
      );

      // it's a network error
      return Promise.reject({
        response: {
          status: 0,
          message:
            'Network error - this could be related to CORS or an incorrect URL set on the `NEXT_PUBLIC_ORY_SDK_URL` environment variable. ' +
            'Please check out the Ory documentation for more information: https://www.ory.sh/docs/getting-started/local-development',
        },
      });
    }

    return Promise.reject(error);
  }
);

export const oryMiddlewareClient = (orySDKUrl: string) => {
  return new FrontendApi(
    new Configuration({
      basePath: orySDKUrl,
      baseOptions: {
        adapter: fetchAdapter,
        withCredentials: true,
      },
    })
  );
};

export const oryClient = () => {
  return new FrontendApi(
    new Configuration({
      ...edgeConfig,
    }),
    '',
    axios
  );
};
