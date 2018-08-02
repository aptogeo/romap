import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleApp } from './SampleApp';

const reactElement = React.createElement(SampleApp);
ReactDOM.render(reactElement, document.getElementById('root'));
