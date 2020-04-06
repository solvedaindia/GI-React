import React from 'react';
import { Right } from 'react-bootstrap/lib/Media';

class ImageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title,
      imageSelected:this.props.haveImage,
      file1:require('../../../public/images/plpAssests/placeholder-image.png'),
      file:this.props.haveImage?URL.createObjectURL(this.props.file):null,
    };
  }

  onImageSlected=(event)=>
  {
    const fsize = event.target.files[0].size;
    const file = Math.round((fsize / 1024)); 
    console.log("File",event.target.files[0]);
    if(file>10240)
    {
        alert("Image is too Big, please select a image less than 10mb")
        event.target.value=null
        return;
    }
    this.props.onAddImage(event.target.files[0])
    event.target.value=null
    // this.setState(
    //   {
    //     imageSelected:true,
    //     file: URL.createObjectURL(event.target.files[0])
    //   }
    // )
  }
  onImageRemoved()
  {
      this.props.onRemoveImage(this.props.index);
      //alert("adsdsfg")
  }


  
  render() {
    if(this.state.imageSelected)
    {
        return(
          <div style={{width: '124px',height: '124px',}}>
                <img id="imageContent" style={{width: '124px',height: '124px',}} src={this.state.file} alt="your image" />
                <button type="button" onClick={this.onImageRemoved.bind(this)} style={{float:'right',position:'absolute'}}>X</button>
          </div>
			
        )
    }
    else
    {
      return (
        <div style={{width:'124px',height:'124px'}}>
          <div style={{backgroundColor:'#cff6ff',border:'2px solid #0daed4'}}>
            <input style={{
              position: 'absolute',
              margin: '0',
              padding: '0',
              width: '124px',
              height: '124px',
              outline: 'none',
              opacity: '0',
              cursor: 'pointer'
            }}  id='product_image' type='file' title="Add Image" onChange={this.onImageSlected.bind(this)} accept="image/*" />
            <div style={{textAlign:'center'}}>
              <h3>+<br/>Add Image</h3>
            </div>
          </div>
        </div>
      );
    }
    
  }
}
export default ImageBox;
