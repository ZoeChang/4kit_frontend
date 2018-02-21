import React, { Component } from 'react'
import update from 'immutability-helper'
import moment from 'moment'

import ComplexedRadio from './ComplexedRadio.js'
import { DropdownSelectField, RadioField, InputField, DateField } from './FormField.js'

class ItemPageProposal extends Component {
  constructor (props) {
    super(props)
    this.state = update(this.props.data, {
      startdate: startdate => moment(startdate),
      enddate: enddate => moment(enddate)
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleDropdownSelected = this.handleDropdownSelected.bind(this)
  }

  handleChange (e) {
    this.setState(update(this.state, {
      data: {[e.target.name]: {$set: e.target.value}}
    }), () => this.props.onDataChanged(this.state))
  }

  handleDropdownSelected (proposeSub) {
    this.setState({proposeSub}, () => this.props.onDataChanged(update(this.state, {
      proposeSub: proposeSub => proposeSub.value,
      startdate: startdate => startdate.toDate().getTime(),
      enddate: enddate => enddate.toDate().getTime()
    })))
  }

  handleStartDateChange (startdate) {
    this.setState(update(this.state, {
      data: {startdate}
    }))
  }

  handleEndDateChange (enddate) {
    this.setState(update(this.state, {
      data: {enddate}
    }))
  }

  render () {
    return (
      <div>
        <DropdownSelectField text='提案站別 / 對象' value={this.state.proposeSub} options={this.props.categories.map(category => {
          return {
            value: category.value,
            label: category.content}
        })} onChange={this.handleDropdownSelected} />
        {/* <FormGroup>
          <ControlLabel>提案站別 / 對象</ControlLabel>
          <Category api={this.props.api} data={this.props.categories} categoryChanged={this.handleProposeSub} />
        </FormGroup> */}
        <RadioField text='配送方式' name='deliverType' options={[
          {value: 0, label: '宅配'},
          {value: 1, label: '快速到貨商品'},
          {value: 2, label: '直店配送'},
          {value: 3, label: 'ESD'}]} onChange={this.handleChange} />

        {/* <FormGroup onChange={this.handleDeliveryInfo}>
          <ControlLabel>配送方式</ControlLabel>
          {' '}
          <Radio name='deliverType' inline value='0' defaultChecked>宅配</Radio>
          {' '}
          <Radio name='deliverType' inline value='1'>快速到貨商品</Radio>
          {' '}
          <Radio name='deliverType' inline value='2'>直店配送</Radio>
          {' '}
          <Radio name='deliverType' inline value='3'>ESD</Radio>
        </FormGroup> */}

        <RadioField text='我的商品有規格' name='merchandiseSpecType' options={[
          {value: 0, label: '無'},
          {value: 1, label: '一層'},
          {value: 2, label: '兩層'}]} onChange={this.handleChange} />

        {/* <FormGroup onChange={this.handleMerchandiseSpecType}>
          <ControlLabel>我的商品有規格</ControlLabel>
          {' '}
          <Radio name='merchandiseSpecType' inline value={0} defaultChecked>無</Radio>
          {' '}
          <Radio name='merchandiseSpecType' inline value={1}>一層</Radio>
          {' '}
          <Radio name='merchandiseSpecType' inline value={2}>兩層</Radio>
        </FormGroup> */}

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

        <ComplexedRadio chagnehandle={this.handleChange} />

        <DateField text='開始時間' name='startdate' placeholderText='請選擇' selected={this.state.startdate} onChange={this.handleStartDateChange} />

        {/* <FormGroup onChange={this.handleChange}>
          <ControlLabel>開始時間</ControlLabel>
          {' '}
          <input type='text' name='startdate' placeholder='yyyy-mm-dd' id='startdate' className='form-control mdtextarea' />
        </FormGroup> */}

        <DateField text='結束時間' name='enddate' placeholder='yyyy-mm-dd' selected={this.state.enddate} onChange={this.handleEndDateChange} />

        {/* <FormGroup onChange={this.handleChange}>
          <ControlLabel>結束時間</ControlLabel>
          {' '}
          <input type='text' name='enddate' placeholder='yyyy-mm-dd' id='enddate' className='form-control mdtextarea' />
        </FormGroup> */}

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
