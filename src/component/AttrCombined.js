import React, { Component } from 'react';

import Selects from './Selects.js';
import AttrShowbox from './AttrShowbox.js';

// props
// attrValues: rename後的value   { 0: []  , 1: [] }
class AttrsCombinedTalbe extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = this.initData()

        this.deleteRow = this.deleteRow.bind(this)
        this.submitTable = this.submitTable.bind(this)

    }

    deleteRow(firstAttr, secondindex, e){
        var obj_state = this.state
        var arr_new = obj_state.valueGroup[firstAttr].filter( (item,index) => index !== secondindex )

        obj_state.valueGroup[firstAttr] = arr_new

        this.setState( obj_state )
    }

    // convert to number
    isNumeric(num){
        if (!isNaN(+num)){
            return parseInt(num)
        } else {
            return num
        }
	}

    inputHadle( firstAttrVal, subIndex, column, e ){
        var obj_state = this.state
        var inputVal = this.isNumeric(e.target.value)

        obj_state.valueGroup[firstAttrVal][subIndex][column] = inputVal

        this.setState(obj_state, function(){console.log(this.state)})

    }

    submitTable(){
        var obj_state = this.state
        var allGroup = this.state.valueGroup
        var arr_merchandises = []

        Object.keys( allGroup ).map( firstAttr => {
            if( allGroup[firstAttr].length > 0 ){
                allGroup[firstAttr].map( item =>{
                    arr_merchandises.push( item )
                })   
            }

        })

        obj_state.merchandises = arr_merchandises

        this.setState( obj_state, function(){  this.props.finishHandle(this.state.merchandises) ; })

    }

    // html for second Attr table row
    AttrRow(secondlayerclusterattrvalue, firstAttrVal, subIndex){
        return(
            <div className="table_second_row" key={secondlayerclusterattrvalue + firstAttrVal}>
                <div>{secondlayerclusterattrvalue}</div>
                <div><input type="text" placeholder="5" onChange={this.inputHadle.bind(this, firstAttrVal, subIndex, "quantity" )} /></div>
                <div><input type="text" placeholder="SKU-料號" onChange={this.inputHadle.bind(this, firstAttrVal, subIndex, "pn" )} /></div>
                <div><button type="button" onClick={ this.deleteRow.bind(this, firstAttrVal, subIndex) }>刪除</button></div>
            </div>
        )
    }

    // 初始化 this.state
    initData(){
        // 整理資料
        // firstAttr: []
        // valueGroup: {  value1:[ {val1 second1},{}... ], value2:[ {},{}... ], value3:[] .... }
        var obj_state = { valueGroup: {}, firstAttr: [], merchandises:[] }

        obj_state.firstAttr = this.props.attrValues["0"]

        this.props.attrValues["0"].map( (item,index) => {
            // obj_state.valueGroup[item] = this.props.attrValues["1"]

            let arr_item = []

            this.props.attrValues["1"].map( (subitem,index) => {
                let obj_merchandises = {
                        quantity: 0,
                        pn: "",
                        firstlayerclusterattrvalue: item,
                        secondlayerclusterattrvalue: subitem
                    }

                arr_item.push( obj_merchandises )
            })

            obj_state.valueGroup[item] = arr_item
            
        })

        return obj_state
    }

    render(){
    var _this = this
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

            {
                this.state.firstAttr.map( (firstAttrVal,index) => 
                   <div className="table_row" key={index}>
                        <div className="table_first">{firstAttrVal}</div>

                        <div className="table_second">
                            {
                                _this.state.valueGroup[firstAttrVal].map( (item, subIndex) => 
                                    _this.AttrRow(item.secondlayerclusterattrvalue, firstAttrVal, subIndex)
                                )
                            }
                        </div>

                    </div>
                )
            }
            
            <button type="button" onClick={this.submitTable} >完成填寫</button>

        </div>
        
    )
    }
}

// TODO
class OneAttrTalbe extends Component {
    render(){
    return(
    <div>

    </div>
    )
    }
}

// props
// attrs: 選取的屬性Value
class RenameAttrs extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            attrValues: this.props.attrs,
        }

        this.passVal = this.passVal.bind(this)

    }

    inputHadle( attrIndex, valueIndex, e){
        var inputValue = e.target.value
        var obj_state = this.state

        obj_state.attrValues[attrIndex][valueIndex] = inputValue

        this.setState(obj_state)

    }

    passVal(){
        // get rename Value
        this.props.doCombineHandle(this.state.attrValues)
    }

    render(){
    var AttrRenameCell = []
    var attrs = this.props.attrs
    var _this = this
    
    Object.keys(this.props.attrs).forEach( function(currentValue,index){

        var cell = attrs[currentValue].map( function(item,subindex){
            return(
                <div className="renameTable_row" key={'checkedAttr' + subindex}>
                    <div className="renameTable_cell">{item}</div>
                    <div className="renameTable_cell">
                        <input type="text" defaultValue={item} onChange={ this.inputHadle.bind(this,currentValue,subindex)} name={item}/>
                    </div>
                </div>
                
            );
        },_this)

        AttrRenameCell.push(cell)
        AttrRenameCell.push(<div className="renameTableLine" key={'attrTableLine' + index}></div>)

    })

    return(
    <div>
        <div className="renameTable_row" >
            <div className="renameTable_cell">屬性名稱</div>
            <div className="renameTable_cell">賣場顯示名稱</div>
        </div>

        { AttrRenameCell }

        <button type="button" onClick={this.passVal} >組合</button>
        
    </div>
    )
    }
}

// props
// attr_arr : 提案站別的所有屬性
// Demsion: 有幾個屬性 0 1 2
class MerchandisesArr extends Component {

    constructor(props, context) {
		super(props, context);
		this.state = {
            attrValues: {
                0: [],
                1: []
            },
            renameAttrValues:{},
            showRenameTable: false,
            showCombinedTable: false
        }
        
        this.getCheckedValue = this.getCheckedValue.bind(this)
        this.doRename = this.doRename.bind(this)
        this.doCombine = this.doCombine.bind(this)
        this.fillOutAll = this.fillOutAll.bind(this)
        
    }

    // 取得勾選的屬性值
    getCheckedValue(values,index){
        var obj_state = this.state

        obj_state.attrValues[index] = values

        this.setState(obj_state)
    }

    doRename(){
        var obj_state = this.state

        obj_state.showRenameTable = true

        this.setState(obj_state)

        // TODO: 若是沒有全部填寫完 就無法跳到rename步驟
    }
    

    doCombine(renamed){
        var obj_state = this.state

        obj_state.showRenameTable = false
        obj_state.showCombinedTable = true
        obj_state.renameAttrValues = renamed

        this.setState(obj_state)

    }

    fillOutAll(test){
        var obj_state = this.state

        console.log(test)

        obj_state.showRenameTable = false
        obj_state.showCombinedTable = false

        this.setState(obj_state)
    }

    showTable(){
        if(this.state.renameAttrValues["1"].length > 0){
            return <AttrsCombinedTalbe attrValues={this.state.renameAttrValues} finishHandle={this.fillOutAll} />
        } else {
            return <OneAttrTalbe attrValues={this.state.renameAttrValues}/>
        }
        
    }

	render() {
    var rows = [];
    for (var i = 0; i < this.props.Demsion; i++) {
        rows.push(<AttrShowbox allSelects={this.props.attr_arr} key={i} index={i}  attrValueHandle={this.getCheckedValue} />);
    }
    return(
    <div>
        { rows }

        <div className="container">
            <div className="col-sm-3 col-sm-offset-3">
                <button className="" type="button" onClick={this.doRename}>Go to Rename</button>
            </div>
        </div>

        <div className="container">
            <div className="col-sm-9 col-sm-offset-3">
                {
                    this.state.showRenameTable ? <RenameAttrs attrs={this.state.attrValues} doCombineHandle={this.doCombine}/> : null
                }
            </div>
            
        </div>

        <div className="container">
             <div className="col-sm-9">
                {
                    this.state.showCombinedTable ? this.showTable() : null
                }
             </div>
        </div>

    </div>  
    )
    }
	
}

export default MerchandisesArr;