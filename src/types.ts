import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import {
  FrontendApiCreateBrowserLoginFlowRequest,
  FrontendApiCreateBrowserRecoveryFlowRequest,
  FrontendApiCreateBrowserRegistrationFlowRequest,
  FrontendApiCreateBrowserVerificationFlowRequest,
  FrontendApiGetLoginFlowRequest,
  FrontendApiGetRecoveryFlowRequest,
  FrontendApiGetRegistrationFlowRequest,
  FrontendApiGetVerificationFlowRequest,
  FrontendApiUpdateLoginFlowRequest,
  FrontendApiUpdateRecoveryFlowRequest,
  FrontendApiUpdateRegistrationFlowRequest,
  FrontendApiUpdateVerificationFlowRequest
} from "@ory/client";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type RequestedParameters = FrontendApiGetLoginFlowRequest | FrontendApiGetRegistrationFlowRequest | FrontendApiGetVerificationFlowRequest | FrontendApiGetRecoveryFlowRequest;
export type RequestedBrowserParameters = FrontendApiCreateBrowserLoginFlowRequest | FrontendApiCreateBrowserRegistrationFlowRequest | FrontendApiCreateBrowserVerificationFlowRequest | FrontendApiCreateBrowserRecoveryFlowRequest;
export type UpdateFlowParameters = Partial<FrontendApiUpdateLoginFlowRequest & FrontendApiUpdateRegistrationFlowRequest & FrontendApiUpdateVerificationFlowRequest & FrontendApiUpdateRecoveryFlowRequest>;

export type FlowType = "login" | "registration" | "recovery" | "verification";
