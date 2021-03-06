import { BackendError, BackendResult } from '../index';
import * as tauri from 'tauri/api/tauri';
import { EitherPromise } from './EitherPromise';

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
