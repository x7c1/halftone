import * as tauri from 'tauri/api/tauri';
import { BackendResponse } from '../index';

export interface Request {
  cmd: 'PromisifySample';
  sampleArg1: string;
  arg2: number;
}

export interface Response {
  sampleGreeting: string;
}
//
// export function run(request: Request): Promise<Response> {
//   return tauri
//     .promisified<BackendResponse<Response>>(request)
//     .then(response => {
//       console.debug('...response returned:', response);
//       switch (response.type) {
//         case 'Success':
//           console.debug('success returned:', response.payload.sampleGreeting);
//           return response.payload
//           // break;
//         case 'Failure':
//           console.error('failure returned:', response.payload);
//           return Promise.reject(response.payload)
//           // switch (response.payload.type) {
//           //   case 'IllegalOperation':
//           //     console.error(
//           //       'IllegalOperation returned: message:',
//           //       response.payload.message
//           //     );
//           //     break;
//           // }
//           // break;
//       }
//     });
// }
