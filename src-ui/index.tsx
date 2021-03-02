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
        <button onClick={() => App.onClick()}>CLICK!!!</button>
      </>
    );
  }

  private static onClick() {
    tauri.invoke({
      cmd: 'myCustomCommand',
      arg1: 'fooo-',
      arg2: 123456,
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
