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
      arg1: 'fooo',
      arg2: 123456,
    });
  }

  private static onClickPromisified() {
    PromisifySample.run({
      cmd: 'PromisifySample',
      sampleArg1: 'foo',
      arg2: 123456,
    })
      .then(x => {
        console.debug('success returned:', x);
      })
      .catch(e => {
        console.error('failure returned:', e);
      })
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

export type BackendResult<A> = Success<A> | Failure;

ReactDOM.render(<App />, document.getElementById('root'));
