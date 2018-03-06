import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import swal from 'sweetalert'
import update from 'immutability-helper'

// props:
// images = []
class PerviewArea extends Component {
  render () {
    let divStyle = {
      display: 'inline-block',
      padding: '5px',
      height: 150,
      width: 150
    }
    let imageStyle = {
      display: 'inline-block',
      backgroundColor: 'lightyellow',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto'
    }

    return (
        this.props.images.map((image, index) =>
          <div style={divStyle} key={index}>
            <img src={image.preview} style={imageStyle} />
          </div>
        )
    )
  };
}

class UploadImages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      material: [],
      images: []
    }

    this.onImageDrop = this.onImageDrop.bind(this)
  }

  async onImageDrop (acceptedFiles, rejectedFiles) {
    rejectedFiles.forEach(f => window.URL.revokeObjectURL(f.preview))

    acceptedFiles = acceptedFiles.filter(file => !this.state.material.find(item => item.name === file.name))

    // 如果超過10張 提示並指保留到第10張
    if (this.state.material.length + acceptedFiles.length > 10) {
      acceptedFiles = acceptedFiles.splice(0, 10 - this.state.material.length)
      await swal('最多上傳10張唷', {icon: 'warning'})
    }

    this.setState(update(this.state, {
      images: {$push: acceptedFiles},
      material: {$push: acceptedFiles.map(file => {
        let materialItem = {
          name: file.name,
          type: 1,
          content: ''
        }

        const reader = new FileReader()

        reader.onload = (event) => {
          materialItem.content = event.target.result.split('base64,')[1]
        }

        reader.readAsDataURL(file)
        return materialItem
      })}
    }), () => this.props.onDataChanged(this.state.material))
  }

  render () {
    return (
      <div>
        <label>商品照片</label>
        <label>主圖請傳1000x1000px (限制1000K以下) , 副圖請傳1000x1000px或400x400px (限制50K以下) , 最多10張</label>
        <PerviewArea images={this.state.images} />
        <Dropzone
          multiple
          accept='image/*'
          maxSize={1000000}
          onDropAccepted={this.onImageDrop} />
      </div>

    )
  }
}

export default UploadImages
