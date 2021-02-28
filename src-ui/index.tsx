import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hello } from './sample';

const name = 'Halftone';

const element = <h1>{hello(name)}</h1>;

ReactDOM.render(element, document.getElementById('root'));
