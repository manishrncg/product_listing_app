import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {apiEndPoint} from './config/config.js';

// components
import ListItem from './components/ListItem';
import Dropdown from './components/Dropdown';
import Button from './components/Button.js';

import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.colors = [];
		this.manufacturers = [];
		this.params = {};
		this.sort = [{name:'None', value: ''}, {name:'Mileage - Ascending', value: 'asc'}, {name: 'Mileage - Descending', value: 'desc'}];
		this.totalPagesCount = 1;
		this.state = ({
			currentPage: 1,
			cars: []
		});
	}

	getCarsList = (params = {}) => {
		return axios.get(apiEndPoint + '/cars', params);
	}

	getManufacturersList = () => {
		return axios.get(apiEndPoint + '/manufacturers');
	}

	getColorsList = () => {
		return axios.get(apiEndPoint + '/colors');
	}

	componentDidMount(){
		const self = this;
		// axios.get(apiEndPoint+'/cars')
		// .then(function (response) {
		// 	console.log(response);
		// 	self.setState({
		// 		cars: response.data.cars
		// 	});
		// })
		axios.all([this.getCarsList(), this.getColorsList(), this.getManufacturersList()])
		.then(axios.spread(function (cars, colors, manu) {
			self.colors = colors.data.colors;
			self.manufacturers = manu.data.manufacturers;
			self.totalPagesCount = cars.data.totalPageCount;
			self.setState({
				cars: cars.data.cars,
			});
		}))
		.catch(function (error) {
			console.log(error);
		});
	}

	simpleAction = (event) => {
		this.props.simpleAction();
	}

	renderCars = (e, filter, pageNumber = 1) => {
		const self = this;
		this.params[e.target.getAttribute('data-type')] = e.target.getAttribute('data-value');
		this.params.page = (pageNumber<=this.totalPagesCount && pageNumber>=1) ? pageNumber : 1;
		if(filter){
			this.getCarsList({params: this.params})
			.then(function (cars) {
				self.totalPagesCount = cars.data.totalPageCount;
				self.setState({
					cars: cars.data.cars,
					currentPage: self.params.page
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

  render() {
  	const cars = this.state.cars.map( (car,index) => {
  		const carName = car.manufacturerName + ' ' + car.modelName;
  		return (<ListItem key={index} carName={carName} car={car} />);
  	});
    return (
		<div className="display-flex">
			<div className="grey-border-box padding-15 flex1">
				<Dropdown
					onClick={this.renderCars}
					name="Color" 
					placeHolder="All car colors"
					type="color"
					optionsList={this.colors}/>
				<Dropdown
					onClick={this.renderCars}
					name="Manufacturers" 
					placeHolder="All manufacturers"
					type="manufacturer"
					optionsList={this.manufacturers}/>
				<Button  
					name="Filter"
					classes="btn margin-15 float-right"
					onClick={this.renderCars} />
			</div>
			<div className='product-list'>
				<div className="display-flex">
					<div className="flex1">
						<h2 className="margin-tb-15">Available cars</h2>
						<h2 className="font-w-normal margin-tb-15">Showing 10 of 100 results</h2>
					</div>
					<div className="flex1">
						<Dropdown 
							onClick={this.renderCars}
							name="Sort by" 
							placeHolder="None"
							type="sort"
							optionsList={this.sort}/>
					</div>
				</div>
				{cars}
				<div className="width-pagination margin-auto">
					<span 
						className="cursor-pointer orange-text paginate-margin" 
						onClick={(e) => this.renderCars(e, true, 1)}>First </span>
					<span 
						className="cursor-pointer orange-text paginate-margin" 
						onClick={(e) => this.renderCars(e, true, this.state.currentPage-1)}>Previous </span>
					<span>Page {this.state.currentPage} of {this.totalPagesCount} </span>
					<span 
						className="cursor-pointer orange-text paginate-margin" 
						onClick={(e) => this.renderCars(e, true, this.state.currentPage+1)}>Next </span>
					<span 
						className="cursor-pointer orange-text paginate-margin" 
						onClick={(e) => this.renderCars(e, true, this.totalPagesCount)}>Last</span>
				</div>
			</div>
		</div>
    );
  }
}

export default App;