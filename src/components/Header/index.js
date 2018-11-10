import React, { Component } from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <header className="app-header">
        	<div className="display-flex">
        		<div className="flex1 margin-center">
        			<img src="/images/logo.png" alt="logo" />
        		</div>        		
        		<div className="flex1 margin-center">
        			<span className="float-right margin-15 cursor-pointer">Sell</span>
        			<span className="float-right margin-15 cursor-pointer">My order</span>
        			<span className="float-right margin-15 cursor-pointer">Purchase</span>
        		</div>    		
        	</div>
        </header>
    );
  }
}

export default Header;