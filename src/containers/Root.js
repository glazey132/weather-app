import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Root({ store }) {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='root-container'>
					<Route
						path="/"
						component={AppContainer}
					/>
				</div>
			</BrowserRouter>
		</Provider>
	);
}
