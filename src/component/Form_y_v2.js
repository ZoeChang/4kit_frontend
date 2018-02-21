import React, { Component } from 'react'
// my Component
import { InputField, SelectField, RadioField, TextareaField } from './FormField';

// data
// api
var apibs = `http://localhost:8888/4kit_backend/public/4kit`
var apiRich = `http://172.20.10.12:8888/4kit_backend/public/4kit`
var isProd = true
var apiYoo = isProd ? apibs : apiRich
var apiItemPage = apiYoo + `/y/ItemPage`
var apiSubItemPage = apiYoo + `/y/SubItemPage/`
var postProposal = apiYoo + `/y/Proposal`

 

class yahoo extends Component {
  render () {
    return (
      <div>
        <SelectField
          theader="test2"
          data={selects}
        />
      </div>
    )
  }
}

export default yahoo     