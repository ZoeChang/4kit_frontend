import React, { Component } from 'react';

import Selects from './Selects.js';

class AttrsCombinedTalbe extends Component {
    render(){
    return(
        <div>
            <div className="table_header table_row">
                <div className="table_first">屬性</div>
                <div className="table_second">
                    <div className="table_second_row">
                        <div>賣場顯示名稱</div>
                        <div>備貨數量</div>
                        <div>供應商料號</div>
                        <div></div>
                    </div>
                </div>
                
            </div>

            <div className="table_row">
                <div className="table_first">黃色</div>
                <div className="table_second">
                    <div className="table_second_row">
                        <div>S</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button">刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>M</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button">刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>L</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button">刪除</button></div>
                    </div>
                    
                </div>
            </div>

            <div className="table_row">
                <div className="table_first">紅色</div>
                <div className="table_second">
                    <div className="table_second_row">
                        <div>S</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button" className="combined_btn">刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>M</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button">刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>L</div>
                        <div><input type="text" placeholder="5" /></div>
                        <div><input type="text" placeholder="SKU-" /></div>
                        <div><button type="button">刪除</button></div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
    }
}

class RenameAttrs extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.getRenameValue = this.getRenameValue.bind(this)
        // this.handleInputChange= this.handleInputChange.bind(this)
    }

    handleInputChange(e){
        console.log(e.target)
    }

    getRenameValue(e){
        e.preventDefault()
        alert("Submit button clicked!")
        console.log(e)
        return false;
    }

    render(){
        console.log(this.props.attrs)
    var attrRenameCell = this.props.attrs.map( function(item,index){
            return(
                <div className="renameTable_row" key={index}>
                    <div className="renameTable_cell">{item}</div>
                    <div className="renameTable_cell"><input type="text" defaultValue={item} onChange={this.handleInputChange.bind(this)}/></div>
                </div>
            );
        },this)
    return(
    <div>
        <div className="renameTable_row" >
            <div className="renameTable_cell">屬性名稱</div>
            <div className="renameTable_cell">賣場顯示名稱</div>
        </div>
        { attrRenameCell }
        <button className="col-sm-2" type="button" onClick={this.getRenameValue}>確定</button>
    </div>
    )
    }
}

class Merchandises extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            firstAttrSelect:[],
            firstAttr: "",
            firstAttrChild:[],
            firstAttrChecked:{
                name:"",
                values:[]
            },
            renameFirstAtttr: false
        }
        
        this.getFirstAttr = this.getFirstAttr.bind(this)
        this.checkedHandle = this.checkedHandle.bind(this)
        this.confirmFirstAttrs = this.confirmFirstAttrs.bind(this)

    }

    confirmFirstAttrs(e){
        this.setState({renameFirstAtttr: true})
    }

    checkedHandle(e){
        var obj_state = this.state;
        var inputName = e.target.name;
        var inputVal = e.target.value;
        var inputChecked = e.target.checked;
        console.log(e.target.checked);

        if (inputName !== obj_state.firstAttrChecked.name){
            obj_state.firstAttrChecked.name = inputName;
            obj_state.firstAttrChecked.values = [];
        }

        if (inputChecked) {
            obj_state.firstAttrChecked.values.push(inputVal);
        } else {
            obj_state.firstAttrChecked.values = obj_state.firstAttrChecked.values.filter( word => word !== inputVal );
        }

        this.setState(obj_state);

    }

    getFirstAttr(e){
        // update firstAttr
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.firstAttr = inputVal;

        // update firstAttrChild
        obj_state.firstAttrChild = this.props.attr_arr.find(isChoosed).values;

        // 已選項目歸零
        obj_state.firstAttrChecked = {name:"", values:[]}

        function isChoosed(element, index, array){
            if(element.name === inputVal){
                return element;
            }
        }

        this.setState(obj_state, function(){console.log(this.state)});

    }
    

    getAttrSelect(attrs){
        var obj_state = this.state;
        var arr_selects = [];
        attrs.map( (item) => 
            arr_selects.push( { content: item.name, value: item.name } )
        )

        obj_state.firstAttrSelect = arr_selects;

        this.setState(obj_state);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.attr_arr !== nextProps.attr_arr) {
            this.getAttrSelect(nextProps.attr_arr);
        }
    }

	render() {
        console.log(this.props.Demsion);
    return(
    <div>
        <div className="container" >
            <label htmlFor="title" className="col-sm-3">第{1}層屬性</label>
            <div className="col-sm-2">
                <select name="firstAttr" onChange={this.getFirstAttr}>
                    <Selects select_arr={this.state.firstAttrSelect} /> 
                </select>               
            </div>
        </div>
        {/* 已選項目呈現 */}
        <div className="container" >
            <div className="col-sm-6 col-sm-offset-3">
                {
                    this.state.firstAttrChecked.values.map( item => `${item} `)
                }
                <button className="" type="button" onClick={this.confirmFirstAttrs}>確定</button>
            </div>
        </div>
        {/* 屬性選項 */}
        <div className="container" >
            <div className="col-sm-9 col-sm-offset-3">
                {
                    this.state.renameFirstAtttr ? null :
                    this.state.firstAttrChild.map( (item,index)=> 
                        <label className="radio-inline" key={item} onChange={this.checkedHandle}>
                            <input type="checkbox" name={this.state.firstAttr} value={item}/>
                            {item}
                        </label>
                    )
                }  
            </div>
         </div>
         <div className="container">
            <div className="col-sm-7 col-sm-offset-3">
                { this.state.renameFirstAtttr ? <RenameAttrs attrs={ this.state.firstAttrChecked.values } /> : null }    
            </div>
         </div>
         
         

         <div className="container">
             <div className="col-sm-3">
                 <input type="button" value="組合" />
             </div>
             <div className="col-sm-9">
                 <AttrsCombinedTalbe />
             </div>
         </div>


    </div>  
    )
    }
	
}

export default Merchandises;