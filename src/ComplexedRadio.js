import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';


// props: 
const data = {
    label: "特殊交貨期",
    name: "deliveryinfo",
    radios:[
        {
            value: 0,
            content: "正常交貨期"
        },{
            value: 1,
            content: ["預購商品, 預計出貨日期"],
            sub:{
                id: "shipdate",
                type: "text",
                name: "shipdate",
                placeholder: "yyyy-mm-dd",
                className: "form-control mdtextarea",
            }
        },{
            value: 2,
            content: ["客製化商品, 收到商品後", "天後出貨"],
            sub:{
                id: "dayship",
                type: "text",
                name: "dayship",
                placeholder: "天數",
                className: "form-control smtextarea",
            }
        },{
            value: 3,
            content: "需與顧客約定送貨日"
        }
    ]
};

class RadioGroup extends Component {
    render(){
    const RadioGroupName = this.props.data.name;
    return( 

    this.props.data.radios.map( function(obj){ 
        var radiosId = `{RadioGroupName}_{obj.value}`

        if (obj.sub){
            return(
                <div key={obj.value}>
                <Radio name={RadioGroupName} inline value={obj.value} id={radiosId}>
                {' '}
                {obj.content[0]}
                </Radio>
                <input type="text" name={RadioGroupName} placeholder={obj.sub.placeholder} id={obj.sub.id} className={obj.sub.className} data-tag={radiosId} />
                {obj.content[1]}
                </div>
            )

        } else {
            return(
                <Radio name={RadioGroupName} inline value={obj.value} id={radiosId} key={obj.value}>
                {' '}
                {obj.content}
                </Radio>
                
            )
        } 
    })
    )
    }
}



// props:
//  chagnehandle={this.ComplexedRadioHandle}
class ComplexedRadio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryinfo: {
                "type": 0,
            }
        }

        // handler
		this.onChange = this.onChange.bind(this);
    }

    isNumeric(num){
		return !isNaN(+num);
	}


    onChange(e){
        var name = e.target.name;
        var value = e.target.value;
        var id = e.target.id;
        var change = this.state.deliveryinfo;

		if (this.isNumeric(value) ){
			value = parseInt(value);
		};

        if ( name == "deliveryinfo"){
            change["type"] = value
        } else {
            // 控制checked 隨輸入的文字改變選項
            // var dependedRadio = e.target.dataset.tag
            // document.getElementById({dependedRadio}).checked = true;
            // console.log( document.getElementById({dependedRadio}) );

            // 文字存入
            change[id] = value;
        }

        this.setState({deliveryinfo: change });

    }
    

    // // 這個函式需要回傳一個布林值，當元件判斷是否需要更新 DOM 時會被觸發。
    // // 比較 this.props，this.state，nextProps，nextState 來決定是否需要更新，回傳 false 則會跳過此次觸發不更新
    // shouldComponentUpdate(nextProps, nextState){
    //     if (nextProps){
    //         console.log(this.props);
    //         console.log(nextProps);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    render(){
    return(
    <FormGroup  onChange={this.props.chagnehandle}>
        <ControlLabel>{data.label}</ControlLabel>
        {' '}
        <RadioGroup data={data} />
        {/* <Radio name="deliveryinfo" inline value={0} id="deliveryinfo_0">
            正常交貨期
        </Radio>
        {' '}
        <Radio name="deliveryinfo" inline value={1} id="deliveryinfo_1">
            預購商品, 預計出貨日期
        </Radio>
        <input type="text" name="shipdate" placeholder="yyyy-mm-dd" id="shipdate" className="form-control mdtextarea" data-tag="deliveryinfo_1" />

        {' '}
        <Radio name="deliveryinfo" inline value={2} id="deliveryinfo_2">
            客製化商品, 收到商品後
        </Radio>
        <input type="text" name="dayship" placeholder="天數" id="dayship" className="form-control smtextarea" data-tag="deliveryinfo_2"/>
        天後出貨
        {' '}
        <Radio name="deliveryinfo" inline value={3} id="deliveryinfo_3">
            需與顧客約定送貨日
        </Radio> */}
    </FormGroup>

    );
    }
}

export default ComplexedRadio;