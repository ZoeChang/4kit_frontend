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
            images:[]
        };
	}
    
    onImageDrop(acceptedFiles){
        var images_arr = this.state.images;
        
        acceptedFiles.map( image => images_arr.push(image) );

		if (images_arr.length > 10){
            images_arr.splice( 10, (images_arr.length - 10) );
            alert("最多上傳10張唷");
        };

		var updated = {images: images_arr};
		this.setState(updated, function(){console.log(this.state)});
		
		// TODO: submit時 轉成base64
		// 轉換成base64 
		// acceptedFiles.map( function(file){
		// 	const reader = new FileReader();
		// 	reader.onload = (event) => {
		// 		console.log(event.target.result);
		// 		
		// 	};
		// 	reader.readAsDataURL(file)
		// });

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