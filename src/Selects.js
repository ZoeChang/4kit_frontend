import React, { Component } from 'react';

// input select_arr = [{content: xxx, value: xxx},{content: xxx, value: xxx}]

class Selects extends Component {
    collection(){
        var result = this.props.select_arr;

        if ( result && result.length != 0 && result[0] != undefined ){
            if(result[0].value != "initselect"){
                result.unshift({content: "請選擇", value: "initselect"});
            }    
        };
        
        return result;

    }
    
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