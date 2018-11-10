import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// components
import Header from './components/Header';

// import react router deps
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<React.Fragment>
		<Header />
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
			</Switch>
		</BrowserRouter>
	</React.Fragment>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
