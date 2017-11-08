import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

// Dropzone Component
import Dropzone from 'react-dropzone'

// props:
// images = []
class PerviewArea extends Component {
    render(){
    var test="test"
    var divStyle = {
        display: "inline-block",
        padding: "5px",
        height: 150,
        width: 150
    }
    var imageStyle = {
        display: "inline-block",
        backgroundColor: "lightyellow",
        maxWidth:"100%",
        maxHeight:"100%",
        width: "auto",
        height: "auto",
    };
    
    return (
        this.props.images.map( (image,index) =>
            <div style={divStyle} key={index}>
                <img src={image.preview} style={imageStyle} ></img> 
            </div>
        )                
    )
    };
}

class UploadImages extends Component {
    constructor(props) {
		super(props);
		this.state = {
            images:[],
            Material:[]
        };
	}
    
    onImageDrop(acceptedFiles){
        var obj_state = this.state;
        
        // 接收到的圖檔塞進 images_arr
        acceptedFiles.map( image => obj_state.images.push(image) );

        // 如果超過10張 提示並指保留到第10張
		if (obj_state.images.length > 10){
            obj_state.images.splice( 10, (obj_state.images.length - 10) );
            alert("最多上傳10張唷");
        };
        
        
        
		// 轉換成base64 寫進Material
		acceptedFiles.map( function(file){
            var materialItem = {
                name: "",
                type: 1,
                content: ""
            };

            const reader = new FileReader();
            
			reader.onload = (event) => {
                var base64_img = event.target.result.split("base64,")[1];

                materialItem.content = base64_img;
				
            };
            
            reader.readAsDataURL(file);
            materialItem.name = file.name;

            obj_state.Material.push( materialItem );

        });
        
        this.setState(obj_state, function(){
            this.props.updater(this.state.Material);
        });

	}
    
    render(){
    return(
    <FormGroup>
        <ControlLabel>商品照片</ControlLabel>
        <HelpBlock>主圖請傳1000x1000px (限制1000K以下) , 副圖請傳1000x1000px或400x400px (限制50K以下) , 最多10張</HelpBlock>
        <PerviewArea images={this.state.images}/>
        <Dropzone
            multiple={true}
            accept="image/*"
            maxSize = {1000000}
            onDropAccepted={this.onImageDrop.bind(this)} >
        </Dropzone>
    </FormGroup>
        	
    );
    }
}

export default UploadImages;