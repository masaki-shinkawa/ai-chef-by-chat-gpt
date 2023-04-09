type SuccessControllerResult = {
  body:
    | string
    | number
    | bigint
    | boolean
    | symbol
    // deno-lint-ignore ban-types
    | object
    | undefined
    | null;
  statusCode: number;
};

type FailedControllerResult = {
  error: { error: string };
  statusCode: number;
};

export type ControllerResult = SuccessControllerResult | FailedControllerResult;

export const isSuccessControllerResult = (
  controllerResult: Partial<SuccessControllerResult & FailedControllerResult>
): controllerResult is SuccessControllerResult => {
  return !!(controllerResult.body && controllerResult.statusCode);
};

export const isFailedControllerResult = (
  controllerResult: Partial<SuccessControllerResult & FailedControllerResult>
): controllerResult is FailedControllerResult => {
  return !!(controllerResult.error && controllerResult.statusCode);
};
