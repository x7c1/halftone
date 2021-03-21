import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import styles from './styles.css';
import * as PromisifySample from './tasks/PromisifySample';
import { invoke } from 'tauri/tauri';

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
    invoke('invoke_sample', {
      request: {
        arg1: 'fooo',
        arg2: 123456,
      },
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
    return PromisifySample.run({
      sampleArg1: 'foo',
      arg2: 123456,
    })
      .then(response => {
        console.debug('success returned:', response);
        return response;
      })
      .catch(e => {
        console.error('failure returned:', e);
        if (e.type == 'IllegalOperation') {
          console.error('message', e.message);
        }
        return null;
      });
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
