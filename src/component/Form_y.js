import React, { Component } from 'react'
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup'
// import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import Radio from 'react-bootstrap/lib/Radio'
import Button from 'react-bootstrap/lib/Button'
// import Checkbox from 'react-bootstrap/lib/Checkbox'
// import Col from 'react-bootstrap/lib/Col'

// my Component
import ItemPageProposal from './ItemPageProposal.js'
// import Categories from './Category1_y.js'
import Spec from './Spec_y.js'
import UploadImages from './UploadImages.js'
// import ComplexedRadio from './ComplexedRadio.js'
// import HandlerCell from './HandlerCell.js'
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
    const nextday = new Date(2018, 1, 31).toLocaleDateString().replace(/\//g, '-')
    super(props)

    this.state = {
      subValue: 0,
      SpecType: 0,
      ItemPageProposal: {
        brand: 'brand',
        cost: '80',
        deliverType: 0,
        deliveryinfo: '0',
        desc: 'desc',
        startdate: today,
        enddate: nextday,
        itemCategoryId: 2674,
        merchandiseSpecType: 0,
        model: 'sku',
        name: 'name',
        price: '100',
        productCategoryId: 2674,
        proposalDueDate: '1-20-2018',
        purchaselimit: '1',
        safetystock: '11',
        proposeSub: '4',
        suggestedprice: '100',
        title: 'title'
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
    this.MerchandiseHandle = this.MerchandiseHandle.bind(this)
    this.postItemPageProposal = this.postItemPageProposal.bind(this)

    this.warrantyUpdater = this.warrantyUpdater.bind(this)
    this.copywriterUpdater = this.copywriterUpdater.bind(this)
    this.imageHandle = this.imageHandle.bind(this)
  }

  // 第一次render完的時候，會執行這個function，mount表示顯示在DOM上(只有第一次被render出來的時候)
  componentDidMount () {
    // fetch url from props
    fetch(apiItemPage, {
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
      var options = data.body.map((item, index) => ({ content: item.subname, value: item.sub, key: index }))
      this.setState({categories: options})
    }.bind(this))
  }

  isNumeric (num) {
    return !isNaN(+num)
  }

  // for 8.1.4
  updateItemPageProposal (change) {
    this.setState({ItemPageProposal: change}, () => console.log(this.state.ItemPageProposal))
  }

  // 8.1.4 submit
  postItemPageProposal (e) {
    e.preventDefault()

    // var data = {'proposalDueDate': '1-15-2018', 'productCategoryId': 2674, 'itemCategoryId': 2674, 'startdate': '2018-01-15', 'enddate': '2018-01-18', 'proposeSub': '4', 'deliverType': '0', 'merchandiseSpecType': '0', 'name': 'name', 'desc': 'desc', 'title': 'title', 'brand': 'brand', 'model': 'sku', 'deliveryinfo': {'type': '0'}, 'suggestedprice': '100', 'price': '100', 'cost': '80', 'safetystock': '11', 'purchaselimit': '1'}
    var data = this.state.ItemPageProposal

    var form = JSON.stringify(data)
    console.log(form)
        // var myHeaders = new Headers({'Content-Type': 'application/json',});
    var options = { method: 'POST',
      body: form }
    var myRequest = new Request(postProposal, options)

        // var form =  new FormData();
        // form.append("json", JSON.stringify ( this.state.ItemPageProposal ));
        // console.log(JSON.stringify ( this.state.ItemPageProposal ))
        // console.log(form);

        // fetch url from props
    fetch(myRequest).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }).then(function (json) {
      var proposalId = json.body.proposalId
      // data 才是實際的 JSON 資料
      // TODO: 狀態確認 200   ,   error and cache 狀態
      console.log('subId:' + proposalId)
      this.setState({id: proposalId})

      // 8.1.7 api url
      var postMerchandise = `${apiYoo}/y/Proposal/${proposalId}/Merchandise`
      options['body'] = JSON.stringify(this.state.Merchandise)
      var request = new Request(postMerchandise, options)
      return fetch(request)
    }.bind(this)).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }).then(function (json) {
      console.log(json)
        // 8.1.9 api url
      var postMaterial = `${apiYoo}/y/Proposal/${this.state.id}/Material`
      options['body'] = JSON.stringify(this.state.Material)
      var request = new Request(postMaterial, options)
      return fetch(request)
    }.bind(this)).then(function (response) {
      // 8.1.10 api url
      var postSubmit = `${apiYoo}/y/Proposal/${this.state.id}/Submit`
      options['body'] = {}
      var request = new Request(postSubmit, options)
      return fetch(request)
    }.bind(this))
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
          <ItemPageProposal data={this.state.ItemPageProposal} categories={this.state.categories} onDataChanged={this.updateItemPageProposal} />

          {/* <h3>以下是8.1.7</h3> */}
          <h6>cluster</h6>
          <h6>商品規格表</h6>

          <Spec api={apiSubItemPage} sub={this.state.ItemPageProposal.subValue} onChange={this.MerchandiseHandle} AttrNumber={this.state.SpecType} display={displayRename} />
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
