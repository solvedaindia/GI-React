import React from 'react';
import { Right } from 'react-bootstrap/lib/Media';
import CircularProgressBar from './CircularProgressBar'

class ImageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title,
      imageSelected:this.props.haveImage,
      file:this.props.haveImage?URL.createObjectURL(this.props.file):null,
    };
  }

  componentWillReceiveProps(nextProp)
  {
        this.setState({
          imageSelected:nextProp.haveImage,
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
        alert("Image is too big, please select a image less than 10mb")
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
   
    if(this.state.imageSelected)
    {
      console.log("statefile",this.props.url)
        return(
          <div className='uploded-img'>
                <img id="imageContent" className='uploded-img-data' src={URL.createObjectURL(this.props.file)} alt="your image" />
                {this.props.url!=='' && <button type="button" className='close' onClick={this.onImageRemoved.bind(this)}>X</button>}
                {this.props.url==='' && <div className="circle-container">
                  <CircularProgressBar
                      strokeWidth="5"
                      sqSize="70"
                      percentage={this.props.percentage}/>
                </div>}
                
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
