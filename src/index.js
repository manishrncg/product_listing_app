import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// components
import Header from './components/Header';
import Productpage from './components/Productpage';
import NotFound from './components/NotFound';

// import react router deps
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

ReactDOM.render(
	<React.Fragment>
		<Header />
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/view/:id" component={Productpage} />
				
				<Route path='/404' component={NotFound} />
          		<Redirect from='*' to='/404' />
			</Switch>
		</BrowserRouter>
	</React.Fragment>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
