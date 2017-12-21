import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

var recipe = new URLSearchParams(window.location.search).get("recipe")

ReactDOM.render(<App recipe={recipe}/>, document.getElementById('app'));

registerServiceWorker();
