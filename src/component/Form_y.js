import React, { Component } from 'react'
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Radio from 'react-bootstrap/lib/Radio'
import Button from 'react-bootstrap/lib/Button'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import Col from 'react-bootstrap/lib/Col'

// my Component
import Categories from './Category1_y.js'
import Spec from './Spec_y.js'
import UploadImages from './UploadImages.js'
import ComplexedRadio from './ComplexedRadio.js'
import HandlerCell from './HandlerCell.js'
import Warranty from './Warranty.js'
import CopyWriter from './CopyWriter.js'

var apibs = `http://localhost:8888/4kit/4kit_backend/public/4kit`
var apiRich = `http://localhost:8888/4kit/4kit_backend/public/4kit`
var isProd = true
var apiYoo = isProd ? apibs : apiRich
var apiItemPage = apiYoo + `/y/ItemPage`
var apiSubItemPage = apiYoo + `/y/SubItemPage/`
var postProposal = apiYoo + `/y/Proposal`

function FieldGroup ({ id, label, help, inputRef, FormGroupClass, ...props }) {
  return (
    <FormGroup controlId={id} bsClass={FormGroupClass}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} inputRef={inputRef} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class yahoo extends Component {
    // 設定state初始值: 紀錄下拉式選單選項
  constructor (props) {
    const today = new Date().toLocaleDateString().replace(/\//g, '-')
    const nextday = new Date(2017, 11, 1).toLocaleDateString().replace(/\//g, '-')
    super(props)

    this.state = {
      subValue: 0,
      SpecType: 0,
      ItemPageProposal: {
        proposalDueDate: today,
        productCategoryId: 2674,
        itemCategoryId: 2674,
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
    this.ItemPageProposalHandle = this.ItemPageProposalHandle.bind(this)
    this.MerchandiseHandle = this.MerchandiseHandle.bind(this)
    this.postItemPageProposal = this.postItemPageProposal.bind(this)

    this.warrantyUpdater = this.warrantyUpdater.bind(this)
    this.copywriterUpdater = this.copywriterUpdater.bind(this)
    this.imageHandle = this.imageHandle.bind(this)
  }

  isNumeric (num) {
    return !isNaN(+num)
  }

  // for 8.1.4
  ItemPageProposalHandle (e) {
    var categoryName = e.target.name
    var categoryValue = e.target.value
    var inputType = e.target.type

        // TODO rewrite isNumric function
    if (this.isNumeric(categoryValue)) {
            // categoryValue =ㄌ;
    };

    var change = this.state.ItemPageProposal

    if (categoryName === 'deliveryinfo') {
            // TODO: 找類似的簡化
      var id = e.target.id

      if (inputType === 'radio') { id = 'type' }

      if (!change[categoryName]) {
        change[categoryName] = {}
      }

      change[categoryName][id] = categoryValue

            // if (inputType === "radio"){
            // 	change[categoryName] = {
            // 		type: categoryValue
            // 	}
            // } else {
            // 	var id =  e.target.id;
            // 	change[categoryName][id] = categoryValue

            // }
    } else {
      change[categoryName] = categoryValue
    }

    this.setState({ ItemPageProposal: change})

        // TODO: 直接指向原本的變數
    if (e.target.name === 'merchandiseSpecType') {
      this.setState({SpecType: categoryValue})
    }

        // TODO: 直接指向原本的變數
    if (e.target.name === 'proposeSub') {
      this.setState({subValue: categoryValue})
    }
  }

    // 8.1.4 submit
  postItemPageProposal (e) {
    e.preventDefault()

        // var data = {"proposalDueDate":"2017-10-24","productCategoryId":2674,"itemCategoryId":2674,"price":1000,"cost":100,"safetystock":10};
    var data = this.state.ItemPageProposal

    var form = JSON.stringify(data)
    console.log(form)
        // var myHeaders = new Headers({'Content-Type': 'application/json',});
    var options = { method: 'POST',
      body: form }
    var myRequest = new Request(postProposal, options)

    var _this = this

        // var form =  new FormData();
        // form.append("json", JSON.stringify ( this.state.ItemPageProposal ));
        // console.log(JSON.stringify ( this.state.ItemPageProposal ))
        // console.log(form);

        // fetch url from props
    fetch(myRequest).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        var data = response.json()
        console.log(data)
        return data.body.proposalId
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }).then(function (proposalId) {
      // data 才是實際的 JSON 資料
      // TODO: 狀態確認 200   ,   error and cache 狀態
      console.log(proposalId)
      this.setState({id: proposalId})

      // 8.1.7 api url
      var postMerchandise = `${apiYoo}/y/Proposal/${proposalId}/Merchandise`
      options['body'] = JSON.stringify(_this.state.Merchandise)
      var request = new Request(postMerchandise, options)
      return fetch(request)
    }).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        var data = response.json()
        console.log(data)
        // 8.1.9 api url
        var postMaterial = `${apiYoo}/y/Proposal/${this.state.id}/Material`
        options['body'] = JSON.stringify(_this.state.Material)
        var request = new Request(postMaterial, options)
        return fetch(request)
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }).then(function (response) {
      // 8.1.10 api url
      var postSubmit = `${apiYoo}/y/Proposal/${this.state.id}/Submit`
      options['body'] = {}
      var request = new Request(postSubmit, options)
      return fetch(request)
    })
  }

  // update warranty object
  warrantyUpdater (obj) {
    var obj_state = this.state

    obj_state.Merchandise.warranty = obj

    this.setState(obj_state, function () { console.log(this.state.Merchandise) })
  }

    // update copywriter object
  copywriterUpdater (obj, index) {
    var obj_state = this.state

    obj_state.Merchandise.copywriter[index] = obj

    this.setState(obj_state, function () { console.log(this.state.Merchandise) })
  }

    // for 8.1.7
  MerchandiseHandle (e, type) {
    var handleName = e.target.name
    var handleValue = e.target.value

    if (type === 'cluster_attrs') {
      var changes = {}
      var cluster = this.state.Merchandise.cluster
      var attrs = cluster.attrs
      var hasAttr = this.state.ItemPageProposal.merchandiseSpecType ? this.state.ItemPageProposal.merchandiseSpecType !== 0 : false

      if (hasAttr && attrs.length > 0) {
        // attr 有東西 需判斷是否已經填過
        var index = attrs.findIndex(function (attr, index, array) {
          if (attr.name === handleName) return true
          return false
        })

        if (index > -1) {
          // 已經填過該attr 修改選項
          if (e.target.type === 'checkbox') {
            // checkbox 可複選 增加或刪除 該選項

            // 搜尋欲填入的選項
            var valueIndex = attrs[index].indexOf(handleValue)

            if (valueIndex > -1) {
              // 選項已選過 刪除
              attrs[index].values.splice(valueIndex, 1)
            } else {
              // 選項未選過 加入
              attrs[index].values.push(handleValue)
            }
          } else {
            // radio 單選 改選項
            attrs[index].values = handleValue
          }
        } else {
          changes['name'] = handleName
          changes['values'] = handleValue

          attrs.push(changes)
        }
      } else {
        attrs[handleName] = handleValue
      }

      cluster.attrs = attrs
      this.setState(cluster, function () { console.log(this.state) })
    } else if (type === 'merchandises') {
      // var state = this.state
      // obj_state.Merchandise.merchandises
    } else if (type === 'warranty') {
      var warranty = this.state.Merchandise.warranty
      warranty[handleName] = handleValue
      this.setState(warranty, function () { console.log(this.state) })
    } else {
      console.log('other: ' + handleName + ' ' + handleValue)
    }

        // change.Merchandise[e.target.name] = e.target.value;
        // this.setState(change,function(){console.log(this.state.Merchandise)});
  }

    // 8.1.9
  imageHandle (images) {
    var obj_state = this.state
    obj_state.Material = images
    this.setState(obj_state)
  }

    // 8.1.10

  render () {
    var displayRename = this.state.ItemPageProposal.merchandiseSpecType ? this.state.ItemPageProposal.merchandiseSpecType : 0
    return (
      <div className='form'>

        {/* <h3>8.1.4</h3> */}
        <form onSubmit={this.postItemPageProposal}>
          {/* <FieldGroup
                id="Proposer"
                type="text"
                label="提案人"
                placeholder="請輸入中文全名"
                /> */}

          <FormGroup controlId='Subname' onChange={this.ItemPageProposalHandle}>
            <ControlLabel>提案站別 / 對象</ControlLabel>
            <Categories api={apiItemPage} />
          </FormGroup>

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

          {/* TODO: 複合式選單 */}
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

          <Spec api={apiSubItemPage} sub={this.state.subValue} onChange={this.MerchandiseHandle} AttrNumber={this.state.SpecType} display={displayRename} />
          <br />
          <h6>warranty</h6>
          <Warranty updater={this.warrantyUpdater} />

          <h6>copywriter</h6>
          <CopyWriter updater={this.copywriterUpdater} />
          <h6>imageGroups</h6>

          <br />
          <h6>商品圖上傳</h6>
          <FormGroup>
            {/* <ControlLabel>商品圖上傳</ControlLabel> */}
            {/* {' '} */}
            <UploadImages updater={this.imageHandle} />
          </FormGroup>
          <form />

          <br />
          {/* <h3>以上是8.1.7</h3> */}
          <br />

          <Button type='submit'>Submit</Button>
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
