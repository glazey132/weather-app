//packages
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
// import axios from 'axios';

//css

//components
import App from '../App';

class RootContainer extends React.Component{
	//uncomment when you use a prop (loading?)
	//
	// constructor(props) {
	// 	super(props)
	// }

	render() {
		return (
				<BrowserRouter>
					<div className='root-container'>
						<Route
							path="/"
							component={App}
						/>
					</div>
				</BrowserRouter>
		);
	}
}

export default connect(null, null)(RootContainer);
