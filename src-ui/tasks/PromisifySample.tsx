import {BackendTask, task} from "./backend";

export interface Request {
  cmd: 'PromisifySample';
  sampleArg1: string;
  arg2: number;
}

export interface Response {
  sampleGreeting: string;
}

export const run: BackendTask<Request, Response> = task;
