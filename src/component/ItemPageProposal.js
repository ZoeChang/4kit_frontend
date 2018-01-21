import React, { Component } from 'react'
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup'
// import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

// import Categories from './Category1_y.js'
// import Selects from './Selects.js'
import ComplexedRadio from './ComplexedRadio.js'
import Category from './Category.js'

function GroupInput ({ id, label, help, FormGroupClass, ...props }) {
  return (
    <FormGroup controlId={id} bsClass={FormGroupClass}>
      <ControlLabel>{label}</ControlLabel>
      <input {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class ItemPageProposal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDeliveryInfo = this.handleDeliveryInfo.bind(this)
    this.handleMerchandiseSpecType = this.handleMerchandiseSpecType.bind(this)
    this.handleProposeSub = this.handleProposeSub.bind(this)
  }

  handleDeliveryInfo (e) {
    var categoryName = e.target.name
    var categoryValue = e.target.value
    var inputType = e.target.type
    var id = e.target.id
    var change = this.state.data

    if (inputType === 'radio') { id = 'type' }

    if (!change[categoryName]) {
      change[categoryName] = {}
    }

    change[categoryName][id] = categoryValue
    this.setState(change)
    this.props.onDataChanged(change)
  }

  handleMerchandiseSpecType (e) {
    var change = this.state.data
    change['SpecType'] = e.target.value
    this.setState(change)
    this.props.onDataChanged(change)
  }

  handleProposeSub (value) {
    if (value === -1) {
      return
    }
    var change = this.state.data
    change['proposeSub'] = value
    this.setState(change)
    this.props.onDataChanged(change)
  }

  handleChange (e) {
    var change = this.state.data
    change[e.target.name] = e.target.value
    this.setState(change)
    this.props.onDataChanged(change)
  }

  render () {
    return (
      <div>
        <FormGroup>
          <ControlLabel>提案站別 / 對象</ControlLabel>
          <Category api={this.props.api} data={this.props.categories} categoryChanged={this.handleProposeSub} />
        </FormGroup>

        <FormGroup onChange={this.handleDeliveryInfo}>
          <ControlLabel>配送方式</ControlLabel>
          {' '}
          <Radio name='deliverType' inline value='0' defaultChecked>宅配</Radio>
          {' '}
          <Radio name='deliverType' inline value='1'>快速到貨商品</Radio>
          {' '}
          <Radio name='deliverType' inline value='2'>直店配送</Radio>
          {' '}
          <Radio name='deliverType' inline value='3'>ESD</Radio>
        </FormGroup>

        <FormGroup onChange={this.handleMerchandiseSpecType}>
          <ControlLabel>我的商品有規格</ControlLabel>
          {' '}
          <Radio name='merchandiseSpecType' inline value={0} defaultChecked>無</Radio>
          {' '}
          <Radio name='merchandiseSpecType' inline value={1}>一層</Radio>
          {' '}
          <Radio name='merchandiseSpecType' inline value={2}>兩層</Radio>
        </FormGroup>

        <GroupInput
          type='text'
          label='賣場名稱'
          name='name'
          placeholder='最多45個字元'
          value={this.state.data.name}
          onChange={this.handleChange} />

        <GroupInput
          type='textarea'
          id='CategoryDesc'
          label='簡短說明'
          name='desc'
          placeholder='最多100個字元'
          value={this.state.data.desc}
          onChange={this.handleChange} />

        <GroupInput
          id='CategoryTitle'
          type='text'
          label='特色標題'
          name='title'
          placeholder='特色標題'
          value={this.state.data.title}
          onChange={this.handleChange} />

        <GroupInput
          id='CategoryBrand'
          type='text'
          label='品牌'
          name='brand'
          placeholder='品牌'
          value={this.state.data.brand}
          onChange={this.handleChange} />

        <GroupInput
          id='CategoryModel'
          type='text'
          label='商品型號'
          name='model'
          placeholder='商品型號'
          value={this.state.data.model}
          onChange={this.handleChange} />

        <ComplexedRadio chagnehandle={this.handleChange} />

        <FormGroup onChange={this.handleChange}>
          <ControlLabel>開始時間</ControlLabel>
          {' '}
          <input type='text' name='startdate' placeholder='yyyy-mm-dd' id='startdate' className='form-control mdtextarea' />
        </FormGroup>

        <FormGroup onChange={this.handleChange}>
          <ControlLabel>結束時間</ControlLabel>
          {' '}
          <input type='text' name='enddate' placeholder='yyyy-mm-dd' id='enddate' className='form-control mdtextarea' />
        </FormGroup>

        <GroupInput
          id='Suggestedprice'
          type='text'
          label='廠商建議價'
          name='suggestedprice'
          placeholder='廠商建議價'
          onChange={this.handleChange} />

        <GroupInput
          id='Price'
          type='text'
          label='購物中心售價'
          name='price'
          placeholder='購物中心售價'
          onChange={this.handleChange} />

        <GroupInput
          id='Cost'
          type='text'
          label='成本(含稅＋運費)'
          name='cost'
          placeholder='成本'
          onChange={this.handleChange} />

        <GroupInput
          id='Safetystock'
          type='text'
          label='安全庫存量'
          name='safetystock'
          placeholder='安全庫存量'
          onChange={this.handleChange} />

        <GroupInput
          id='Purchaselimit'
          type='text'
          label='限購數量'
          name='purchaselimit'
          placeholder='限購數量'
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default ItemPageProposal
