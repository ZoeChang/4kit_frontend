import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';


// API
import FirstStage from './Category1_y.js';
import Spec from './Spec_y.js';

// MY Component
import Selects from './Selects.js';

var apibs = `http://localhost:8888/4kit_backend/public/4kit`;
var apiItemPage = apibs + `/y/ItemPage`;
var apiMerchandise = apibs + `/y/Merchandise`;
var apiSubItemPage = apibs + `/y/SubItemPage/`;

function FieldGroup({ id, label, help, ...props }) {
	return (
	<FormGroup controlId={id}>
		<ControlLabel>{label}</ControlLabel>
		<FormControl {...props} />
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
        super(props);
        this.state = {
			subValue: 0,
			ItemPageProposal:{},
			Merchandise: {}
		};

		// handler
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.ItemPageProposalHandle = this.ItemPageProposalHandle.bind(this);
		this.MerchandiseHandle = this.MerchandiseHandle.bind(this);
	}

	handleCategoryChange(event) {
		this.setState({subValue: event.target.value});
	}

	// for 8.1.4 
	ItemPageProposalHandle(e) {
		var change = { "ItemPageProposal": {} };
		change.ItemPageProposal[e.target.name] = e.target.value;
		this.setState(change,function(){console.log(this.state.ItemPageProposal)});
	}

	// for 8.1.7
	MerchandiseHandle(e) {
		var change = { "Merchandise": {} };
		change.Merchandise[e.target.name] = e.target.value;
		this.setState(change,function(){console.log(this.state.Merchandise)});
		console.log(e);
	}

	render() {
	return (
		<div className="form">
			<h3>提案資訊</h3>
			<form>
				<FieldGroup
				id="Proposer"
				type="text"
				label="提案人"
				placeholder="請輸入中文全名"
				/>

				<FormGroup controlId="Subname" onChange={this.handleCategoryChange}>
					<ControlLabel>提案站別 / 對象</ControlLabel>
					<FirstStage api={apiItemPage} />
				</FormGroup>

				<p>缺 提案廠商 審核提案有效期限(日歷)</p>

			</form>
			<br/>
			<h3>賣場基本資料</h3>
			<form>
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
					<Radio name="merchandiseSpecType" inline value="0">
						無
					</Radio>
					{' '}
					<Radio name="merchandiseSpecType" inline value="1">
						一層
					</Radio>
					{' '}
					<Radio name="merchandiseSpecType" inline value="2">
						兩層
					</Radio>
				</FormGroup>
				<p>選擇一或兩層屬性時 請於下格步驟填寫商品資訊 有API？</p>

				<FormGroup>
					<ControlLabel>主件新增方式</ControlLabel>
					{' '}
					<Radio name="radioGroup" inline checked readOnly>
						新增主件商品
					</Radio>
				</FormGroup>

				<FieldGroup
				id="Proposer"
				type="text"
				label="賣場名稱"
				name="name"
				placeholder="最多45個字元"
				onChange={this.ItemPageProposalHandle}
				/>

				<h6>賣場網址</h6>

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
					<Radio name="class" inline value="1">
						無級別
					</Radio>
					{' '}
					<Radio name="class" inline value="4">
						普級
					</Radio>
					{' '}
					<Radio name="class" inline value="5">
						保護級
					</Radio>
					{' '}
					<Radio name="class" inline value="3">
						輔導級 12+
					</Radio>
					{' '}
					<Radio name="class" inline value="4">
						輔導級 15+
					</Radio>
					{' '}
					<Radio name="class" inline value="2">
						限制級
					</Radio>
					{' '}
					<Radio name="class" inline value="6">
						情趣商品
					</Radio>
				</FormGroup>

				<FormGroup onChange={this.ItemPageProposalHandle}>
					<ControlLabel>特殊交貨期</ControlLabel>
					{' '}
					<Radio name="deliveryinfo" inline value="0">
						正常交貨期
					</Radio>
					{' '}
					<Radio name="deliveryinfo" inline value="1">
						預購商品 ＋ Calender
					</Radio>
					{' '}
					<Radio name="deliveryinfo" inline value="2">
						客製化商品 ＋ 輸入天數
					</Radio>
					{' '}
					<Radio name="deliveryinfo" inline value="3">
						需與顧客約定送貨日
					</Radio>
				</FormGroup>

				<FormGroup>
					<ControlLabel>開始時間</ControlLabel>
					<div>Calender＋時間</div>
				</FormGroup>

				<FormGroup>
					<ControlLabel>結束時間</ControlLabel>
					<div>Calender＋時間</div>
				</FormGroup>
			</form>
			<br/>
			<h3>賣場價格及備貨數量</h3>
			<form>
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
			<h3>商品保證</h3>
			<form>
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
			<h3>商品規格表</h3>
			<Spec api={apiSubItemPage} sub={this.state.subValue} onChange={this.MerchandiseHandle}/>
			<br/>
			<h1>test</h1>
			<form>
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