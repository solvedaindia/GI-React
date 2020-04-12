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

  componentWillReceiveProps(nextProp)
  {
        this.setState({
          imageSelected:nextProp.haveImage,
          file1:require('../../../public/images/plpAssests/placeholder-image.png'),
          file:this.props.haveImage?URL.createObjectURL(this.props.file):null,
        })
      
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
  }
  onImageRemoved()
  {
      this.props.onRemoveImage(this.props.index);
      //alert("adsdsfg")
  }


  
  render() {
    console.log("statefile",this.props)
    if(this.state.imageSelected)
    {
        return(
          <div className='uploded-img'>
                <img id="imageContent" className='uploded-img-data' src={URL.createObjectURL(this.props.file)} alt="your image" />
                <button type="button" className='close' onClick={this.onImageRemoved.bind(this)}>X</button>
          </div>
			
        )
    }
    else
    {
      return (
        <div className='upload-img-btn'>
            <input className='upload-img-input' id='product_image' type='file' title="Add Image" onChange={this.onImageSlected.bind(this)} accept="image/*" />
              <p className='text'><span>+</span>Add Image</p>
        </div>
      );
    }
    
  }
}
export default ImageBox;
