import { EitherPromise } from '../general/EitherPromise';
import { invoke, InvokeArgs } from 'tauri/tauri';

export type BackendError =
  | { type: 'IllegalOperation'; message: string }
  | { type: 'Unexpected'; message: string };

interface Success<A> {
  type: `Success`;
  payload: A;
}

interface Failure {
  type: 'Failure';
  payload: BackendError;
}

export type BackendResult<A> = Success<A> | Failure;

export type BackendTask<X, Y> = (_: X) => EitherPromise<Y, BackendError>;

export const toTask = (cmd: string) =>
  function <Y>(request: InvokeArgs): EitherPromise<Y, BackendError> {
    console.debug('task request', request);
    const underlying = invoke<BackendResult<Y>>(cmd, { request });
    return new EitherPromise<BackendResult<Y>, BackendError>(underlying).then(
      result => {
        console.debug('task result', result);
        switch (result.type) {
          case 'Success':
            return result.payload;
          case 'Failure':
            return Promise.reject(result.payload);
        }
      }
    );
  };
