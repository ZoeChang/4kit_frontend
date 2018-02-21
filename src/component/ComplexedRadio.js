import React, { Component } from 'react'
import update from 'immutability-helper'

import { InputField, DateField } from './FormField'

// props:
// const data = {
//   label: '特殊交貨期',
//   name: 'deliveryinfo',
//   radios: [
//     {
//       value: 0,
//       content: '正常交貨期'
//     }, {
//       value: 1,
//       content: ['預購商品, 預計出貨日期'],
//       sub: {
//         id: 'shipdate',
//         type: 'text',
//         name: 'shipdate',
//         placeholder: 'yyyy-mm-dd',
//         className: 'form-control mdtextarea'
//       }
//     }, {
//       value: 2,
//       content: ['客製化商品, 收到商品後', '天後出貨'],
//       sub: {
//         id: 'dayship',
//         type: 'text',
//         name: 'dayship',
//         placeholder: '天數',
//         className: 'form-control smtextarea'
//       }
//     }, {
//       value: 3,
//       content: '需與顧客約定送貨日'
//     }
//   ]
// }

// props:
//  chagnehandle={this.ComplexedRadioHandle}
class ComplexedRadio extends Component {
  constructor (props) {
    super(props)

    this.state = this.props.deliveryinfo
    // handler
    this.handleChange = this.handleChange.bind(this)
    this.handleShipDate = this.handleShipDate.bind(this)
    this.handleDayShip = this.handleDayShip.bind(this)
  }

  handleChange (e) {
    this.setState(update(this.state, {
      type: {$set: e.target.value}
    }), () => this.props.handleChange(this.state))
  }

  handleShipDate (shipdate) {
    this.setState(update(this.state, {
      shipdate: {$set: shipdate}
    }), () => this.props.handleChange(this.state))
  }

  handleDayShip (e) {
    this.setState(update(this.state, {
      dayship: {$set: e.target.value}
    }), () => this.props.handleChange(this.state))
  }

  isDeliveryType (value) {
    return this.state.type === value
  }

  render () {
    return (
      <div>
        <label>特殊交貨期</label>
        <div>
          <InputField type='radio' name='deliveryinfo' value='0' id='0' checked={this.isDeliveryType('0')} onChange={this.handleChange} />
          <label htmlFor='0'>正常交貨期</label>
          <InputField type='radio' name='deliveryinfo' value='1' id='1' checked={this.isDeliveryType('1')} onChange={this.handleChange} />
          <DateField text='預購商品, 預計出貨日期' selected={this.state.shipdate} name='shipdate' onChange={this.handleShipDate} />
          <InputField type='radio' theader='客製化商品, 收到商品後' name='deliveryinfo' value='2' id='2' checked={this.isDeliveryType('2')} onChange={this.handleChange} />
          <InputField theader='天後出貨' placeholder='天數' onChange={this.handleDayShip} />
          <InputField type='radio' theader='需與顧客約定送貨日' name='deliveryinfo' value='3' id='3' checked={this.isDeliveryType('3')} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default ComplexedRadio
