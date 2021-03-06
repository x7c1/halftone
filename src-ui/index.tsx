import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hello } from './sample';
import styles from './styles.css';
import * as tauri from 'tauri/api/tauri';

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
      cmd: 'Sample1',
      arg1: 'fooo-',
      arg2: 123456,
    });
  }

  private static onClickPromisified() {
    tauri
      .promisified<Response<Sample2Response>>({
        cmd: 'Sample2',
        arg1: 'fooo-',
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

type ApplicationError =
  | { type: 'IllegalOperation'; message: string }
  | { type: 'Unexpected'; message: string };

interface Success<A> {
  type: `Success`;
  payload: A;
}

interface Failure {
  type: 'Failure';
  payload: ApplicationError;
}

type Response<A> = Success<A> | Failure;

interface Sample2Response {
  type: 'Sample2Response';
  sampleGreeting: string;
}

ReactDOM.render(<App />, document.getElementById('root'));
