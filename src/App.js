import React, { Component } from 'react';
import axios from 'axios';
import {apiEndPoint} from './config/config.js';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import ListItem from './components/ListItem';
import Dropdown from './components/Dropdown';
import Button from './components/Button.js';

import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.dropDownOpen = false;
		this.colors = [];
		this.manufacturers = [];
		this.params = {};
		this.sort = [{name:'None', value: ''}, {name:'Mileage - Ascending', value: 'asc'}, {name: 'Mileage - Descending', value: 'desc'}];
		this.totalPagesCount = 1;
		this.state = ({
			currentPage: 1,
			dropDownOpen: false,
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

	closeDropDown = (e) => {
		if(e.target.getAttribute && e.target.getAttribute('class') === 'placholder'){
			return false;
		}
		this.setState({
			dropDownOpen: false
		});
	}

	closeDropDownWrapper = (e) => {
		return this.closeDropDown(e);
	}

	componentDidMount(){
		document.addEventListener('click', this.closeDropDownWrapper);
		document.addEventListener('scroll', this.closeDropDown);

		const self = this;
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

	componentWillUnmount() {
	    document.removeEventListener('click', this.closeDropDownWrapper);
		document.removeEventListener('scroll', this.closeDropDown);
  	}

	renderCars = (e, filter, pageNumber = 1) => {
		const self = this;
		this.params[e.target.getAttribute('data-type')] = e.target.getAttribute('data-value');
		if(pageNumber <= this.totalPagesCount && pageNumber >= 1){
			this.params.page = pageNumber;
		}
		else if(pageNumber >= this.totalPagesCount ){
			this.params.page = this.totalPagesCount;
		}
		else{
			this.params.page = 1;
		}
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
    return (<React.Fragment>
				<Header/>
				<div className="display-flex">
					<div className="grey-border-box padding-15 flex1">
						<Dropdown
							name="Color" 
							placeHolder="All car colors"
							type="color"
							dropDownOpen={this.state.dropDownOpen}
							onClick={this.renderCars}
							optionsList={this.colors}/>
						<Dropdown
							name="Manufacturers" 
							placeHolder="All manufacturers"
							type="manufacturer"
							dropDownOpen={this.state.dropDownOpen}
							onClick={this.renderCars}
							optionsList={this.manufacturers}/>
						<Button  
							name="Filter"
							classes="btn margin-15 float-right"
							onClick={this.renderCars} />
					</div>
					<div className='product-list'>
						<div className="display-flex">
							<div className="flex1">
								<h3 className="margin-tb-15">Available cars</h3>
								<h3 className="font-w-normal margin-tb-15">Showing 10 of 100 results</h3>
							</div>
							<div className="flex1">
								<Dropdown 
									name="Sort by" 
									placeHolder="None"
									type="sort"
									dropDownOpen={this.state.dropDownOpen}
									onClick={this.renderCars}
									optionsList={this.sort}/>
							</div>
						</div>
						{cars}
						<div className="pagination-container">
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
				<Footer/>
			</React.Fragment>);
  }
}

export default App;