import { EitherPromise } from '../general/EitherPromise';
import { invoke } from 'tauri/tauri';

export type BackendError =
  | { type: 'IllegalOperation'; message: string }
  | { type: 'Unexpected'; message: string };

interface Ok<A> {
  Ok: A;
}

interface Err {
  Err: BackendError;
}

export type BackendResult<A> = Ok<A> | Err;

export type BackendTask<X, Y> = (_: X) => EitherPromise<Y, BackendError>;

export const toTask = (cmd: string) =>
  function <X, Y>(request: X): EitherPromise<Y, BackendError> {
    console.debug('task request', request);
    const underlying = invoke<BackendResult<Y>>(cmd, { request });
    return new EitherPromise<BackendResult<Y>, BackendError>(underlying).then(
      result => {
        console.debug('task result', result);
        if ('Err' in result) {
          return Promise.reject(result.Err);
        }
        if ('Ok' in result) {
          return result.Ok;
        }
        return result;
      }
    );
  };
