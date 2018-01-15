import React, { Component } from 'react'
// BS Component
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

// my Componoent
import Selects from './Selects.js'

class Category1 extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.category_sub !== this.props.category_sub
  }

  render () {
    return (
      <FormGroup controlId='Spec' onChange={this.props.getSpecValue} >
        <ControlLabel>請選擇規格表</ControlLabel>
        <FormControl componentClass='select' placeholder='select'>
          <Selects select_arr={this.props.category_sub} />
        </FormControl>
      </FormGroup>

    )
  }
}

export default Category1
