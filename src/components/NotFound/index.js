import React from 'react';
import {Link} from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
	return (<div className="not-found-container text-center">
				<img src="/images/logo.png" alt="logo" className="logo" />
				<h1>404 - Not Found</h1>
				<h2 className="font-w-normal">Sorry, the page you are looking for does not exist.<br/>
					You can always go back to the 
					<Link className="orange-text" to="/"> homepage</Link>.
				</h2>
			</div>);
}

export default NotFound;