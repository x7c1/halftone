import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import * as tauri from 'tauri/api/tauri';

import styles from './styles.css';
import * as PromisifySample from './tasks/PromisifySample';

const App = () => {
  return (
    <>
      <h1 className={styles.sampleTitle}>Hello, Halftone.</h1>
      <InvokeSampleArea />
      <PromisifiedSampleArea />
    </>
  );
};

const InvokeSampleArea = () => {
  const [message, setMessage] = useState('<empty>');
  return (
    <section>
      <button onClick={onClick}>
        <code>tauri.invoke(...)</code>
      </button>
      <pre>{message}</pre>
    </section>
  );

  function onClick() {
    tauri.invoke({
      cmd: 'InvokeSample',
      arg1: 'fooo',
      arg2: 123456,
    });
    setMessage('tauri.invoke called. see terminal output.');
  }
};

const PromisifiedSampleArea = () => {
  const [message, setMessage] = useState('<empty>');
  return (
    <section>
      <button onClick={onClick}>
        <code>tauri.promisified(...)</code>
      </button>
      <pre>response from backend : {message}</pre>
    </section>
  );

  function onClick() {
    setMessage('<running>');
    callPromisified().then(x => {
      const message = x?.sampleGreeting ?? 'failed to call promisified()';
      setMessage(message);
    });
  }

  function callPromisified() {
    const request: PromisifySample.Request = {
      cmd: 'PromisifySample',
      sampleArg1: 'foo',
      arg2: 123456,
    };
    return PromisifySample.run(request)
      .then(response => {
        console.debug('success returned:', response);
        return response;
      })
      .catch(e => {
        console.error('failure returned:', e);
        if (e.type == 'IllegalOperation') {
          console.error(e.message);
        }
        return null;
      });
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
