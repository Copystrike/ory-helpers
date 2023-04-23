import { FlowType } from "../types";


/**
 * Returns the correct update body flow property name based on the flow type.
 * @param flowType - The flow type.
 */
export const updateBodyFlowPropertyName = (flowType: FlowType) => {
  switch (flowType) {
    case "login":
      return "updateLoginFlowBody";
    case "registration":
      return "updateRegistrationFlowBody";
    case "verification":
      return "updateVerificationFlowBody";
    case "recovery":
      return "updateRecoveryFlowBody";
  }
};