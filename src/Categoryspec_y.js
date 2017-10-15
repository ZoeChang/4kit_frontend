import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Selects from './Selects.js';

class Categoryspec extends Component {
	// 設定state初始值
	constructor(props) {
        super(props);
        this.state = {
            category_sub: []
        };
	}
	
	// 第一次render完的時候，會執行這個function，mount表示顯示在DOM上(只有第一次被render出來的時候)
	componentDidMount(){

		var _this = this;

		// fetch url from props
		fetch( _this.props.api ,{
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

			_this.setState(function(){
				
				var arr_A = data.body.map( (item,index) => ({ content: item.subname , value: item.sub }) );

				return {
					category_sub: arr_A
				};				
			});

		});
		// .catch(function(error) {
		// 	return error.response.json();
		// }).then(function(errorData){
		// // errorData 裡面才是實際的 JSON 資料
		// });

	}

	render(){
		return(
			<FormControl componentClass="select" placeholder="select">
				<Selects select_arr={this.state.category_sub} />
			</FormControl>
			
		);
	}
}

export default Categoryspec;