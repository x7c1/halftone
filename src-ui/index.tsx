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
      cmd: 'sampleCommand1',
      arg1: 'fooo-',
      arg2: 123456,
    });
  }

  private static onClickPromisified() {
    tauri
      .promisified({
        cmd: 'sampleCommand2',
        arg1: 'fooo-',
        arg2: 123456,
      })
      .then((response) => {
        console.log('response', response);
      });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
