import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hello } from './sample';
import styles from './styles.css';

const name = 'Halftone';

const element = <h1 className={styles.sampleTitle}>{hello(name)}</h1>;

ReactDOM.render(element, document.getElementById('root'));
