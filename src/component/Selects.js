import React, { Component } from 'react'

// props: data = [{content: xxx, value: xxx},{content: xxx, value: xxx}]

class Selects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  // 選項設定: 第一項為請選擇
  collection () {
    var result = this.props.data

    if (result && result.length !== 0 && result[0] !== undefined) {
      if (result[0].value !== 'initselect') {
        result.unshift({content: '請選擇', value: 'initselect', key: -1})
      }
    } else {
      result = [{content: '請選擇', value: 'initselect', key: -1}]
    }

    return result
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    this.props.categoryChanged(e.target.value)
  }

  render () {
    var selectGroup = this.collection().map((obj) =>
      <option value={obj.value} key={obj.key}>
        {obj.content}
      </option>
      )

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {selectGroup}
      </select>
    )
  }
}

export default Selects
