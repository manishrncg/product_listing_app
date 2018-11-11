import React, {Component} from 'react';
import axios from 'axios';
import {apiEndPoint} from '../../config/config.js';
// components
import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button.js';

import './Productpage.css';

class ProductPage extends Component {
	constructor(){
		super();
		this.carsSaved = JSON.parse(localStorage.getItem('cars')) || {};
		this.state = ({
			car: {},
			carsSavedStatus: false
		});
	}

	componentDidMount(){
		const self = this;
		const stockNumber = this.props.match.params.id;
		this.getCarsList(stockNumber)
		.then(function (res) {
			const carsSavedStatus = self.carsSaved[stockNumber] !== undefined ? true : false;
			self.setState({
				car: res.data.car,
				carsSavedStatus: carsSavedStatus
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
		const carsSavedStatus = this.state.carsSavedStatus;
		const currentCar = {};
		if(!carsSavedStatus){
			currentCar[stockNumber] = this.state.car;
			this.carsSaved = {...currentCar, ...this.carsSaved};
			localStorage.setItem("cars", JSON.stringify(this.carsSaved));
			this.setState({
				carsSavedStatus: true
			})
		}
		else{
			delete this.carsSaved[stockNumber];
			localStorage.setItem("cars", JSON.stringify(this.carsSaved));
			this.setState({
				carsSavedStatus: false
			})
		}
	}	

	render(){
		const {color, fuelType, manufacturerName, mileage, modelName, pictureUrl, stockNumber} = this.state.car;
		const mileageNumber = mileage!==undefined ? mileage.number : '';
		const mileageUnit = mileage!==undefined ? mileage.unit : '';
		return (<React.Fragment>
					<Header/>
					<div className="display-flex flex-column">
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
									name={this.state.carsSavedStatus ? "Remove" : "Save"}
									classes="btn margin-15 float-right"
									onClick={() => this.saveCarToLocal(stockNumber)} />
							</div>
						</div>
					</div>
					<Footer/>
				</React.Fragment>);
	}
}
export default ProductPage;