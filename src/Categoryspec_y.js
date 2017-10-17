import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Selects from './Selects.js';

// props:
// api
// sub

class Category1 extends Component {
	// 設定state初始值
	constructor(props) {
        super(props);
        this.state = {
            fullApi: `${this.props.api}${this.props.sub}`,
            category_sub: [{content: "xxx", value: "xxx"},{content: "yyy", value: "yyy"}]
        };
    }

    // 已掛載的元件收到新的 props 時被觸發, 用 this.setState 去改變狀態。
    componentWillReceiveProps(nextProps){
        this.setState({fullApi: `${this.props.api}${nextProps.sub}`})
    }
    
    // 元件確定要更新了，在準備更新前這個方法會被觸發。
    componentWillUpdate(nextProps, nextState){

        var _this = this;

        // fetch url from props
		fetch( _this.state.fullApi ,{
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
            console.log(_this.state.fullApi);
            console.log(data);

            var arr_A = [];

            if (data.status == 200) {
                _this.setState(function(){
                    arr_A = data.body.map( (item,index) => ({ content: item.id , value: item.id }) );
                })
            }

            return {
                category_sub: arr_A
            };		

			console.log(_this.state.category_sub);

		});
		// .catch(function(error) {
		// 	return error.response.json();
		// }).then(function(errorData){
		// // errorData 裡面才是實際的 JSON 資料
		// });
    }

	
	// // 第一次render完的時候，會執行這個function，mount表示顯示在DOM上(只有第一次被render出來的時候)
	// componentDidMount(){

    //     var _this = this;
        
    //     console.log(_this.props.api);
    //     console.log(_this.props.sub);

    //     return null;

	// }

	render(){
        console.log(this.state.category_sub);
		return(
			<FormControl componentClass="select" placeholder="select">
                <option value={111}>
                    {this.props.sub}
                </option>
				{/* <Selects select_arr={this.state.category_sub} /> */}
			</FormControl>
			
		);
	}
}

export default Category1;