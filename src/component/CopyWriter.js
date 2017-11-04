import React, { Component } from 'react';

class ListDescCell extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            colorActive: [ "", "colorActive", "", "", "", "", ""],
            textSizeActive: ["", "", "", "textSizeActive", ""],
            CopywriterItem: {
                title: "",
                titlestlye: {
                    Align: "",
                    Color: "",
                    Size: "",
                    IsBold: true,
                    
                },
                desc: "",
                listdesc: "",
                descstyle: "",
                layout: 0
            }
		}

        this.colorClick = this.colorClick.bind(this);
        this.textSizeClick = this.textSizeClick.bind(this);
        this.IsBoldCheck = this.IsBoldCheck.bind(this);
    }

    textSizeClick(e) {
        var index = e.target.id.split("_")[0];
        var size = e.target.id.split("_")[1];

        var obj_state = this.state;
        obj_state.textSizeActive = ["", "", "", "", ""];
        obj_state.textSizeActive[index] = "textSizeActive";
        obj_state.CopywriterItem.titlestlye.Size = `${size}pt`;

        this.setState( obj_state , function(){console.log(this.state)} );
    }

    
    colorClick(e){
        var colorIndex = e.target.id.split("_")[0];
        var colorHEX = e.target.id.split("_")[1];

        var obj_state = this.state;
        obj_state.colorActive = [ "", "", "", "", "", "", ""];
        obj_state.colorActive[colorIndex] = "colorActive";
        obj_state.CopywriterItem.titlestlye.Color = `#${colorHEX}`;

        this.setState( obj_state , function(){console.log(this.state)} );
    }

    IsBoldCheck(e){
        var isBold = e.target.checked;
        var obj_state = this.state;

        obj_state.CopywriterItem.IsBold = isBold;

        this.setState( obj_state , function(){console.log(this.state)} );
    }

    render() {
    return(
    <div>
        <h6>第{this.props.index}段</h6>
        <div className="form-group" >
            <label htmlFor="listdesc" className="col-sm-3 control-label">標題</label>
            <div className="col-sm-3">
                <input type="text" name="listdesc_0" id="listdesc" className="form-control" onChange={this.props.onChange}/>
            </div>
        </div>
        <div className="form-group" >
            <div className="col-sm-3 col-sm-offset-3">
                <span className={`square green ${this.state.colorActive[0]}`} onClick={this.colorClick} id="0_669900"></span>
                <span className={`square blue ${this.state.colorActive[1]}`} onClick={this.colorClick} id="1_0000cc"></span>
                <span className={`square red ${this.state.colorActive[2]}`} onClick={this.colorClick} id="2_ff0000"></span>
                <span className={`square gray ${this.state.colorActive[3]}`} onClick={this.colorClick} id="3_999999"></span>
                <span className={`square purple ${this.state.colorActive[4]}`} onClick={this.colorClick} id="4_cc0099"></span>
                <span className={`square brown ${this.state.colorActive[5]}`} onClick={this.colorClick} id="5_996633"></span>
                <span className={`square pink ${this.state.colorActive[6]}`} onClick={this.colorClick} id="6_fa6b81"></span>
            </div>
            <div className="col-sm-3">
                <span className={`textSize ${this.state.textSizeActive[0]}`} onClick={this.textSizeClick} id="0_12">12</span>
                <span className={`textSize textSize-14 ${this.state.textSizeActive[1]}`} onClick={this.textSizeClick} id="1_14">14</span>
                <span className={`textSize textSize-16 ${this.state.textSizeActive[2]}`} onClick={this.textSizeClick} id="2_16">16</span>
                <span className={`textSize textSize-18 ${this.state.textSizeActive[3]}`} onClick={this.textSizeClick} id="3_18">18</span>
                <span className={`textSize textSize-20 ${this.state.textSizeActive[4]}`} onClick={this.textSizeClick} id="4_20">20</span>
            </div>
            <div className="col-sm-2">
                <input type="checkbox" name="IsBold" onChange={this.IsBoldCheck}/>粗體<br/>
            </div>

        </div>   
        <div className="form-group" >
            <label htmlFor="listdesc" className="col-sm-3 control-label">整段描述</label>
            <div className="col-sm-7">
                <textarea name="listdesc_0" id="listdesc" className="form-control" onChange={this.props.onChange}/>
            </div>
        </div>
        <div className="form-group" >
            <label htmlFor="listdesc" className="col-sm-3 control-label">條列描述</label>
            <div className="col-sm-7">
                1.<input type="text" name="listdesc_0" id="listdesc" className="form-control" onChange={this.props.onChange}/>
            </div>
            <div className="col-sm-7 col-sm-offset-3">
                2.<input name="listdesc_1" id="listdesc" className="form-control" onChange={this.props.onChange} />
            </div>
            <div className="col-sm-7 col-sm-offset-3">
                3.<input name="listdesc_2" id="listdesc" className="form-control" onChange={this.props.onChange} />
            </div>
            <div className="col-sm-7 col-sm-offset-3">
                4.<input name="listdesc_3" id="listdesc" className="form-control" onChange={this.props.onChange} />
            </div>
        </div>
    </div>
    )
    }


}

class CopyWriter extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            listdescItem:[ 1 ],
            copywriter: [{
                titlestlye: {
                    Align: "",
                    Color: "",
                    Size: "",
                    IsBold: true
                }
            }]
		}

        this.plusClick = this.plusClick.bind(this);
    }

    plusClick(){
        if(this.state.listdescItem.length < 2){
            var change = this.state ;
            change.listdescItem.push(2);
            this.setState(change);
        }
    }

	render() {
    return(
    <div>
        {
            this.state.listdescItem.map((item) => (
                <ListDescCell key={item} index={item}/>
            ))
        }
        <div className="col-sm-1 plusParagraph" onClick={this.plusClick}> 新增段落 </div>
    </div>
    )
    }
	
}

export default CopyWriter;