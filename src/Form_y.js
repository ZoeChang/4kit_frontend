import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FirstStage from './Category1_y.js';

var apibs = `http://localhost:8888/4kit_backend/public/4kit`;
var apiItemPage = apibs + `/y/ItemPage`;
var apiMerchandise = apibs + `/y/Merchandise`;

function FieldGroup({ id, label, help, ...props }) {
	return (
	<FormGroup controlId={id}>
		<ControlLabel>{label}</ControlLabel>
		<FormControl {...props} />
		{help && <HelpBlock>{help}</HelpBlock>}
	</FormGroup>
	);
}

function ApiGET(){

	fetch( apiItemPage ,{
			method: 'GET',
		}).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
			return response.json()
			} else {
			var error = new Error(response.statusText)
			error.response = response
			throw error
			}
			// response => response.json()
		})
		.then(function(data) {
			// data 才是實際的 JSON 資料
			console.log(data);
			// console.log(test);
			// const numbers = [1, 2, 3, 4, 5];
			// const listItems = numbers.map((number) =>
			// 	<li key={number.toString()}>
			// 		{number}
			// 	</li>
			// );
		
			// return (<ul>{listItems}</ul>);

		});

		return null;
}

class yahoo extends Component {
	render() {
	return (
		<div className="form">
			<ApiGET />
			<form>
				<FieldGroup
				id="formControlsText"
				type="text"
				label="提案人"
				placeholder="請輸入中文全名"
				/>

		

				<FormGroup controlId="formControlsSelect">
					<ControlLabel>提案站別 / 對象</ControlLabel>
					<FirstStage api={apiItemPage} />
				</FormGroup>








				<FieldGroup
				id="formControlsText"
				type="text"
				label="Text"
				placeholder="Enter text"
				/>
				<FieldGroup
				id="formControlsEmail"
				type="email"
				label="Email address"
				placeholder="Enter email"
				/>
				<FieldGroup
				id="formControlsPassword"
				label="Password"
				type="password"
				/>
				<FieldGroup
				id="formControlsFile"
				type="file"
				label="File"
				help="Example block-level help text here."
				/>

				<Checkbox checked readOnly>
				Checkbox
				</Checkbox>
				<Radio checked readOnly>
				Radio
				</Radio>

				<FormGroup>
				<Checkbox inline>
					1
				</Checkbox>
				{' '}
				<Checkbox inline>
					2
				</Checkbox>
				{' '}
				<Checkbox inline>
					3
				</Checkbox>
				</FormGroup>
				<FormGroup>
				<Radio name="radioGroup" inline>
					1
				</Radio>
				{' '}
				<Radio name="radioGroup" inline>
					2
				</Radio>
				{' '}
				<Radio name="radioGroup" inline>
					3
				</Radio>
				</FormGroup>

				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Select</ControlLabel>
					<FormControl componentClass="select" placeholder="select">
						<option value="select">select</option>
						<option value="other">...</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="formControlsSelectMultiple">
					<ControlLabel>Multiple select</ControlLabel>
					<FormControl componentClass="select" multiple>
						<option value="select">select (multiple)</option>
						<option value="other">...</option>
					</FormControl>
				</FormGroup>

				<FormGroup controlId="formControlsTextarea">
				<ControlLabel>Textarea</ControlLabel>
				<FormControl componentClass="textarea" placeholder="textarea" />
				</FormGroup>

				<FormGroup>
				<ControlLabel>Static text</ControlLabel>
				<FormControl.Static>
					email@example.com
				</FormControl.Static>
				</FormGroup>

				<Button type="submit">
				Submit
				</Button>
			</form>
		</div>
	);
	}
}

export default yahoo;