import React, { Component } from 'react';

// props: select_arr = [{content: xxx, value: xxx},{content: xxx, value: xxx}]

class Selects extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // 選項設定: 第一項為請選擇
    collection(){
        var result = this.props.select_arr;

        if ( result && result.length !== 0 && result[0] !== undefined ){
            if(result[0].value !== "initselect"){
                result.unshift({content: "請選擇", value: "initselect"});
            }    
        };

        return result;

    }

    // // 這個函式需要回傳一個布林值，當元件判斷是否需要更新 DOM 時會被觸發。
    // // 比較 this.props，this.state，nextProps，nextState 來決定是否需要更新，回傳 false 則會跳過此次觸發不更新
    // shouldComponentUpdate(nextProps, nextState){
    //     if (nextProps){
    //         console.log(this.props);
    //         console.log(nextProps);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    render(){
    const selectGroup = this.collection();

    return(
        selectGroup.map( (obj) => 
			<option value={obj.value} key={obj.value}>
				{obj.content}
            </option>
        )
    );
    }
}

export default Selects;