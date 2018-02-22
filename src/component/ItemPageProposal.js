import React, { Component } from 'react'
import update from 'immutability-helper'
import moment from 'moment'

import ComplexedRadio from './ComplexedRadio.js'
import { DropdownSelectField, RadioField, InputField, TextareaField, DateField } from './FormField.js'

class ItemPageProposal extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.data

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleDropdownSelected = this.handleDropdownSelected.bind(this)
    this.handleDeliveryInfo = this.handleDeliveryInfo.bind(this)

    // handle for 配送方式＆商品規格
    this.handleDeliverType = this.handleDeliverType.bind(this)
    this.handleMerchandiseSpecType = this.handleMerchandiseSpecType.bind(this)
  }

  handleChange (e) {
    this.setState(update(this.state, {
      [e.target.name]: {$set: e.target.value}
    }), () => this.props.onDataChanged(this.state))
  }

  handleDeliveryInfo (deliveryinfo) {
    this.setState({deliveryinfo}, () => this.props.onDataChanged(this.state))
  }

  handleDropdownSelected (proposeSub) {
    this.setState({proposeSub}, () => this.props.onDataChanged(update(this.state, {
      proposeSub: proposeSub => proposeSub.value
    })))
  }

  handleStartDateChange (startdate) {
    this.setState({startdate}, () => this.props.onDataChanged(this.state))
  }

  handleEndDateChange (enddate) {
    this.setState({enddate}, () => this.props.onDataChanged(this.state))
  }

  // handle for 配送方式＆商品規格
  handleDeliverType (val) {
    var deliverType = val
    this.setState({deliverType}, () => this.props.onDataChanged(this.state))
  }

  handleMerchandiseSpecType (val) {
    var merchandiseSpecType = val
    this.setState({merchandiseSpecType}, () => this.props.onDataChanged( this.state))
  }

  render () {
    return (
      <div>
        <DropdownSelectField theader='提案站別 / 對象' value={this.state.proposeSub} options={this.props.categories.map(category => {
          return {
            value: category.value,
            label: category.content}
        })} onChange={this.handleDropdownSelected}
        />

        <DropdownSelectField theader='配送方式' name='deliverType' value={this.state.deliverType} options={[
          {value: 0, label: '宅配'},
          {value: 1, label: '快速到貨商品'},
          {value: 2, label: '直店配送'},
          {value: 3, label: 'ESD'}]} simpleValue onChange={this.handleDeliverType}
        />

        <DropdownSelectField theader='我的商品有規格' name='merchandiseSpecType' value={this.state.merchandiseSpecType} options={[
          {value: 0, label: '無'},
          {value: 1, label: '一層'},
          {value: 2, label: '兩層'}]} simpleValue onChange={this.handleMerchandiseSpecType}
        />

        <InputField
          theader='賣場名稱'
          name='name'
          placeholder='最多45個字元'
          value={this.state.name}
          onChange={this.handleChange}
        />

        <TextareaField
          id='CategoryDesc'
          theader='簡短說明'
          name='desc'
          placeholder='最多100個字元'
          value={this.state.desc}
          onChange={this.handleChange}
        />

        <InputField
          id='CategoryBrand'
          theader='品牌'
          name='brand'
          placeholder='品牌'
          value={this.state.brand}
          onChange={this.handleChange}
        />

        <InputField
          id='CategoryModel'
          theader='商品型號'
          name='model'
          placeholder='商品型號'
          value={this.state.model}
          onChange={this.handleChange}
        />

        <ComplexedRadio handleChange={this.handleDeliveryInfo} deliveryinfo={this.state.deliveryinfo} />

        <DateField text='開始時間' name='startdate' placeholderText='請選擇' selected={this.state.startdate} onChange={this.handleStartDateChange} />

        <DateField text='結束時間' name='enddate' placeholder='yyyy-mm-dd' selected={this.state.enddate} onChange={this.handleEndDateChange} />

        <InputField
          id='Suggestedprice'
          type='text'
          theader='廠商建議價'
          name='suggestedprice'
          placeholder='廠商建議價'
          value={this.state.suggestedprice}
          onChange={this.handleChange}
        />

        <InputField
          id='Price'
          type='text'
          theader='購物中心售價'
          name='price'
          placeholder='購物中心售價'
          value={this.state.price}
          onChange={this.handleChange}
        />

        <InputField
          id='Cost'
          type='text'
          theader='成本(含稅＋運費)'
          name='cost'
          placeholder='成本'
          value={this.state.cost}
          onChange={this.handleChange}
        />

        <InputField
          id='Safetystock'
          type='text'
          theader='安全庫存量'
          name='safetystock'
          placeholder='安全庫存量'
          value={this.state.safetystock}
          onChange={this.handleChange}
        />

        <InputField
          id='Purchaselimit'
          type='text'
          theader='限購數量'
          name='purchaselimit'
          placeholder='限購數量'
          value={this.state.purchaselimit}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ItemPageProposal
