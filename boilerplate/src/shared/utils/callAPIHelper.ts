import { HTTPError } from 'ky';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetcherFunction = (...args: any) => Promise<any>;

export type CallAPIParamList<T extends FetcherFunction> = {
  API: T;
  payload?: object;
  beforeSend?: TFunction;
  onSuccess?: (res: UnwrapPromise<ReturnType<T>>) => void;
  onError?: (error: HTTPError) => void;
};

export async function callAPIHelper<T extends FetcherFunction>({
  API,
  payload,
  beforeSend,
  onSuccess,
  onError,
}: CallAPIParamList<T>) {
  try {
    beforeSend && beforeSend();
    const res = await API(payload);
    onSuccess && onSuccess(res);
  } catch (e) {
    const error = e as HTTPError;
    onError && onError(error);
  }
}
