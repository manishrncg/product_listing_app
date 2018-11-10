import React, {Component} from 'react';

import { Link } from 'react-router-dom';

class ListItem extends Component {
	render(){
		const {car, carName} = this.props;
		return (<div className="product-box display-flex">
					<img src={'/images/car.svg'|| car.pictureUrl} className="car-dp" alt={carName} />
					<span className="product-desc">
						<b className="margin-0">{carName}</b>
						<p className="desc">Stock # {car.stockNumber} - {car.mileage.number + car.mileage.unit} - {car.fuelType} - {car.color}</p>
							<Link to={'/view/'+car.stockNumber} className="cursor-pointer orange-text">View details</Link>
					</span>
				</div>);
	}
}
export default ListItem;