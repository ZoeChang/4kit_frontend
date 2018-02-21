import React, { Component } from 'react'
import update from 'immutability-helper'
import moment from 'moment'

import ComplexedRadio from './ComplexedRadio.js'
import { DropdownSelectField, RadioField, InputField, DateField } from './FormField.js'

class ItemPageProposal extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.data

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleDropdownSelected = this.handleDropdownSelected.bind(this)
    this.handleDeliveryInfo = this.handleDeliveryInfo.bind(this)
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

  render () {
    return (
      <div>
        <DropdownSelectField text='提案站別 / 對象' value={this.state.proposeSub} options={this.props.categories.map(category => {
          return {
            value: category.value,
            label: category.content}
        })} onChange={this.handleDropdownSelected} />

        <RadioField text='配送方式' name='deliverType' options={[
          {value: 0, label: '宅配'},
          {value: 1, label: '快速到貨商品'},
          {value: 2, label: '直店配送'},
          {value: 3, label: 'ESD'}]} onChange={this.handleChange} />

        <RadioField text='我的商品有規格' name='merchandiseSpecType' options={[
          {value: 0, label: '無'},
          {value: 1, label: '一層'},
          {value: 2, label: '兩層'}]} onChange={this.handleChange} />

        <InputField
          type='text'
          text='賣場名稱'
          name='name'
          placeholder='最多45個字元'
          value={this.state.name}
          onChange={this.handleChange} />

        <InputField
          type='textarea'
          id='CategoryDesc'
          text='簡短說明'
          name='desc'
          placeholder='最多100個字元'
          value={this.state.desc}
          onChange={this.handleChange} />

        <InputField
          id='CategoryBrand'
          type='text'
          text='品牌'
          name='brand'
          placeholder='品牌'
          value={this.state.brand}
          onChange={this.handleChange} />

        <InputField
          id='CategoryModel'
          type='text'
          text='商品型號'
          name='model'
          placeholder='商品型號'
          value={this.state.model}
          onChange={this.handleChange} />

        <ComplexedRadio handleChange={this.handleDeliveryInfo} deliveryinfo={this.state.deliveryinfo} />

        <DateField text='開始時間' name='startdate' placeholderText='請選擇' selected={this.state.startdate} onChange={this.handleStartDateChange} />

        <DateField text='結束時間' name='enddate' placeholder='yyyy-mm-dd' selected={this.state.enddate} onChange={this.handleEndDateChange} />

        <InputField
          id='Suggestedprice'
          type='text'
          text='廠商建議價'
          name='suggestedprice'
          placeholder='廠商建議價'
          value={this.state.suggestedprice}
          onChange={this.handleChange} />

        <InputField
          id='Price'
          type='text'
          text='購物中心售價'
          name='price'
          placeholder='購物中心售價'
          value={this.state.price}
          onChange={this.handleChange} />

        <InputField
          id='Cost'
          type='text'
          text='成本(含稅＋運費)'
          name='cost'
          placeholder='成本'
          value={this.state.cost}
          onChange={this.handleChange} />

        <InputField
          id='Safetystock'
          type='text'
          text='安全庫存量'
          name='safetystock'
          placeholder='安全庫存量'
          value={this.state.safetystock}
          onChange={this.handleChange} />

        <InputField
          id='Purchaselimit'
          type='text'
          text='限購數量'
          name='purchaselimit'
          placeholder='限購數量'
          value={this.state.purchaselimit}
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default ItemPageProposal
