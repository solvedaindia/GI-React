import React from 'react';
import { Right } from 'react-bootstrap/lib/Media';

class ImageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title,
      imageSelected:this.props.haveImage,
    };
  }

  onImageSlected=(e)=>
  {
    alert("aa")
    const image  = document.getElementById("imageContent");
    image.src=e.target.result;
    this.setState(
      {
        imageSelected:true,
      }
    )
  }


  
  render() {
    console.log('ddkk')
    if(this.state.imageSelected)
    {
        return(
          <div style={{width: '124px',height: '124px',}}>
                <img id="imageContent" style={{width: '124px',height: '124px',}} src={require('../../../public/images/plpAssests/placeholder-image.png')} alt="your image" />
                <button type="button" onclick="removeUpload()" style={{float:'right',position:'absolute'}}>X</button>
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
            }} type='file' onChange={this.onImageSlected.bind(this)} accept="image/*" />
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
