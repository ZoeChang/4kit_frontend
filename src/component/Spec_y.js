import React, { Component } from 'react';

// my Component
import Attr from './Attr_y.js';
import SpecsList from './SpecsList_y.js';
import AttrCombined from './AttrCombined.js';

// Attrs props:
// attr_arr: [{},{},{}...]
class Attrs extends Component {
	constructor(props) {
		super(props);
		this.AttrsHandle = this.AttrsHandle.bind(this);

	}

	AttrsHandle(e) {
		this.props.onChange(e, "cluster_attrs" );
	}

	render(){
    return(
        this.props.attr_arr.map( (obj,index) => 
			// <Attr attr={obj} key={index} onChange={this.AttrsHandle}/>
			<Attr attr={obj} key={index} onChange={this.AttrsHandle}/>

		)
    );
    }
}

// Spec props:
// api
// sub
class Spec extends Component {
	// onchanged handle
	constructor(props) {
        super(props);
        this.state = {
			category_sub: [{content: "請選擇", value: "initselect"}],
			AllArrts: [],
			// 假設 constraint 是單選 1/複選 2
			specAttrs: []
		};

		this.handleSubChange = this.handleSubChange.bind(this);
		
	}

	// 已掛載的元件收到新的 props 時被觸發, 用 this.setState 去改變 state 狀態。
    componentWillReceiveProps(nextProps){
		var _this = this;
		var api = `${nextProps.api}${nextProps.sub}`;

        if ( nextProps.sub !== this.props.sub) {
            // fetch url from props
            fetch( api ,{
                method: 'GET',
            }).then(function(response) {
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
                if (data.status === 200) {
                    var arr_A = data.body.map( (item,index) => ({ content: item.name , value: item.id }) );
					_this.setState({
						category_sub: arr_A,
						AllArrts: data.body
					});
                }
            });
        }
          
	}
 
	// shouldComponentUpdate(nextProps, nextState){
	// 	return nextProps.sub !== this.props.sub;
	// 	console.log("in 2");
	// }

	handleSubChange(event){
		var subID = event.target.value;
		var _this = this;

		this.state.AllArrts.find(dependedAttrs);

		function dependedAttrs(obj_sub, index, array) {
			if (subID === obj_sub.id){
				_this.setState({ specAttrs: obj_sub.attrs }) ;
			}
		}

	}

	

	render() {
	
	console.log()
	return(
		<div>
			<form>
				{/* chooes 商品規格表 */}
				<SpecsList category_sub={this.state.category_sub} onChange={this.handleSubChange} />
			</form>

				{/* 屬性組合 */}
				<AttrCombined attr_arr={this.state.specAttrs} Demsion={this.props.AttrNumnber}/>
			<form>
				{/* show 規格項目 */}
				<Attrs attr_arr={this.state.specAttrs} onChange={this.props.onChange}/>

			</form>
		</div>
		
	);
	}
	
}

export default Spec;