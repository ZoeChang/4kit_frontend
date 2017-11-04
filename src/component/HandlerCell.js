import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';

// my Component
import Selects from './Selects.js';

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
		<FormGroup controlId={this.props.id} >
			<Col componentClass={ControlLabel} sm={3}>
				{this.props.label}
			</Col>
			<Col sm={9}>
				<FormControl 
					type="text"
					placeholder={this.props.placeholder}
					name={this.props.name}
					onChange={this.handleChange}/>
			</Col>
		</FormGroup>

	)
	} else if (this.props.inputType === "textarea"){
	return(
		<FormGroup controlId={this.props.id} >
			<Col componentClass={ControlLabel} sm={3}>
				{this.props.label}
			</Col>
			<Col sm={9}>
				<FormControl 
					componentClass="textarea"
					placeholder={this.props.placeholder}
					name={this.props.name}
					onChange={this.handleChange}/>
			</Col>
		</FormGroup>

	)
	} else if( this.props.inputType === "radio" ) {
	return (
		<FormGroup  controlId={this.props.id} onChange={this.handle}>
			<Col componentClass={ControlLabel} sm={3}>
				{this.props.label}
			</Col>
			<Col sm={6}>
				<FormControl componentClass="select" name={this.props.name} onChange={this.handleChange}>
					<Selects select_arr={this.props.selects} />
				</FormControl>
			</Col>
			<Col sm={3}>
				<FormControl type="text" name={this.props.name} onChange={this.handleChange} placeholder={this.props.label} >
				</FormControl>
			</Col>
		</FormGroup>

	)	
	} else if( this.props.inputType === "other" ){
	return(
		<FormGroup controlId={this.props.id} >
			<Col sm={3}>
				<FormControl 
					type="text"
					placeholder={this.props.placeholder}
					name={this.props.name}
					onChange={this.handleChange}/>
			</Col>
		</FormGroup>

	)
	}
		
        
	}
	
}

export default HandlerCell;