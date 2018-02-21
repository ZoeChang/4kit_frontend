import React, { Component } from 'react'
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'

// props:
const data = {
  label: '特殊交貨期',
  name: 'deliveryinfo',
  radios: [
    {
      value: 0,
      content: '正常交貨期'
    }, {
      value: 1,
      content: ['預購商品, 預計出貨日期'],
      sub: {
        id: 'shipdate',
        type: 'text',
        name: 'shipdate',
        placeholder: 'yyyy-mm-dd',
        className: 'form-control mdtextarea'
      }
    }, {
      value: 2,
      content: ['客製化商品, 收到商品後', '天後出貨'],
      sub: {
        id: 'dayship',
        type: 'text',
        name: 'dayship',
        placeholder: '天數',
        className: 'form-control smtextarea'
      }
    }, {
      value: 3,
      content: '需與顧客約定送貨日'
    }
  ]
}

class RadioGroup extends Component {
  render () {
    const RadioGroupName = this.props.data.name
    return (

    this.props.data.radios.map(function (obj) {
      var radiosId = `{RadioGroupName}_{obj.value}`

      if (obj.sub) {
        return (
          <div key={obj.value}>
            <Radio name={RadioGroupName} inline value={obj.value} id={radiosId}>
              {' '}
              {obj.content[0]}
            </Radio>
            <input type='text' name={RadioGroupName} placeholder={obj.sub.placeholder} id={obj.sub.id} className={obj.sub.className} data-tag={radiosId} />
            {obj.content[1]}
          </div>
        )
      } else {
        return (
          <Radio name={RadioGroupName} inline value={obj.value} id={radiosId} key={obj.value}>
            {' '}
            {obj.content}
          </Radio>

        )
      }
    })
    )
  }
}

// props:
//  chagnehandle={this.ComplexedRadioHandle}
class ComplexedRadio extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deliveryinfo: {
        'type': 0
      }
    }

    // handler
    this.onChange = this.onChange.bind(this)
  }

  isNumeric (num) {
    if (!isNaN(+num)){
          return parseInt(num)
      } else {
          return num
      }
  }

  onChange (e) {
    var name = e.target.name
    var value = e.target.value
    var id = e.target.id
    var change = this.state.deliveryinfo

    value = this.isNumeric(value)

    if (name === 'deliveryinfo') {
      change['type'] = value
    } else {
      // 控制checked 隨輸入的文字改變選項
      // var dependedRadio = e.target.dataset.tag
      // document.getElementById({dependedRadio}).checked = true;
      // console.log( document.getElementById({dependedRadio}) );

      // 文字存入
      change[id] = value
    }

    this.setState({ deliveryinfo: change })
  }

  render () {
    return (
      <FormGroup onChange={this.props.chagnehandle}>
        <ControlLabel>{data.label}</ControlLabel>
        {' '}
        <RadioGroup data={data} />
      </FormGroup>

    )
  }
}

export default ComplexedRadio
