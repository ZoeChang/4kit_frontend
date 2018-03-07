import React, { Component } from 'react';

import Select from 'react-select'


class AttrShowbox extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			attrNameSelects:[],
			attrName: "",
			subOption:[],
			checkedOption:{
				name:"",
				values:[]
			},
			isConfirm: false
		}

		this.dropdownHandle = this.dropdownHandle.bind(this)
		this.checkedHandle = this.checkedHandle.bind(this)
		this.confirmHandle = this.confirmHandle.bind(this)

	}

	// get selected value in dropdown menu
	dropdownHandle(e){
		var obj_state = this.state
		var attrName = e.target.value

		// 清除之前的屬性
		obj_state.subOption = []

		// 清空已勾選的屬性選項
		obj_state.checkedOption = {
			name:"",
			values:[]
		}

		obj_state.attrName = attrName

		obj_state.subOption = this.props.allSelects.find(function(item){
			return item.name === attrName
		}).values

		this.setState(obj_state)

	}

	// show checked item txt
	checkedHandle(e){
		var obj_state = this.state;
		var inputVal = e.target.value;
		var inputChecked = e.target.checked;

		if (inputChecked) {
			obj_state.checkedOption.values.push(inputVal);
		} else {
			obj_state.checkedOption.values = obj_state.checkedOption.values.filter( word => word !== inputVal );
		}

		this.setState(obj_state);

	}

	// 確定屬性 button: pass value and hidden checked item txt
	confirmHandle(){
		var obj_state = this.state

		// hidden checked item txt
		obj_state.isConfirm = true

		this.setState(obj_state)

		// pass value
		this.props.attrValueHandle( this.state.checkedOption.values , this.props.index )

		return false
	}

	// 取得所有屬性選項
	getAttrNameSelects(attrs){
		var obj_state = this.state;
		var arr_selects = [];

		// 整理資料
		attrs.map( (item) =>
			arr_selects.push( { content: item.name, value: item.name } )
		)

		// data for Selects
		obj_state.attrNameSelects = arr_selects;

		//  清空已勾選的屬性選項
		obj_state.checkedOption = {
			name:"",
			values:[]
		}

		// 清除之前的屬性
		obj_state.subOption = []

		this.setState(obj_state);
	}

	// 換規格表時
	componentWillReceiveProps(nextProps){
		if (this.props.allSelects !== nextProps.allSelects) {
			//  更換下拉式選單的選項
			this.getAttrNameSelects(nextProps.allSelects);

		}
	}

	render(){
	return(
	<div>
		<div className="attrtable" >
			<label htmlFor="title" className="">第{this.props.index + 1}種屬性</label>
      {/* TODO: value */}
      <Select name="attrName" value={this.state.merchandiseSpecType} options={[
          {value: 0, label: '無'},
          {value: 1, label: '一層'},
          {value: 2, label: '兩層'}]} simpleValue onChange={this.dropdownHandle} />
		</div>
		{/* 已選項目呈現 */}
		<div className="" >
			<div className="">
				{
					this.state.checkedOption.values.map( item => `${item} `)
				}
			</div>
			<button className="" type="button" onClick={this.confirmHandle}>確定屬性Value</button>
		</div>
		{/* 屬性選項 */}
		<div className="">
			<div className="">
				{
					this.state.isConfirm ? null :
					this.state.subOption.map( (item,index)=>
						<label className="radio-inline" key={item + index} onChange={this.checkedHandle}>
							<input type="checkbox" name={this.state.attrName} value={item}/>
							{item}
						</label>
					)
				}
			</div>
		 </div>
	</div>
	)
	}
}

export default AttrShowbox;