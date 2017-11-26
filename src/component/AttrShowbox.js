import React, { Component } from 'react';

import Selects from './Selects.js';


class AttrShowbox extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            attrNameSelect:[],
            firstAttr: "",
            firstAttrChild:[],
            firstAttrChecked:{
                name:"",
                values:[]
            },
            checkedAttrValue: false
        }
        
        this.getFirstAttr = this.getFirstAttr.bind(this)
        this.checkedHandle = this.checkedHandle.bind(this)
        this.confirmAttrValue = this.confirmAttrValue.bind(this)
        // this.confirmFirstAttrs = this.confirmFirstAttrs.bind(this)

    }

    // TODO: handle function 加Handle
    // TODO: rename firstXXX
    // TODO: key componentName_arr_val_index in Select component add key: ""

    // 取得選取的屬性(下拉式選單)
    getFirstAttr(e){
        var obj_state = this.state
        var attrName = e.target.value

        // 清除之前的屬性
        obj_state.firstAttrChild = []

        //  清空已勾選的屬性選項
        obj_state.firstAttrChecked = {
            name:"",
            values:[]
        }

        obj_state.firstAttr = attrName

        obj_state.firstAttrChild = this.props.allSelects.find(function(item){
            return item.name === attrName
        }).values

        this.setState(obj_state)

    }

    // 把checked選項show出來
    checkedHandle(e){
        var obj_state = this.state;
        var inputName = e.target.name;
        var inputVal = e.target.value;
        var inputChecked = e.target.checked;

        if (inputChecked) {
            obj_state.firstAttrChecked.values.push(inputVal);
        } else {
            obj_state.firstAttrChecked.values = obj_state.firstAttrChecked.values.filter( word => word !== inputVal );
        }

        this.setState(obj_state);

    }


    // 取得所有屬性選項
    getAttrNameSelects(attrs){
        var obj_state = this.state;
        var arr_selects = [];

        attrs.map( (item) => 
            arr_selects.push( { content: item.name, value: item.name } )
        )

        obj_state.attrNameSelect = arr_selects;

        //  清空已勾選的屬性選項
        obj_state.firstAttrChecked = {
            name:"",
            values:[]
        }

        // 清除之前的屬性
        obj_state.firstAttrChild = []

        this.setState(obj_state);
    }

    // 換規格表時
    componentWillReceiveProps(nextProps){
        if (this.props.allSelects !== nextProps.allSelects) {
            //  更換下拉式選單的選項
            this.getAttrNameSelects(nextProps.allSelects);
           
        }
    }

    confirmAttrValue(){
        var obj_state = this.state
        obj_state.checkedAttrValue = true
        this.setState(obj_state)
        this.props.attrValueHandle( this.state.firstAttrChecked.values , this.props.index )
    }

    render(){
    return(
    <div> 
        <div className="container" >
            <label htmlFor="title" className="col-sm-3">第{this.props.index + 1}層屬性</label>
            <div className="col-sm-2">
                <select name="firstAttr" onChange={this.getFirstAttr}>
                    <Selects select_arr={this.state.attrNameSelect} />   
                </select>               
            </div>
        </div>
        {/* 已選項目呈現 */}
        <div className="container" >
            <div className="col-sm-6 col-sm-offset-3">
                {
                    this.state.firstAttrChecked.values.map( item => `${item} `)
                }
            </div>
            <button className="" type="button" onClick={this.confirmAttrValue}>確定屬性Value</button>
        </div>
        {/* 屬性選項 */}
        <div className="container">
            <div className="col-sm-9 col-sm-offset-3">
                {
                    this.state.checkedAttrValue ? null : 
                    this.state.firstAttrChild.map( (item,index)=> 
                        <label className="radio-inline" key={item + 'index'} onChange={this.checkedHandle}>
                            <input type="checkbox" name={this.state.firstAttr} value={item}/>
                            {item}
                        </label>
                    )
                }  
            </div>
         </div>
    </div>
    )
    }
}

export default AttrShowbox;