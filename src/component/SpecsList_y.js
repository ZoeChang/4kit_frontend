import React, { Component } from 'react';
// BS Component
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

// my Componoent
import Selects from './Selects.js';

// props:
// api

class Category1 extends Component {
	// 設定state初始值
	constructor(props) {
        super(props);

    }

    

    // 這個函式需要回傳一個布林值，當元件判斷是否需要更新 DOM 時會被觸發。
    // 比較 this.props，this.state，nextProps，nextState 來決定是否需要更新，回傳 false 則會跳過此次觸發不更新
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.category_sub !== this.props.category_sub;
        console.log("in");
    }

	render(){
    return(
        
        <FormGroup controlId="Spec" onChange={this.props.onChange} >
            <ControlLabel>請選擇規格表</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                <Selects select_arr={this.props.category_sub} />
            </FormControl>
        </FormGroup>



    );
	}
}

export default Category1;