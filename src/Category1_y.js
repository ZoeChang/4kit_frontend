import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

class Category1 extends Component {
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
				var arr_A = data.body;
				return {
					category_sub: arr_A
				};
			})

		});
		// .catch(function(error) {
		// 	return error.response.json();
		// }).then(function(errorData){
		// // errorData 裡面才是實際的 JSON 資料
		// });

	}

	render(){
		const selects = this.state.category_sub.map( (s) => 
			<option value={s.sub.toString()} key={s.sub.toString()}>
				{s.subname}
			</option>
		);
		
		return(
			<FormControl componentClass="select" placeholder="select">
				  {selects}  
			</FormControl>
		);
	}
}

export default Category1;