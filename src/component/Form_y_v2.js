import React, { Component } from 'react'

import Selects from './Selects.js'
import Select, {Creatable} from 'react-select'
import 'react-select/dist/react-select.css'


// data
// api
class yahoo extends Component {
  constructor(){
    super()
    this.state = {
      attrName: '',
      attrValue: []
    }

    this.handleComposedAttrName = this.handleComposedAttrName.bind(this)
    this.handleComposedAttrValue = this.handleComposedAttrValue.bind(this)
  }

  handleComposedAttrName(attrName){
    this.setState({attrName}, function(){console.log(this.state)})
  }

  handleComposedAttrValue(attrValue){
    this.setState({attrValue}, function(){console.log(this.state)})
  }

  render () {
    return (
      <div>
        <div className="attrBox-container" >
          <label className="attrBox-col-left">第{this.props.index + 1}種屬性</label>
          <div className="attrBox-col-right">
            <Select name="attrName" value={this.state.attrName} options={[
                {value: 0, label: 'color'},
                {value: 1, label: 'shape'},
                {value: 2, label: 'size'},
                {value: 2, label: 'package'}]} simpleValue onChange={this.handleComposedAttrName} />
          </div>
        </div>

        {/* TODO: radio */}

        <div className="attrBox-container">
          <div className="attrBox-col-left"></div>
          <div className="attrBox-col-right">
            <Select name="attrName" value={this.state.attrValue} multi options={[
                  {value: 'Black', label: 'Black'},
                  {value: 'White', label: 'White'},
                  {value: 'Pink', label: 'Pink'},
                  {value: 'Green', label: 'Green'}]} simpleValue onChange={this.handleComposedAttrValue} />
          </div>
        </div>

        <div>
          <div className="attr-thead">
            <div className="attr-row">
              <div role="cell">屬性名稱</div>
              <div role="cell">修改名稱</div>
              <div role="cell">修改名稱</div>
            </div>
          </div>
          <div role="tbody">
            <div className="attr-row">
            </div>
          </div>
        </div>


        {/* 已選項目呈現 */}
        {/* <div className="" >
          <div className="">
            {
              this.state.checkedOption.values.map( item => `${item} `)
            }
          </div>
          <button className="" type="button" onClick={this.confirmHandle}>確定屬性Value</button>
        </div> */}
        {/* 屬性選項 */}
        {/* <div className="">
          <div className="">
            {
              this.state.isConfirm ? null :
              this.state.subOption.map( (item,index)=>
                <label className="radio-inline" key={item + index} onChange={this.checkedHandle}>
                  <input type="checkbox" name={this.state.attrName} value={item}/>
                  {item}
                </label>
              )
            }
          </div>
        </div> */}
      </div>
    )
  }
}

export default yahoo