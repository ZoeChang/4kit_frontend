import React, { Component } from 'react';

import Selects from './Selects.js';

class AttrsCombinedTalbe extends Component {
    render(){
    return(
        <div>
            <div className="table_header table_row">
                <div>屬性</div>
                <div>賣場顯示名稱</div>
                <div>備貨數量</div>
                <div>供應商料號</div>
            </div>

            <div className="table_row">
                <div className="table_first">黃色</div>
                <div className="table_second">
                    <div className="table_second_row">
                        <div>S</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>M</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>L</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                    
                </div>
            </div>
            <div className="table_row">
                <div className="table_first">紅色</div>
                <div className="table_second">
                    <div className="table_second_row">
                        <div>S</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>M</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                    <div className="table_second_row">
                        <div>L</div>
                        <input type="text" placeholder="5" />
                        <input type="text" placeholder="SKU-" />
                        <div><button>刪除</button></div>
                    </div>
                </div>
                
            </div>
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
                values:[],
            }
        }
        
        this.firstAttrHandle = this.firstAttrHandle.bind(this);
        this.checkedHandle = this.checkedHandle.bind(this)

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

    firstAttrHandle(e){
        // update firstAttr
        var inputVal = e.target.value;

        var obj_state = this.state;

        obj_state.firstAttr = inputVal;

        // update firstAttrChild
        obj_state.firstAttrChild = this.props.attr_arr.find(isChoosed).values;

        function isChoosed(element, index, array){
            if(element.name === inputVal){
                return element;
            }
        }

        this.setState(obj_state);

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
                <select name="firstAttr" onChange={this.firstAttrHandle}>
                    <Selects select_arr={this.state.firstAttrSelect} /> 
                </select>               
            </div>
            <div>{
                    this.state.firstAttrChecked.values.map( item => `${item} `)
                }</div>
        </div>
         <div className="container" >
             <div className="col-sm-9 col-sm-offset-3">
                 {
                    this.state.firstAttrChild.map( (item,index)=> 
                        <label className="radio-inline" key={index} onChange={this.checkedHandle}>
                            <input type="checkbox" name={this.state.firstAttr} value={item}/>
                            {item}
                        </label>
                    )
                 }  
             </div>
         </div>
         <div>
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