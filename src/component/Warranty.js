import React, { Component } from 'react';

// my Component
import BulletPoint from './BulletPoint.js';
import Selects from './Selects.js';
import { SelectField, TextareaField, MultiInputField } from './FormField'

// 保固期限選單
const preservedays = [{content: "無", value:"無", key: 'preservedays-none'},
				{content: "1個月", value:"1個月", key: 'preservedays-1mth'},
				{content: "3個月", value:"3個月", key: 'preservedays-3mth'},
				{content: "6個月", value:"6個月", key: 'preservedays-6mth'},
				{content: "9個月", value:"9個月", key: 'preservedays-9mth'},
				{content: "1年", value:"1年", key: 'preservedays-1yr'},
				{content: "2年", value:"2年", key: 'preservedays-2yr'},
				{content: "3年", value:"3年", key: 'preservedays-3yr'},
				{content: "終身永久", value:"終身永久", key: 'preservedays-forever'},
				{content: "其他", value:"其他", key: 'preservedays-other'}];
// 保固範圍選單
const warrantyrange = [{content: "無", value:"無"},
				{content: "新品瑕疵", value:"新品瑕疵"},
				{content: "產品故障", value:"產品故障"},
				{content: "其他", value:"其他"}];


class Warranty extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            warranty: {
                listdesc: [""]
            }
        }

        this.bulletPointHandle = this.bulletPointHandle.bind(this);

    }


    // 描述 handle
    descHandle(item, e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.warranty[item] = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
    }

    // 下拉式選單 handle
    dropdownHandle(item, e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        if (inputVal !== "其他")
            obj_state.warranty[item + "desc"] = "";

        obj_state.warranty[item] = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });

    }

    // 條列式敘述 handle
	bulletPointHandle(e){
		var obj_state = this.state;
		var inputIndex = e.target.name.split("_")[1];
		var inputValue = e.target.value;

        obj_state.warranty.listdesc[inputIndex] = inputValue;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
	}

	render() {
    return(
    <div>
        <SelectField
            theader="保固期限"
            name="period"
            id="period"
            data = {preservedays}
            otherInput
        />

        <SelectField
            theader="保固範圍"
            name="scope"
            id="scope"
            data = {warrantyrange}
            otherInput
        />

        <TextareaField
            theader="說明訊息(整段)"
            name="desc"
            id="desc"
        />

        <MultiInputField
            theader="說明訊息(條列)"
        />
    </div>
    )
    }

}

export default Warranty;