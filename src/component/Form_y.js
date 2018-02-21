import React, { Component } from 'react'
import update from 'immutability-helper'
import moment from 'moment'

import ItemPageProposal from './ItemPageProposal.js'
// import Categories from './Category1_y.js'
import Spec from './Spec_y.js'
import UploadImages from './UploadImages.js'
import ComplexedRadio from './ComplexedRadio.js'
import Warranty from './Warranty.js'
import CopyWriter from './CopyWriter.js'

let apibs = `http://localhost:8888/4kit/4kit_backend/public/4kit`
let apiRich = `http://localhost:8888/4kit/4kit_backend/public/4kit`
let isProd = true
let apiYoo = isProd ? apibs : apiRich
let apiItemPage = apiYoo + `/y/ItemPage`
let apiSubItemPage = apiYoo + `/y/SubItemPage/`
let postProposal = apiYoo + `/y/Proposal`

class yahoo extends Component {
  // 設定state初始值: 紀錄下拉式選單選項
  constructor (props) {
    const today = new Date().toLocaleDateString().replace(/\//g, '-')
    const nextday = new Date(2017, 11, 1).toLocaleDateString().replace(/\//g, '-')

    super(props)

    this.state = {
      subValue: 0,
      SpecType: 0,
      categories: [],
      itemPageProposal: {
        brand: 'brand',
        cost: '80',
        deliverType: 0,
        deliveryinfo: '0',
        desc: 'desc',
        startdate: today,
        enddate: nextday
      },
      Merchandise: {
        cluster: {
          attrs: [],
          otherattrs: []
        },
        merchandises: [
          {
            quantity: 0,
            imgagegroup: 1,
            pn: '',
            barcode: '',
            firstlayerclusterattrvalue: '',
            secondlayerclusterattrvalue: ''
          }
        ],
        warranty: {
          listdesc: ['']
        },
        images: {},
        copywriter: []
      },

      Material: [],

      Pictures: [{preview: 0}]
    }

    // handler
    this.updateItemPageProposal = this.updateItemPageProposal.bind(this)
    this.MerchandiseHandle = this.handleMerchandise.bind(this)
    this.postItemPageProposal = this.postItemPageProposal.bind(this)

    this.warrantyUpdater = this.warrantyUpdater.bind(this)
    this.copywriterUpdater = this.copywriterUpdater.bind(this)
    this.imageHandle = this.imageHandle.bind(this)
  }

  // 第一次render完的時候，會執行這個function，mount表示顯示在DOM上(只有第一次被render出來的時候)
  async componentDidMount () {
    // fetch url from props
    let response = await fetch(apiItemPage, {method: 'GET'})
    let json = await response.json()

    // data 才是實際的 JSON 資料
    let categories = json.body.map((item, index) => ({ content: item.subname, value: item.sub, key: index }))
    this.setState({categories})
  }

  // for 8.1.4
  updateItemPageProposal (itemPageProposal) {
    this.setState({itemPageProposal}, () => console.log(this.state.itemPageProposal))
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

      // 8.1.9 api url
      let postMaterial = `${apiYoo}/y/Proposal/${id}/Material`
      options['body'] = JSON.stringify(this.state.Material)
      let request = new Request(postMaterial, options)
      let response_8_1_9 = await fetch(postMaterial, options)
      let json_8_1_9 = await response_8_1_9.json()
      console.log(json_8_1_9)

      let postSubmit = `${apiYoo}/y/Proposal/${this.state.id}/Submit`
      options['body'] = {}
      let response_submit = await fetch(postSubmit, options)
      let json_submit = await response_submit.json()
      console.log(json_submit)
    } catch (e) {
      console.log(e)
    }
  }

    // functionA(){
    // 	if ( a && b){
    // 		fetch
    // 	}
    // }

    // update warranty object
  warrantyUpdater (obj) {
    let Merchandise = update(this.state, {
      Merchandise: {warranty: {$set: obj}}
    })
    this.setState(Merchandise, () => console.log(this.state.Merchandise))
  }

    // update copywriter object
  copywriterUpdater (obj, index) {
    let Merchandise = update(this.state, {
      Merchandise: {copywriter: {[index]: {$set: obj}}}
    })
    this.setState(Merchandise, () => console.log(this.state.Merchandise))
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
  imageHandle (images) {
    this.setState({Material: images})
  }

  // 8.1.10

  render () {
    let displayRename = this.state.itemPageProposal.merchandiseSpecType ? this.state.itemPageProposal.merchandiseSpecType : 0
    return (
      <div className='form'>

        {/* <h3>8.1.4</h3> */}
        <form onSubmit={this.postItemPageProposal}>
          <ItemPageProposal data={this.state.itemPageProposal} categories={this.state.categories} onDataChanged={this.updateItemPageProposal} />

          <FormGroup onChange={this.ItemPageProposalHandle}>
            <ControlLabel>配送方式</ControlLabel>
            {' '}
            <Radio name='deliverType' inline value='0'>
                        宅配
                    </Radio>
            {' '}
            <Radio name='deliverType' inline value='1'>
                        快速到貨商品
                    </Radio>
            {' '}
            <Radio name='deliverType' inline value='2'>
                        直店配送
                    </Radio>
            {' '}
            <Radio name='deliverType' inline value='3'>
                        ESD
                    </Radio>
          </FormGroup>

          <FormGroup onChange={this.ItemPageProposalHandle}>
            <ControlLabel>我的商品有規格</ControlLabel>
            {' '}
            <Radio name='merchandiseSpecType' inline value={0} >
                        無
                    </Radio>
            {' '}
            <Radio name='merchandiseSpecType' inline value={1}>
                        一層
                    </Radio>
            {' '}
            <Radio name='merchandiseSpecType' inline value={2}>
                        兩層
                    </Radio>
          </FormGroup>

          {/* TODO: 簡化下面資料   "Proposer" */}

          {/* 少		id={constant.y.fieldId} */}

          <FieldGroup

            type='text'
            label='賣場名稱'
            name='name'
            placeholder='最多45個字元'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            componentClass='textarea'
            id='CategoryDesc'
            label='簡短說明'
            name='desc'
            placeholder='最多100個字元'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='CategoryTitle'
            type='text'
            label='特色標題'
            name='title'
            placeholder='特色標題'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='CategoryBrand'
            type='text'
            label='品牌'
            name='brand'
            placeholder='品牌'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='CategoryModel'
            type='text'
            label='商品型號'
            name='model'
            placeholder='商品型號'
            onChange={this.ItemPageProposalHandle}
                />

          {/* <FormGroup onChange={this.ItemPageProposalHandle}>
            <ControlLabel>商品級別</ControlLabel>
            {' '}
            <Radio name='class' inline value={1}>
                        無級別
                    </Radio>
            {' '}
            <Radio name='class' inline value={4}>
                        普級
                    </Radio>
            {' '}
            <Radio name='class' inline value={5}>
                        保護級
                    </Radio>
            {' '}
            <Radio name='class' inline value={3}>
                        輔導級 12+
                    </Radio>
            {' '}
            <Radio name='class' inline value={4}>
                        輔導級 15+
                    </Radio>
            {' '}
            <Radio name='class' inline value={2}>
                        限制級
                    </Radio>
            {' '}
            <Radio name='class' inline value={6}>
                        情趣商品
                    </Radio>
          </FormGroup> */}

          <ComplexedRadio chagnehandle={this.ItemPageProposalHandle} />

          <FormGroup onChange={this.ItemPageProposalHandle}>
            <ControlLabel>開始時間</ControlLabel>
            {' '}
            <input type='text' name='startdate' placeholder='yyyy-mm-dd' id='startdate' className='form-control mdtextarea' />
          </FormGroup>

          <FormGroup onChange={this.ItemPageProposalHandle}>
            <ControlLabel>結束時間</ControlLabel>
            {' '}
            <input type='text' name='enddate' placeholder='yyyy-mm-dd' id='enddate' className='form-control mdtextarea' />
          </FormGroup>

          <FieldGroup
            id='Suggestedprice'
            type='text'
            label='廠商建議價'
            name='suggestedprice'
            placeholder='廠商建議價'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='Price'
            type='text'
            label='購物中心售價'
            name='price'
            placeholder='購物中心售價'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='Cost'
            type='text'
            label='成本(含稅＋運費)'
            name='cost'
            placeholder='成本'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='Safetystock'
            type='text'
            label='安全庫存量'
            name='safetystock'
            placeholder='安全庫存量'
            onChange={this.ItemPageProposalHandle}
                />

          <FieldGroup
            id='Purchaselimit'
            type='text'
            label='限購數量'
            name='purchaselimit'
            placeholder='限購數量'
            onChange={this.ItemPageProposalHandle}
                />

          {/* <h3>以下是8.1.7</h3> */}
          <h6>cluster</h6>
          <h6>商品規格表</h6>

          <Spec api={apiSubItemPage} sub={this.state.itemPageProposal.subValue} onChange={this.handleMerchandise} AttrNumber={this.state.SpecType} display={displayRename} />
          <br />

          <h6>warranty</h6>
          <Warranty updater={this.warrantyUpdater} />

          <h6>copywriter</h6>
          <CopyWriter updater={this.copywriterUpdater} />

          <h6>imageGroups</h6>

          <br />
          <h6>商品圖上傳</h6>
          {/* <FormGroup> */}
          {/* <ControlLabel>商品圖上傳</ControlLabel> */}
          {/* {' '} */}
          <UploadImages updater={this.imageHandle} />
          {/* </FormGroup> */}

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

export default yahoo
