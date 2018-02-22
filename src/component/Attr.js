import React, { Component } from 'react'
// BS Component
// import FormGroup from 'react-bootstrap/lib/FormGroup'
// import ControlLabel from 'react-bootstrap/lib/ControlLabel'
// import Overlay from 'react-bootstrap/lib/Overlay'
// import Button from 'react-bootstrap/lib/Button'
// import Popover from 'react-bootstrap/lib/Popover'
// import Radio from 'react-bootstrap/lib/Radio'
// import Checkbox from 'react-bootstrap/lib/Checkbox'

// AttrValue props
// attrName = 項目名稱
// value_arr: ["選項1", "選項2" , "選項3"...]  項目內容列表
// type = 單選 1/複選 2
// class AttrValue extends Component {
//   render () {
//     if (this.props.type === 2) {
//       return (
//             this.props.value_arr.map((value, index) =>
//               <Checkbox name={this.props.attrName} inline value={value} key={this.props.attrName + index}>
//                 {value}
//               </Checkbox>

//             )
//       )
//     } else {
//       return (
//             this.props.value_arr.map((value, index) =>
//               <Radio name={this.props.attrName} inline value={value} key={this.props.attrName + index}>
//                 {value}
//               </Radio>

//             )
//       )
//     }
//   }
// }

// Attrs props:
// attr: { name:string, values:[], constraint:number ,textmax:string , textmin:sting, required:Boolean }
class Attr extends Component {
  // attr.name = 項目名稱
  // attr.values = 項目內容列表
  // attr.required = 是否為必填

  // 可複選選項?
  // 假設 attr.constraint 是單選 1/複選 2

  constructor (props) {
    super(props)

    this.state = {
      show: false,
      selected: '請選擇'
    }

    this.buttonHandle = this.buttonHandle.bind(this)
    this.attrHandle = this.attrHandle.bind(this)
  }

  buttonHandle (e) {
    this.setState({ target: e.target, show: !this.state.show })
  }

  attrHandle (e) {
    this.setState({ selected: e.target.value })
    this.props.onChange(e)
  }

  render () {
    var attrName = `${this.props.attr.name}` + (this.props.attr.required ? `(必填)` : ``)
    var overlayTitle = `請勾選屬性項目` + (this.props.attr.constraint === 2 ? `(可複選)` : ``)
    return (
    {/* <FormGroup controlId='formControlsSelect'>
        <ControlLabel>{attrName}</ControlLabel>
        <span />
        <Button type='button' onClick={this.buttonHandle}>{this.state.selected}</Button>
        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          rootClose
          target={this.state.target}
          placement='right'
                >

          <Popover id='popover-contained' title={overlayTitle} onChange={this.attrHandle}>
            <AttrValue value_arr={this.props.attr.values} attrName={this.props.attr.name} type={this.props.attr.constraint} />
          </Popover>
        </Overlay>
    </FormGroup> */}
    )
  }
}

export default Attr
