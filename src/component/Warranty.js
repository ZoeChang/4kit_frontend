import React, { Component } from 'react';

// my Component
import BulletPoint from './BulletPoint.js';
import Selects from './Selects.js';

// 保固期限選單
const preservedays = [{content: "無", value:"無"},
				{content: "1個月", value:"1個月"},
				{content: "3個月", value:"3個月"},
				{content: "6個月", value:"6個月"},
				{content: "9個月", value:"9個月"},
				{content: "1年", value:"1年"},
				{content: "2年", value:"2年"},
				{content: "3年", value:"3年"},
				{content: "終身永久", value:"終身永久"},
				{content: "其他", value:"其他"}];
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
            },
            periodIsOther: false,
            scopeIsOther: false
		}

        this.periodHandle = this.periodHandle.bind(this);
        this.perioddescHandle = this.perioddescHandle.bind(this);
        this.scopeHandle = this.scopeHandle.bind(this);
        this.scopedescHandle = this.scopedescHandle.bind(this);
        this.descHandle = this.descHandle.bind(this);
        this.bulletPointHandle = this.bulletPointHandle.bind(this);

    }

    descHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.warranty.desc = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
    }

    periodHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        if (inputVal === "其他"){
            obj_state.periodIsOther = true;
        } else {
            obj_state.periodIsOther = false;
            obj_state.warranty.perioddesc = "";
        }

        obj_state.warranty.period = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
    }

    perioddescHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.warranty.perioddesc = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });

    }

    scopeHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        if (inputVal === "其他"){
            obj_state.scopeIsOther = true
        } else {
            obj_state.scopeIsOther = false;
            obj_state.warranty.scopedesc = "";
        }

        obj_state.warranty.scope = inputVal;
        

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
    }

    scopedescHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.warranty.scopedesc = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });

    }

    // 條列式敘述 handle
	bulletPointHandle(e){
		var obj_state = this.state;
		var handleIndex = e.target.name.split("_")[1];
		var handleValue = e.target.value;
		
        obj_state.warranty.listdesc[handleIndex] = handleValue;
        
        this.setState( obj_state , function(){
            this.props.updater(this.state.warranty);
        });
	}

	render() {
    return(
    <div>
        <div className="container">
            <label className="col-sm-3">保固期限</label>
            <div className="col-sm-6">
                <select name="period" id="period" onChange={this.periodHandle}>
                    <Selects select_arr={preservedays} />
                </select>
            </div>
            <div className={`col-sm-3 ${this.state.periodIsOther ? "" : "hidden"}`}>
                <input type="text" name="period" placeholder="保固期限" id="period" onChange={this.perioddescHandle}/>
            </div>
        </div>

        <div className="container">
            <label className="col-sm-3">保固範圍</label>
            <div className="col-sm-6">
                <select name="scope" id="scope" onChange={this.scopeHandle}>
                     <Selects select_arr={warrantyrange} />
                </select>
            </div>
            <div className={`col-sm-3 ${this.state.scopeIsOther ? "" : "hidden"}`}>
                <input type="text" name="scope" placeholder="保固範圍" id="scope" onChange={this.scopedescHandle} />
            </div>
        </div>

        <div className="container">
            <label className="col-sm-3">說明訊息(整段)</label>
            <div className="col-sm-9">
                <textarea name="desc" id="desc" onChange={this.descHandle}></textarea>
            </div>
        </div>

        <BulletPoint onChange={this.bulletPointHandle}></BulletPoint>
    </div>
    )
    }
	
}

export default Warranty;