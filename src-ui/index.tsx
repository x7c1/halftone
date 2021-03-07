import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './styles.css';
import * as tauri from 'tauri/api/tauri';
import * as PromisifySample from './tasks/PromisifySample';
import { useState } from 'react';

const App = () => {
  const [messageAfterInvoke, setMessage1] = useState('default1');
  const [messageAfterPromisified, setMessage2] = useState('default2');

  const onClickInvoke = () => {
    tauri.invoke({
      cmd: 'InvokeSample',
      arg1: 'fooo',
      arg2: 123456,
    });
    setMessage1('tauri.invoke called. see terminal output.');
  };

  const onClickPromisified = () => {
    setMessage2('running');

    PromisifySample.run({
      cmd: 'PromisifySample',
      sampleArg1: 'foo',
      arg2: 123456,
    })
      .then(x => {
        console.debug('success returned:', x);
        setMessage2(x.sampleGreeting);
      })
      .catch(e => {
        console.error('failure returned:', e);
        if (e.type == 'IllegalOperation') {
          console.error(e.message);
        }
      });
  };

  return (
    <>
      <h1 className={styles.sampleTitle}>Hello, Halftone.</h1>

      <section>
        <button onClick={onClickInvoke}>call invoke</button>
        <pre>{messageAfterInvoke}</pre>
      </section>

      <section>
        <button onClick={onClickPromisified}>call promisified</button>
        <pre>response from backend : {messageAfterPromisified}</pre>
      </section>
    </>
  );
};

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
