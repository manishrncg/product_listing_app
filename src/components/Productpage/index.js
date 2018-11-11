import React, {Component} from 'react';
import axios from 'axios';
import {apiEndPoint} from '../../config/config.js';
// components
import Button from '../Button.js';

import './Productpage.css';

class ProductPage extends Component {
	constructor(){
		super();
		this.state = ({
			car: {}
		});
	}

	componentDidMount(){
		const self = this;
		this.getCarsList(this.props.match.params.id)
		.then(function (res) {
			self.setState({
				car: res.data.car
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	getCarsList = (stockNumber) => {
		return axios.get(apiEndPoint + '/cars/' + stockNumber);
	}

	saveCarToLocal = (stockNumber) => {
		const currentCar = {};
		currentCar[stockNumber] = this.state.car;
		const cars = JSON.parse(localStorage.getItem('cars')) || {};
		const newSavedCarsList = {...currentCar, ...cars};
		localStorage.setItem("cars", JSON.stringify(newSavedCarsList));
	}	

	render(){
		const {color, fuelType, manufacturerName, mileage, modelName, pictureUrl, stockNumber} = this.state.car;
		const mileageNumber = mileage!==undefined ? mileage.number : '';
		const mileageUnit = mileage!==undefined ? mileage.unit : '';
		return (<div className="display-flex flex-column">
					<img src={pictureUrl} className="car-dp-full" alt={`${manufacturerName} ${modelName}`} />
					<div className="product-page-desc display-flex">
						<div className="flex1">
							<h1>{`${manufacturerName} ${modelName}`}</h1>
							<h3 className="font-w-normal">{`Stock # ${stockNumber} - ${mileageNumber + mileageUnit} - ${fuelType} - ${color}`}</h3>
							<p className="font-14">This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.</p>
						</div>
						<div className="grey-border-box flex1">
							<p className="margin-24">If you like this car, click the button and save it in your collection of favourite items</p>
							<Button  
								name="Save"
								classes="btn margin-15 float-right"
								onClick={() => this.saveCarToLocal(stockNumber)} />
						</div>
					</div>
				</div>);
	}
}
export default ProductPage;