import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class yahoo extends Component {
  render() {
    return (
      <div className="form">
            <form>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="提案人"
                placeholder="請輸入中文全名"
              />

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>提案站別 / 對象</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">國民時尚女包</option>
                  <option value="select">休閒</option>
                </FormControl>
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