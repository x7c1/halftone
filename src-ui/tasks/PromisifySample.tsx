import * as tauri from 'tauri/api/tauri';
import { BackendResult } from '../index';

export interface Request {
  cmd: 'PromisifySample';
  sampleArg1: string;
  arg2: number;
}

export interface Response {
  sampleGreeting: string;
}

export function run(request: Request): Promise<Response> {
  return tauri
    .promisified<BackendResult<Response>>(request)
    .then(result => {
      console.debug('payload from backend:', result);
      switch (result.type) {
        case 'Success':
          return result.payload
        case 'Failure':
          return Promise.reject(result.payload)
      }
    });
}
