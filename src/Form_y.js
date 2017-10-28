import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';



// my Component
import Selects from './Selects.js';
import Categories from './Category1_y.js';
import Spec from './Spec_y.js';
import UploadImages from './UploadImages.js';
import ComplexedRadio from './ComplexedRadio.js';


var apibs = `http://localhost:8888/4kit_backend/public/4kit`;
var apiRich = `http://172.20.10.12:8888/4kit/4kit_backend/public/4kit`;
var apiItemPage = apibs + `/y/ItemPage`;
var apiMerchandise = apibs + `/y/Merchandise`;
var apiSubItemPage = apibs + `/y/SubItemPage/`;
var postProposal = apibs + `/y/Proposal`;

function FieldGroup({ id, label, help, inputRef, FormGroupClass, ...props }) {
	return (
	<FormGroup controlId={id} bsClass={FormGroupClass}>
		<ControlLabel>{label}</ControlLabel>
		<FormControl {...props} inputRef={inputRef}/>
		{help && <HelpBlock>{help}</HelpBlock>}
	</FormGroup>
	);
}

// 保固期限選單
const preservedays = [{content: "無", value:0},
				{content: "1個月", value:30},
				{content: "3個月", value:90},
				{content: "6個月", value:180},
				{content: "9個月", value:270},
				{content: "1年", value:365},
				{content: "2年", value:730},
				{content: "3年", value:1095},
				{content: "終身永久", value:99999},
				{content: "其他", value:888}];
// 保固範圍選單
const warrantyrange = [{content: "無", value:1},
				{content: "新品瑕疵", value:2},
				{content: "產品故障", value:3},
				{content: "其他", value:4}];

class yahoo extends Component {
	// 設定state初始值: 紀錄下拉式選單選項
	constructor(props) {
		const today = new Date().toLocaleDateString().replace(/\//g,"-");
		const nextday = new Date(2017, 11, 1).toLocaleDateString().replace(/\//g,"-");
		super(props);

        this.state = {
			subValue: 0,
			ItemPageProposal: {
				proposalDueDate: today,
				productCategoryId: 2674,
				itemCategoryId: 2674,
				// startdate: today,
				// enddate: nextday,
			},
			// Merchandise: {
			// 	cluster: {
			// 		id:0,
			// 		firstLayerAttr: {
			// 			name: "顏色",
			// 			values: [ ["紅色系", "賣場顯示名稱-紅色系"], "黑色系" ]
			// 		},
			// 		secondLayerAttr: {
			// 			name: "材質",
			// 			values: [ ["合金", "賣場顯示名稱-合金" ],"塑膠" ]
			// 		},
			// 		attrs: [
			// 			{
			// 				name: "品牌",
			// 				values: [ "Amuzinc 酷比樂", "INTEX" ]
			// 			}, 
			// 			{
			// 				name: "類型",
			// 				values: [ "嬰幼兒玩具", "一般玩具" ]
			// 			},{}
			// 		],
			// 		otherattrs: [ 
			// 			{
			// 				name: "其他屬性",
			// 				value: "其他屬性值"
			// 			},{}
			// 		]
			// 	},
			// 	merchandises: [
			// 		{
			// 			quantity: 10,
			// 			imgagegroup: 1,
			// 			pn: "判官阿一的料號",
			// 			barcode: "判官阿一的國際條碼",
			// 			firstlayerclusterattrvalue: "紅色系",
			// 			secondlayerclusterattrvalue: "合金"
			// 		}, 
			// 		{
			// 			quantity: 10,
			// 			imgagegroup:2,
			// 			pn: "判官阿一的料號",
			// 			barcode: "判官阿一的國際條碼",
			// 			firstlayerclusterattrvalue: "黑色系",
			// 			secondlayerclusterattrvalue: "合金"
			// 		}
			// 	],
			// 	warranty: {
			// 		period: "其他",
			// 		scope: "其他",
			// 		perioddesc: "僅限非人為損壞",
			// 		scopedesc: "僅限台灣地區",
			// 		desc: "範例保固整段描述說明", 
			// 		listdesc: [ "第一段保固說明", "第二段保固說明" ]
			// 	},
			// 	images: {
			// 		1: [ 
			// 			{
			// 				name: "1-1000.jpg",
			// 				order: 1 
			// 			},
			// 			{
			// 				name: "2-1000.jpg",
			// 				order: 2
			// 			}, 
			// 			{
			// 				name: "3-1000.jpg",
			// 				order: 3 
			// 			}
			// 		],
			// 		2: [
			// 			{
			// 				name: "1-1000.jpg",
			// 				order: 1
			// 			}
			// 		]
			// 	},
			// 	copywriter: [
			// 		{
			// 			"title": "特別推薦標題 1",
			// 			"desc": "特別推薦整段描述 1",
			// 			"listdesc": [ "特別推薦條列描述 1-1", "特別推薦條列描述 1-2"],
			// 			"imagesrc": "1-400.jpg",
			// 			"imagealign": "Center",
			// 			"layout": 0
			// 		},{
			// 			"title": "特別推薦標題 2",
			// 			"titlestlye": {
			// 				"Align": "center",
			// 				"Color": "#ff0000",
			// 				"Size": "16pt",
			// 				"IsBold": true
			// 			},
			// 			"desc": "特別推薦整段描述 2",
			// 			"listdesc": [ "特別推薦條列描述 2-1", "特別推薦條列描述 2-2" ],
			// 			"descstyle": {
			// 				"Align": "Left",
			// 				"Color": "#cc0099",
			// 				"Size": "18pt",
			// 				"IsBold": false
			// 			},
			// 			"imagesrc": "1-200.jpg",
			// 			"imagealign": 2,
			// 			"layout": 0
			// 		}
			// 	]
			// },

			Material: {},

			Pictures:[{preview:0}]
		};

		// handler
		this.ItemPageProposalHandle = this.ItemPageProposalHandle.bind(this);
		this.MerchandiseHandle = this.MerchandiseHandle.bind(this);
		this.postItemPageProposal = this.postItemPageProposal.bind(this);
		this.submitForm = this.submitForm.bind(this);
	
	}

	isNumeric(num){
		return !isNaN(+num);
	}

	// for 8.1.4 
	ItemPageProposalHandle(e) {
		var categoryName = e.target.name;
		var categoryValue = e.target.value;
		var inputType = e.target.type;

		if (this.isNumeric(categoryValue) ){
			categoryValue = parseInt(categoryValue);
		};

		var change = this.state.ItemPageProposal;

		if ( categoryName === "deliveryinfo" ){

			if (inputType == "radio"){
				change[categoryName] = {
					type: categoryValue
				}
			} else {
				var id =  e.target.id;
				change[categoryName][id] = categoryValue

			}
			

		} else {
			change[categoryName] = categoryValue;
		}

		this.setState({ ItemPageProposal: change} );

		if(e.target.name === "proposeSub" ){
			this.setState({subValue: e.target.value});
		}

		console.log(this.state.ItemPageProposal)
	}

	// 8.1.4 submit
	postItemPageProposal(){
		var data = {"proposalDueDate":"2017-10-24","productCategoryId":2674,"itemCategoryId":2674,"price":1000,"cost":100,"safetystock":10};
		var form = JSON.stringify ( data );
		console.log(form);
		var myHeaders = new Headers({'Content-Type': 'application/json',});
		var myInit = { method: 'POST',
						body: form };
		var myRequest = new Request(postProposal, myInit);
		

		// var form =  new FormData();
		// form.append("json", JSON.stringify ( this.state.ItemPageProposal ));
		// console.log(JSON.stringify ( this.state.ItemPageProposal ))
		// console.log(form);

		// fetch url from props
		fetch( myRequest ).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(function(data) {
			// data 才是實際的 JSON 資料

			console.log(data);

		});
		// .catch(function(error) {
		// 	return error.response.json();
		// }).then(function(errorData){
		// // errorData 裡面才是實際的 JSON 資料
		// });

	}

	// for 8.1.7
	MerchandiseHandle(e) {
		var change = { "Merchandise": {} };
		change.Merchandise[e.target.name] = e.target.value;
		this.setState(change,function(){console.log(this.state.Merchandise)});
		console.log(e);
	}

	// 8.1.7 submit
	postMerchandise(){
		console.log(this.state.Merchandise);
	}

	submitForm(e){
		e.preventDefault();
		console.log(this.state);
		console.log(this);

	}

	render() {
	return (
		<div className="form">

			<h3>以下是8.1.7</h3>
			<h6>cluster</h6>
			<h6>商品規格表</h6>
			<Spec api={apiSubItemPage} sub={this.state.subValue} onChange={this.MerchandiseHandle}/>
			<form>
				
				
				<h6>merchandises</h6>
				<h6>warranty</h6>
				<h6>imageGroups</h6>
				<h6>copywriter</h6>

				<FormGroup controlId="Preservedays" onChange={this.ItemPageProposalHandle}>
					<ControlLabel>保固期限</ControlLabel>
					<FormControl componentClass="select" placeholder="select" name="preservedays">
						<Selects select_arr={preservedays} />
					</FormControl>
				</FormGroup>
				<FormGroup controlId="Warrantyrange">
					<ControlLabel>保固範圍</ControlLabel>
					<FormControl componentClass="select" placeholder="select">
						<Selects select_arr={warrantyrange} />
					</FormControl>
				</FormGroup>
				
			</form>
			
			<br/>
			<h6>商品圖上傳</h6>	
			<form>
				<UploadImages />
			</form>
			
			<br/>
			<h3>以上是8.1.7</h3>
			<br/>




			<h3>8.1.4</h3>
			<form onSubmit={this.submitForm}>
				<Button type="submit">
				Submit
				</Button>
				{/* <FieldGroup
				id="Proposer"
				type="text"
				label="提案人"
				placeholder="請輸入中文全名"
				/> */}

				<FormGroup controlId="Subname" onChange={this.ItemPageProposalHandle}>
					<ControlLabel>提案站別 / 對象</ControlLabel>
					<Categories api={apiItemPage} />
				</FormGroup>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>配送方式</ControlLabel>
					{' '}
					<Radio name="deliverType" inline value="0">
						宅配
					</Radio>
					{' '}
					<Radio name="deliverType" inline value="1">
						快速到貨商品
					</Radio>
					{' '}
					<Radio name="deliverType" inline value="2">
						直店配送
					</Radio>
					{' '}
					<Radio name="deliverType" inline value="3">
						ESD
					</Radio>
				</FormGroup>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>我的商品有規格</ControlLabel>
					{' '}
					<Radio name="merchandiseSpecType" inline value={0} >
						無
					</Radio>
					{' '}
					<Radio name="merchandiseSpecType" inline value={1}>
						一層
					</Radio>
					{' '}
					<Radio name="merchandiseSpecType" inline value={2}>
						兩層
					</Radio>
				</FormGroup>

				<FieldGroup
				id="Proposer"
				type="text"
				label="賣場名稱"
				name="name"
				placeholder="最多45個字元"
				onChange={this.ItemPageProposalHandle}
				inputRef = {(input) => this.inputName = input }
				/>

				<FieldGroup
				componentClass="textarea"
				id="CategoryDesc"
				label="簡短說明"
				name="desc"
				placeholder="最多100個字元"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="CategoryTitle"
				type="text"
				label="特色標題"
				name="title"
				placeholder="特色標題"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="CategoryBrand"
				type="text"
				label="品牌"
				name="brand"
				placeholder="品牌"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="CategoryModel"
				type="text"
				label="商品型號"
				name="model"
				placeholder="商品型號"
				onChange={this.ItemPageProposalHandle}
				/>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>商品級別</ControlLabel>
					{' '}
					<Radio name="class" inline value={1}>
						無級別
					</Radio>
					{' '}
					<Radio name="class" inline value={4}>
						普級
					</Radio>
					{' '}
					<Radio name="class" inline value={5}>
						保護級
					</Radio>
					{' '}
					<Radio name="class" inline value={3}>
						輔導級 12+
					</Radio>
					{' '}
					<Radio name="class" inline value={4}>
						輔導級 15+
					</Radio>
					{' '}
					<Radio name="class" inline value={2}>
						限制級
					</Radio>
					{' '}
					<Radio name="class" inline value={6}>
						情趣商品
					</Radio>
				</FormGroup>

				{/* TODO: 複合式選單 onchange要另外處理*/}
				<ComplexedRadio chagnehandle={this.ItemPageProposalHandle}/>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>開始時間</ControlLabel>
					{' '}
					<input type="text" name="startdate" placeholder="yyyy-mm-dd" id="startdate" className="form-control mdtextarea" />
				</FormGroup>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>結束時間</ControlLabel>
					{' '}
					<input type="text" name="enddate" placeholder="yyyy-mm-dd" id="enddate" className="form-control mdtextarea" />
				</FormGroup>

				<FieldGroup
				id="Suggestedprice"
				type="text"
				label="廠商建議價"
				name="suggestedprice"
				placeholder="廠商建議價"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="Price"
				type="text"
				label="購物中心售價"
				name="price"
				placeholder="購物中心售價"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="Cost"
				type="text"
				label="成本(含稅＋運費)"
				name="cost"
				placeholder="成本"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="Safetystock"
				type="text"
				label="安全庫存量"
				name="safetystock"
				placeholder="安全庫存量"
				onChange={this.ItemPageProposalHandle}
				/>

				<FieldGroup
				id="Purchaselimit"
				type="text"
				label="限購數量"
				name="purchaselimit"
				placeholder="限購數量"
				onChange={this.ItemPageProposalHandle}
				/>


			</form>
			<br/>
			<h3>以上是8.1.4</h3>
			<br/>
			<br/>

		</div>
	);
	}
}

export default yahoo;