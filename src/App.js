import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {apiEndPoint} from './config/config.js';

// components
import ListItem from './components/ListItem.js';

import './App.css';


class App extends Component {
	constructor(props){
		super(props);
		this.state = ({
			cars: []
		});
	}
	componentDidMount(){
		const self = this;
		axios.get(apiEndPoint+'/cars')
		.then(function (response) {
			console.log(response);
			self.setState({
				cars: response.data.cars
			});
		})
		
	}

  render() {
  	const cars = this.state.cars.map( (car,index) => {
  		const carName = car.manufacturerName + ' ' + car.modelName;
  		return (<ListItem key={index} carName={carName} car={car} />);
  	});
    return (
		<div className="display-flex">
			<div className="grey-border-box padding-15 flex1">
				
			</div>
			<div className='product-list'>
				<div className="display-flex">
					<div className="flex1">
						<h2 className="margin-tb-15">Available cars</h2>
						<h2 className="font-w-normal margin-tb-15">Showing 10 of 100 results</h2>
					</div>
					<div className="flex1">
						
					</div>
				</div>
				{cars}
				<div className="width-pagination margin-auto">
					
				</div>
			</div>
		</div>
    );
  }
}

export default App;