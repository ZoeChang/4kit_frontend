import React, { Component } from 'react'
import update from 'immutability-helper'
import {DropdownSelectField} from './FormField.js'

// my Component
import Attr from './Attr.js'
import AttrCombined from './AttrCombined.js'

// Spec props:
// api
// sub
// selectedAttrs
class YahooSpec extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedSubItemPage: {
        subItemPage: {
          attrs: []
        }
      }
    }


    this.handleSelectSubItemPage = this.handleSelectSubItemPage.bind(this)
  }

  handleSelectSubItemPage (selectedSubItemPage) {
    this.setState(update(this.state, {
      selectedSubItemPage: {
        $set: {
          label: selectedSubItemPage.label,
          value: selectedSubItemPage.value,
          subItemPage: {
            attrs: selectedSubItemPage.subItemPage.attrs.slice()
          }
        }
      },
      selectedAttrs: {$set: {}},
      cluster: {
        $set: {
          id: selectedSubItemPage.value,
          attrs: selectedSubItemPage.subItemPage.attrs.map(attr => {
            return {name: attr.name, values: []}
          })
        }
      }
    }), () => {
      console.log(this.state)
      this.props.onDataChanged(this.state.cluster)
    })
  }

  render () {
    let attrs = this.state.selectedSubItemPage.subItemPage.attrs.map((attr, index) => {
      return (
        <DropdownSelectField
          theader={attr.name}
          multi
          creatable
          value={this.state.selectedAttrs[attr.name]}
          options={attr.values.map(value => {
            return {value, label: value, name: attr.name, index}
          })}
          key={index}
          onChange={selectedAttrs => {
            let state = selectedAttrs.length === 0 ? update(this.state, {
              selectedAttrs: {$set: {[attr.name]: []}},
              cluster: {
                attrs: {[index]: {$set: {name: attr.name, values: []}}}}
            }) : update(this.state, {
              selectedAttrs: {$set: {[attr.name]: selectedAttrs}},
              cluster: {
                attrs: {[index]: {$set: {name: attr.name, values: selectedAttrs.map(selectedAttr => selectedAttr.value)}}}
              }
            })

            this.setState(state, () => {
              console.log(this.state)
              this.props.onDataChanged(this.state.cluster)
            })
          }}
        />
      )
    })

    return (
      <div>
        {/* chooes 商品規格表 */}
        <DropdownSelectField
          theader='商品規格表'
          value={this.state.selectedSubItemPage}
          options={this.props.subItemPages.map(subItemPage => {
            return {value: subItemPage.id, label: subItemPage.name, subItemPage}
          })}
          onChange={this.handleSelectSubItemPage} />



        {/* TODO: if Demsion == 0 not show  */}
        <AttrCombined attr_arr={this.state.selectedSubItemPage.subItemPage.attrs} Demsion={2} />

        {attrs}

        {/* 屬性組合 */}
        {/* {display && <AttrCombined attr_arr={this.state.specAttrs} Demsion={this.props.AttrNumber} />} */}

        {/* show 規格項目 */}
        {/* <Attrs attr_arr={this.state.specAttrs} getAttrValue={this.props.onChange} /> */}
      </div>
    )
  }
}

export default YahooSpec
