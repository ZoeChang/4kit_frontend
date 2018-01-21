import React, { Component } from 'react'
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup'
// my Component
// import Selects from './Selects.js'

class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.categories
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    this.props.categoryChanged(e.target.value)
  }

  // 選項設定: 第一項為請選擇
  collection () {
    var categories = this.props.data

    if (categories && categories.length !== 0 && categories[0] !== undefined) {
      if (categories[0].value !== 'initselect') {
        categories.unshift({content: '請選擇', value: 'initselect', key: -1})
      }
    } else {
      categories = [{content: '請選擇', value: 'initselect', key: -1}]
    }

    return categories
  }

  render () {
    var selectGroup = this.collection().map((obj) =>
      <option value={obj.value} key={obj.key}>
        {obj.content}
      </option>
      )

    return (
      <FormGroup>
        <select value={this.state.value} onChange={this.handleChange}>
          {selectGroup}
        </select>
      </FormGroup>
    )
  }
}

export default Category
