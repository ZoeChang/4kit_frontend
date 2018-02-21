import React, { Component } from 'react'

import SideNav from './component/SideNav.js'
import Form_y from './component/Form_y'
// import Form_v2 from './component/Form_y_v2';

import { InputField, SelectField, RadioField, TextareaField } from './component/FormField'

// my CSS
import './App.css'

var selects = [{content: '001', value: '001', key: 'name_02'},
{content: '002', value: '002', key: 'name_03'},
{content: '003', value: '003', key: 'name_04'},
{content: '004', value: '004', key: 'name_05'}]

var radios = {
  name: 'deliverType',
  item: [{content: '宅配', value: 0, key: 'deliverType_0'},
    {content: '快速到貨商品', value: 1, key: 'deliverType_1'},
    {content: '直店配送 ', value: 2, key: 'deliverType_2'},
    {content: 'ESD ', value: 3, key: 'deliverType_3'}
  ]
}

class App extends Component {
  render () {
    return (
      <div>
        {/* <Form_v2 /> */}
        <Form_y />
      </div>
    )
  }
}

export default App
