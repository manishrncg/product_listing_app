import React from 'react';

const Button = (props) => {
	return (<button type="button" className={props.classes} onClick={e => props.onClick(e, true)}>{props.name}</button>);
}

export default Button;