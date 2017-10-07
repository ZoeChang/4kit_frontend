import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BS from './BS';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<BS />, document.getElementById('BS'));
registerServiceWorker();
