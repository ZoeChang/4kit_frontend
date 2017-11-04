import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';

// my Component
import HandlerCell from './HandlerCell.js'; 

// props:
// inputType: ""  to 
// handleType: ""  string pass to parent handle
// onChange: handle function from parent 
// id="Proposer"
// label="賣場名稱"
// name="name"
// placeholder="最多45個字元"

class HandlerCell extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
			value: ""
		}
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e){
		this.props.onChange(e, this.props.handleType);
	}

	render() {
	if ( this.props.inputType === "text"){
	return(
		<FormGroup controlId={this.props.id} onChange={this.handle}>
			<Col componentClass={ControlLabel} sm={3}>
				{this.props.label}
			</Col>
			<Col sm={3}>
				<FormControl 
					type="text"
					placeholder={this.props.placeholder}
					name={this.props.name}
					value={this.state.value}
					onChange={this.handleChange}/>
			</Col>
		</FormGroup>

	)
	}
		
        
	}
	
}

export default HandlerCell;