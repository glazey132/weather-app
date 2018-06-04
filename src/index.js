import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import rootReducer from './ReactApp/reducers/index';
// import 'bootstrap/dist/css/bootstrap.min.css';
//TODO: pick between index.css and bootstrap;

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//components
import RootContainer from './ReactApp/containers/RootContainer';

const store = createStore(rootReducer);

//could dispatch an action here that collects geo location so we have the users weather data right when we load app?
//grab weather api data and call an action creator that returns action type and weatherData that you passed in

render(
	<Provider store ={store}>
		<MuiThemeProvider>
			<RootContainer store={store} />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
