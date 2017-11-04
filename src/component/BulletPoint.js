import React, { Component } from 'react';

class BulletPoint extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            count: 0,
            listdesc: [""]
		}
        // this.handleChange = this.handleChange.bind(this);
        this.plusClick = this.plusClick.bind(this);

	}

	// handleChange(e){
    //     this.props.onChange(e);

    //     // var obj_state = this.state;
    //     // var handleIndex = e.target.name.split("_")[1];
    //     // var handleValue = e.target.value;
        
    //     // obj_state.listdesc[handleIndex] = handleValue;

    //     // this.setState( obj_state )
    // }


    
    plusClick(){
        var change = this.state ;
        var count = this.state.count + 1;
        change.count = count;
        change.listdesc.push("");
        this.setState( change );
    }

	render() {
    var points = [];
    for(var i = 0 ; i < this.state.count ; i++ ){
        var name = `listdesc_${i+1}`;
        points.push(
            <div className="col-sm-7 col-sm-offset-3"  key={i}>
                <input name={name} id="listdesc" className="form-control" onChange={this.props.onChange} />
            </div>
        );
    }
    return(
    <div className="form-group">
        <label htmlFor="listdesc" className="col-sm-3 control-label">說明訊息(條列)</label>
        <div className="col-sm-7">
            <input type="text" name="listdesc_0" id="listdesc" className="form-control" onChange={this.props.onChange}/>
        </div>
        <div className="col-sm-2">
            <div className="plus" onClick={this.plusClick}>+</div>
        </div>
        {points}
    </div>
    )
    }
	
}

export default BulletPoint;