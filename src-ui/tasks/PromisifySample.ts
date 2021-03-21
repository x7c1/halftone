import { BackendTask, toTask } from '../halftone/backend';
import { InvokeArgs } from 'tauri/tauri';

export interface Request extends InvokeArgs {
  sampleArg1: string;
  arg2: number;
}

export interface Response {
  sampleGreeting: string;
}

export const run: BackendTask<Request, Response> = toTask('promisify_sample');
