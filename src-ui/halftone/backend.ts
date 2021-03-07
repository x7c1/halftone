import * as tauri from 'tauri/api/tauri';
import { EitherPromise } from '../general/EitherPromise';

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

export function task<X, Y>(request: X): EitherPromise<Y, BackendError> {
  const underlying = tauri.promisified<BackendResult<Y>>(request);
  return new EitherPromise<BackendResult<Y>, BackendError>(underlying).then(
    result => {
      switch (result.type) {
        case 'Success':
          return result.payload;
        case 'Failure':
          return Promise.reject(result.payload);
      }
    }
  );
}
