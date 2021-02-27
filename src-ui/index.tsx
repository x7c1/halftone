import * as React from 'react';
import * as ReactDOM from 'react-dom';

const name = 'Halftone';

const hello: (x: string) => string = x => {
    return `Hello, ${x}!`
}

const element = <h1>{hello(name)}</h1>;

ReactDOM.render(element, document.getElementById('root'));
