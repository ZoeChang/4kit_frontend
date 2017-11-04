import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Overlay from 'react-bootstrap/lib/Overlay';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';


// AttrValue props
// attrName = 項目名稱
// value_arr: ["選項1", "選項2" , "選項3"...]  項目內容列表
// type = 單選 1/複選 2
class AttrValue extends Component{
    render() {
    if (this.props.type === 2){
        return(
            this.props.value_arr.map( (value ,index) => 
                <Checkbox name={this.props.attrName} inline value={value} key={index}>
                    {value}
                </Checkbox>
            
            )
        )
        
    } else {
        return(
            this.props.value_arr.map( (value ,index) => 
                <Radio name={this.props.attrName} inline value={value} key={index}>
                    {value}
                </Radio>
            
            )
        )
    }
    
    }
}

// Attrs props:
// attr: { name:string, values:[], constraint:number ,textmax:string , textmin:sting, required:Boolean }

class Attr extends Component {
	// attr.name = 項目名稱
	// attr.values = 項目內容列表
    // attr.required = 是否為必填
    
    // 可複選選項?
    // 假設 attr.constraint 是單選 1/複選 2
    
    constructor(props, context) {
        super(props, context);

        this.state = { 
            show: false,
            selected: ""
        };

        this.handleClick = e => {
            this.setState({ target: e.target, show: !this.state.show });
        };

    }

	render() {
        const attrName = `${this.props.attr.name}` + ( this.props.attr.required ? `(必填)` : `` );
        const overlayTitle = `請勾選屬性項目` + (this.props.attr.constraint === 2 ? `(可複選)` : ``);
		return(
            <FormGroup controlId="formControlsSelect">
            {/* <div>  */}
                <ControlLabel>{attrName}</ControlLabel>
                <span></span>
                <Button type="button" onClick={this.handleClick}>請選擇</Button>
                <Overlay
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                rootClose={true}
                target={this.state.target}
                placement="right"
                >
                
                    <Popover id="popover-contained" title={overlayTitle} onChange={this.props.onChange}>
                        <AttrValue value_arr={this.props.attr.values} attrName={this.props.attr.name} type={this.props.attr.constraint}/>
                    </Popover>
                </Overlay> 
            </FormGroup> 
		);
	}
	
}

export default Attr;