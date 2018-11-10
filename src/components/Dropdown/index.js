import React, {Component} from 'react';
import './Dropdown.css';

class Dropdown extends Component {
	constructor(props){
		super(props);
		this.inputValue = props.placeHolder;
		this.filter = false;
		this.state = {
			liSelected: true,
			dropdownVisible: false
		};
		// this.valueSelection = this.valueSelection.bind(this);
		// this.showDropDown = this.showDropDown.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.name === 'Sort by'){
			this.filter = true;
			this.optionsList = nextProps.optionsList.map((ele, index) => <li key={index} data-type={nextProps.type} data-value={ele.value}>{ele.name}</li>);
		}else if(nextProps.name === 'Manufacturers'){
			this.optionsList = nextProps.optionsList.map((ele, index) => <li key={index} data-type={nextProps.type} data-value={ele.name}>{ele.name}</li>);
			this.optionsList = [...[<li key="default" data-type={nextProps.type} data-value=''>{nextProps.placeHolder}</li>], ...this.optionsList]
		}else{
			this.optionsList = nextProps.optionsList.map((ele, index) => <li key={index} data-type={nextProps.type} data-value={ele}>{ele}</li>);			
			this.optionsList = [...[<li key="default" data-type={nextProps.type} data-value=''>{nextProps.placeHolder}</li>], ...this.optionsList]
		}
	}

	valueSelection = (e) => {
		const value = e.target.textContent;
		this.inputValue = value;
		this.setState({ 
			liSelected: true,
			dropdownVisible: false
		 });
	}

	showDropDown = () => {
		this.setState({
			dropdownVisible: !this.state.dropdownVisible
		});
	}

	render(){
		const { name, onClick } = this.props;
		return (
				<div className="margin-15 dropdown position-relative">
		            <p> {name} </p>
		            <p className="placholder"
		            	onClick={this.showDropDown} >
            			{this.inputValue} <span className="float-right">&#9660;</span>
	            	</p>
		            {this.state.dropdownVisible &&
		            <ul
		            	className="list position-absolute" 
		            	onClick={(e) => {this.valueSelection(e); onClick(e, this.filter)}} >
		            	{this.optionsList}
		            </ul>}
		      	</div>
	          );
	}
}
export default Dropdown;