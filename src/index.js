import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Root from './containers/Root';
import reducers from './reducers/index';
// import 'bootstrap/dist/css/bootstrap.min.css';
//TODO: pick between index.css and bootstrap;

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);

render(
	<Root store={store} />,
	document.getElementById('root')
);
registerServiceWorker();
