import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <footer className={this.props.classes ? this.props.classes + " text-center" : "app-footer text-center"}>
        	<p>© AUTO1 Group 2018</p>
        </footer>
    );
  }
}

export default Footer;