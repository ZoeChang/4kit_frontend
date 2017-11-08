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
                    IsBold: false,
                },
                desc: "",
                listdesc: ["", "", "", ""],
                descstyle: {},
                layout: 0
            }
		}

        this.titleHandle = this.titleHandle.bind(this);
        this.colorClick = this.colorClick.bind(this);
        this.textSizeClick = this.textSizeClick.bind(this);
        this.IsBoldCheck = this.IsBoldCheck.bind(this);
        this.descHandle = this.descHandle.bind(this);
        this.listdescHandle = this.listdescHandle.bind(this);
    }

    titleHandle(e){
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.CopywriterItem.title = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });

    }

    textSizeClick(e) {
        var index = e.target.id.split("_")[0];
        var size = e.target.id.split("_")[1];

        var obj_state = this.state;

        // add active class
        obj_state.textSizeActive = ["", "", "", "", ""];
        obj_state.textSizeActive[index] = "textSizeActive";

        // change this.state
        obj_state.CopywriterItem.titlestlye.Size = `${size}pt`;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });

    }
    
    colorClick(e){
        var colorIndex = e.target.id.split("_")[0];
        var colorHEX = e.target.id.split("_")[1];

        var obj_state = this.state;

        // add active class
        obj_state.colorActive = [ "", "", "", "", "", "", ""];
        obj_state.colorActive[colorIndex] = "colorActive";

        // change this.state
        obj_state.CopywriterItem.titlestlye.Color = `#${colorHEX}`;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });
    }

    IsBoldCheck(e){
        var isBold = e.target.checked;
        var obj_state = this.state;

        obj_state.CopywriterItem.titlestlye.IsBold = isBold;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });
    }

    descHandle(e){
        var inputVal = e.target.value;
        var obj_state = this.state;

        obj_state.CopywriterItem.desc = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });

    }

    listdescHandle(e){
        var inputVal = e.target.value;
        var inputIndex = e.target.name.split("_")[1];
        var obj_state = this.state;

        obj_state.CopywriterItem.listdesc[inputIndex] = inputVal;

        this.setState( obj_state , function(){
            this.props.updater(this.state.CopywriterItem, this.props.index);
        });

    }

    render() {
    return(
    <div>
        <h6>第{this.props.index + 1}段</h6>
        <div className="container" >
            <label htmlFor="title" className="col-sm-3">標題</label>
            <div className="col-sm-3">
                <input type="text" name="title" id="title" onChange={this.titleHandle}/>
            </div>
        </div>
        <div className="container" >
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
        <div className="container" >
            <label htmlFor="listdesc" className="col-sm-3">整段描述</label>
            <div className="col-sm-5">
                <textarea name="listdesc_0" id="listdesc" onChange={this.descHandle}/>
            </div>
        </div>
        <div className="container" >
            <label htmlFor="listdesc" className="col-sm-3">條列描述</label>
            <div className="col-sm-5">
                1.<input type="text" name="listdesc_0" onChange={this.listdescHandle}/>
            </div>
            <div className="col-sm-5 col-sm-offset-3">
                2.<input type="text" name="listdesc_1" onChange={this.listdescHandle} />
            </div>
            <div className="col-sm-5 col-sm-offset-3">
                3.<input type="text" name="listdesc_2" onChange={this.listdescHandle} />
            </div>
            <div className="col-sm-5 col-sm-offset-3">
                4.<input type="text" name="listdesc_3" onChange={this.listdescHandle} />
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
            ItemNumber: [0],
            copywriter: [{}]
		}

        this.plusClick = this.plusClick.bind(this);
        // this.itemHandle = this.itemHandle.bind(this);
    }

    // itemHandle(e,item){
    //     var change = this.state;
    //     change.copywriter[item] = {index: item}
    //     this.setState(change, function(){console.log(this.state)});
    // }

    plusClick(){
        if(this.state.ItemNumber.length < 2){
            var change = this.state ;
            change.ItemNumber.push(1);
            change.copywriter.push({});
            this.setState(change);
        }
    }

	render() {
    return(
    <div>
        {
            this.state.ItemNumber.map((item) => (
                <ListDescCell key={item} index={item} updater={this.props.updater}/>
            ))
        }
        <div className="col-sm-1 plusParagraph" onClick={this.plusClick}> 新增段落 </div>
    </div>
    )
    }
	
}

export default CopyWriter;