import React, { Component } from 'react'
import update from 'immutability-helper'
import moment from 'moment'

import ItemPageProposal from './ItemPageProposal.js'
// import Categories from './Category1_y.js'
import YahooSpec from './YahooSpec.js'
import UploadImages from './UploadImages.js'
import Warranty from './Warranty.js'
import CopyWriter from './CopyWriter.js'

let apibs = process.env.REACT_APP_API_HOST
let apiRich = process.env.REACT_APP_API_HOST
let isProd = false
let apiYoo = isProd ? apibs : apiRich
let apiItemPage = apiYoo + `/y/ItemPage`
let apiSubItemPage = apiYoo + `/y/SubItemPage/`
let postProposal = apiYoo + `/y/Proposal`

class YahooForm extends Component {
  // 設定state初始值: 紀錄下拉式選單選項
  constructor (props) {
    super(props)

    this.state = {
      categories: [],
      subItemPages: [],
      itemPageProposal: {
        brand: 'brand',
        cost: '80',
        deliverType: 0,
        deliveryinfo: {
          type: '0',
          shipdate: moment(),
          dayship: ''
        },
        desc: 'desc',
        startdate: moment(),
        enddate: moment()
      },
      merchandise: {
        cluster: {
          attrs: [],
          otherattrs: []
        },
        merchandises: [],
        warranty: {
          listdesc: ['']
        },
        images: {},
        copywriter: []
      },

      material: [],
      Pictures: [{preview: 0}]
    }

    // handler
    this.updateItemPageProposal = this.updateItemPageProposal.bind(this)
    this.updateCluster = this.updateCluster.bind(this)
    this.postItemPageProposal = this.postItemPageProposal.bind(this)

    this.warrantyUpdater = this.warrantyUpdater.bind(this)
    this.copywriterUpdater = this.copywriterUpdater.bind(this)
    this.updateMaterial = this.updateMaterial.bind(this)
  }

  // 第一次render完的時候，會執行這個function，mount表示顯示在DOM上(只有第一次被render出來的時候)
  componentDidMount () {
    this.getAllItemPage()
  }

  async getAllItemPage () {
    // fetch url from props
    let response = await fetch(apiItemPage, {method: 'GET'})
    let json = await response.json()

    // data 才是實際的 JSON 資料
    let categories = json.body.map((item, index) => ({ content: item.subname, value: item.sub, key: index }))
    this.setState({categories})
  }

  async getAllSubItemPage () {
    let url = `${apiSubItemPage}${this.state.itemPageProposal.proposeSub}`
    // fetch url from props
    try {
      let response = await fetch(url, {method: 'GET'})
      let json = await response.json()
      let subItemPages = json.body
      this.setState({subItemPages})
    } catch (e) {
      console.log(e)
    }
  }

  // for 8.1.4
  async updateItemPageProposal (itemPageProposal) {
    this.setState({itemPageProposal}, () => {
      if (this.state.itemPageProposal.proposeSub) {
        this.getAllSubItemPage()
      }
    })
  }

  updateCluster (cluster) {
    this.setState(update(this.state, {
      merchandise: {
        cluster: {$set: cluster}
      }
    }), () => console.log(this.state))
  }

  // 8.1.4 submit
  async postItemPageProposal (e) {
    e.preventDefault()

    // let data = {'proposalDueDate': '1-15-2018', 'productCategoryId': 2674, 'itemCategoryId': 2674, 'startdate': '2018-01-15', 'enddate': '2018-01-18', 'proposeSub': '4', 'deliverType': '0', 'merchandiseSpecType': '0', 'name': 'name', 'desc': 'desc', 'title': 'title', 'brand': 'brand', 'model': 'sku', 'deliveryinfo': {'type': '0'}, 'suggestedprice': '100', 'price': '100', 'cost': '80', 'safetystock': '11', 'purchaselimit': '1'}
    let data = this.state.itemPageProposal

    let form = JSON.stringify(data)
    console.log(form)
    let options = { method: 'POST',
      body: form }

        // let form =  new FormData();
        // form.append("json", JSON.stringify ( this.state.itemPageProposal ));
        // console.log(JSON.stringify ( this.state.itemPageProposal ))
        // console.log(form);

        // fetch url from props

    try {
      let response = await fetch(postProposal, options)
      let json = await response.json()

      let id = json.body.proposalId
      console.log('subId:' + id)
      this.setState({id})

      // 8.1.7 api url
      let postMerchandise = `${apiYoo}/y/Proposal/${id}/Merchandise`
      options['body'] = JSON.stringify(this.state.Merchandise)
      let response_8_1_7 = await fetch(postMerchandise, options)
      let json_8_1_7 = await response_8_1_7.json()
      console.log(json_8_1_7)

      let postSubmit = `${apiYoo}/y/Proposal/${this.state.id}/Submit`
      options['body'] = {}
      let response_submit = await fetch(postSubmit, options)
      let json_submit = await response_submit.json()
      console.log(json_submit)
    } catch (e) {
      console.log(e)
    }
  }

  // update warranty object
  warrantyUpdater (obj) {
    let merchandise = update(this.state, {
      merchandise: {warranty: {$set: obj}}
    })
    this.setState(merchandise, () => console.log(this.state.merchandise))
  }

  // update copywriter object
  copywriterUpdater (obj, index) {
    let merchandise = update(this.state, {
      merchandise: {copywriter: {[index]: {$set: obj}}}
    })
    this.setState(merchandise, () => console.log(this.state.merchandise))
  }

  // for 8.1.7
  // handleMerchandise (e, type) {
  //   let handleName = e.target.name
  //   let handleValue = e.target.value

  //   if (type === 'cluster_attrs') {
  //     let changes = {}
  //     let cluster = this.state.Merchandise.cluster
  //     let attrs = cluster.attrs
  //     let hasAttr = this.state.itemPageProposal.merchandiseSpecType ? this.state.itemPageProposal.merchandiseSpecType !== 0 : false

  //     if (hasAttr && attrs.length > 0) {
  //       // attr 有東西 需判斷是否已經填過
  //       let index = attrs.findIndex(function (attr, index, array) {
  //         if (attr.name === handleName) return true
  //         return false
  //       }

  //       if (index > -1) {
  //                   // 已經填過該attr 修改選項

  //         if (e.target.type === 'checkbox') {
  //                       // checkbox 可複選 增加或刪除 該選項

  //           // 搜尋欲填入的選項
  //           let valueIndex = attrs[index].indexOf(handleValue)

  //           if (valueIndex > -1) {
  //                           // 選項已選過 刪除
  //             arr_attrs[index].values.splice(valueIndex, 1)
  //           } else {
  //                           // 選項未選過 加入
  //             arr_attrs[index].values.push(handleValue)
  //           }
  //         } else {
  //                       // radio 單選 改選項
  //           arr_attrs[index].values = handleValue
  //         }
  //       } else {
  //         obj_change['name'] = handleName
  //         obj_change['values'] = handleValue

  //         arr_attrs.push(obj_change)
  //       }
  //     } else {
  //       obj_change['name'] = handleName
  //       obj_change['values'] = handleValue

  //       arr_attrs.push(obj_change)
  //     }

  //     obj_cluster.attrs = arr_attrs

  //     this.setState(obj_cluster)

  //   } else if (type === 'merchandises') {
  //     // let state = this.state
  //     // obj_state.Merchandise.merchandises
  //   } else if (type === 'warranty') {
  //     let warranty = this.state.Merchandise.warranty
  //     warranty[handleName] = handleValue
  //     this.setState(warranty, function () { console.log(this.state) })
  //   } else {
  //     console.log('other')
  //   }

  //       // change.Merchandise[e.target.name] = e.target.value;
  //       // this.setState(change,function(){console.log(this.state.Merchandise)});
  // }

  // 8.1.9
  async updateMaterial (material) {
    this.setState({material})
  }

  // 8.1.10

  render () {
    return (
      <div className='form'>

        {/* <h3>8.1.4</h3> */}
        <form onSubmit={this.postItemPageProposal}>
          <ItemPageProposal data={this.state.itemPageProposal} categories={this.state.categories} onDataChanged={this.updateItemPageProposal} />

          <h3>以下是8.1.7</h3>
          <h6>cluster</h6>
          <h6>商品規格表</h6>

          <YahooSpec subItemPages={this.state.subItemPages} onDataChanged={this.updateCluster} attrLayers={this.state.itemPageProposal.merchandiseSpecType} />
          <br />

          <h6>warranty</h6>
          {/* <Warranty updater={this.warrantyUpdater} /> */}

          <h6>copywriter</h6>
          {/* <CopyWriter updater={this.copywriterUpdater} /> */}

          <h6>imageGroups</h6>

          <br />
          <h6>商品圖上傳</h6>
          <UploadImages onDataChanged={this.updateMaterial} />

          <br />
          {/* <h3>以上是8.1.7</h3> */}
          <br />

          <button type='submit'>Submit</button>
        </form>
        <br />
        {/* <h3>以上是8.1.4</h3> */}
        <br />
        <br />

      </div>
    )
  }
}

export default YahooForm
