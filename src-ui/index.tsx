import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hello } from './sample';
import styles from './styles.css';
import * as tauri from 'tauri/api/tauri';
import * as PromisifySample from './tasks/PromisifySample';

class App extends React.Component {
  render() {
    return (
      <>
        <h1 className={styles.sampleTitle}>{hello('Halftone')}</h1>
        <p>
          <button onClick={() => App.onClickInvoke()}>invoke(...)</button>
        </p>
        <p>
          <button onClick={() => App.onClickPromisified()}>
            promisified(...)
          </button>
        </p>
      </>
    );
  }

  private static onClickInvoke() {
    tauri.invoke({
      cmd: 'InvokeSample',
      arg1: 'fooo-!?',
      arg2: 123456,
    });
  }

  private static onClickPromisified() {
    tauri
      .promisified<BackendResponse<PromisifySample.Response>>({
        cmd: 'PromisifySample',
        sampleArg1: 'foo!?',
        arg2: 123456,
      })
      .then(response => {
        console.debug('...response returned:', response);
        switch (response.type) {
          case 'Success':
            console.debug('success returned:', response.payload.sampleGreeting);
            break;
          case 'Failure':
            console.error('failure returned:', response.payload);
            switch (response.payload.type) {
              case 'IllegalOperation':
                console.error(
                  'IllegalOperation returned: message:',
                  response.payload.message
                );
                break;
            }
            break;
        }
      })
      .catch(e => {
        console.error('unexpected error detected:', e);
      });
  }
}

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

export type BackendResponse<A> = Success<A> | Failure;

ReactDOM.render(<App />, document.getElementById('root'));
