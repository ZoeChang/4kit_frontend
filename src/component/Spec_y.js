import React, { Component } from 'react'

// my Component
import Attr from './Attr_y.js'
import SpecsList from './SpecsList_y.js'
import AttrCombined from './AttrCombined.js'

// Attrs props:
// attr_arr: [{},{},{}...]
class Attrs extends Component {
  constructor (props) {
    super(props)
    this.attrsHandle = this.attrsHandle.bind(this)
  }

  attrsHandle (e) {
    this.props.getAttrValue(e, 'cluster_attrs')
  }

  render () {
    var attrsHandle = this.attrsHandle
    return (
      this.props.attr_arr.map(function (obj, index) {
        return <Attr attr={obj} key={obj.name + index} onChange={attrsHandle} />
      }
      )
    )
  }
}

// Spec props:
// api
// sub
// selectedAttrs
class Spec extends Component {
  // onchanged handle
  constructor (props) {
    super(props)
    this.state = {
      category_sub: [{content: '請選擇', value: 'initselect'}],
      AllAttrs: [],
      // 假設 constraint 是單選 1/複選 2
      specAttrs: []
    }

    this.specValueHandle = this.specValueHandle.bind(this)
  }

  // 已掛載的元件收到新的 props 時被觸發, 用 this.setState 去改變 state 狀態。
  componentWillReceiveProps (nextProps) {
    var _this = this
    var api = `${nextProps.api}${nextProps.sub}`

    if (nextProps.sub !== this.props.sub) {
        // fetch url from props
      fetch(api, {
        method: 'GET'
      }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      }).then(function (data) {
        // data 才是實際的 JSON 資料
        if (data.status === 200) {
          var arr_A = data.body.map((item, index) => ({ content: item.name, value: item.id }))
          _this.setState({
            category_sub: arr_A,
            AllAttrs: Object.assign({}, ...data.body.map(item => ({ [item.id]: item })))
          })
        }
      })
    }
  }

  specValueHandle (event) {
    var subID = event.target.value
    var attr = this.state.AllAttrs[subID].attrs
    this.setState({ specAttrs: attr })
  }

  render () {
    var display = this.props.display

    if (display !== 0) {
      return (
        <div>
          {/* chooes 商品規格表 */}
          <SpecsList category_sub={this.state.category_sub} getSpecValue={this.specValueHandle} />

          {/* 屬性組合 */}
          <AttrCombined attr_arr={this.state.specAttrs} Demsion={this.props.AttrNumber} />
          {/* show 規格項目 */}
          <Attrs attr_arr={this.state.specAttrs} getAttrValue={this.props.onChange} />
        </div>

      )
    } else {
      return (
        <div>
          {/* chooes 商品規格表 */}
          <SpecsList category_sub={this.state.category_sub} getSpecValue={this.specValueHandle} />

          {/* show 規格項目 */}
          <Attrs attr_arr={this.state.specAttrs} getAttrValue={this.props.onChange} />
        </div>

      )
    }
  }
}

export default Spec
