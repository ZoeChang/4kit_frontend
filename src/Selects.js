import React, { Component } from 'react';

class Selects extends Component {
    render(){
    return(
        this.props.select_arr.map( (obj) => 
			<option value={obj.value} key={obj.value}>
				{obj.content}
            </option>
        )
    );
    }
}

export default Selects;