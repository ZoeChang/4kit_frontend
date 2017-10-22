import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

// my componoent
import Selects from './Selects.js';

// props:
// api

class Category1 extends Component {
	// 設定state初始值
	constructor(props) {
        super(props);
        this.state = {
            fullApi: this.props.api,
            category_sub: [{content: "請選擇", value: "initselect"}]
        };
    }

    // 已掛載的元件收到新的 props 時被觸發, 用 this.setState 去改變 state 狀態。
    componentWillReceiveProps(nextProps){
        var _this = this;

        if ( nextProps.api !== this.props.api) {
            // fetch url from props
            fetch( nextProps.api ,{
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
                    var arr_A = data.body.map( (item,index) => ({ content: item.id , value: item.id }) );
                    _this.setState({category_sub: arr_A});
                }
            });

            this.setState({fullApi: nextProps.api});
        }
          
    }

    // 這個函式需要回傳一個布林值，當元件判斷是否需要更新 DOM 時會被觸發。
    // 比較 this.props，this.state，nextProps，nextState 來決定是否需要更新，回傳 false 則會跳過此次觸發不更新
    shouldComponentUpdate(nextProps, nextState){
        return nextState.category_sub !== this.state.category_sub;
    }

	render(){
    return(
        
        <FormGroup controlId="Spec">
            <ControlLabel>請選擇規格表</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                <Selects select_arr={this.state.category_sub} />
            </FormControl>
        </FormGroup>



    );
	}
}

export default Category1;