import React from 'react';
import ImageBox from './imageBox'
class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files:[]
    };
  }

  onAddImage(file)
  {
    const files=this.state.files;
     alert(files.length)
    files.push(file);
    this.setState({
      files:files
    });
  //  alert(files.length)
  }

  onRemoveImage(index)
  {
    const files=this.state.files;
    files.splice(index,1);
    this.setState({
      files:files
    });
  }
  
  render() {
    return (
      <div className="form-BgContainer addAddressContainer">
        
        {
          this.state.files.map((data,i)=>{
            console.log("index",data,i)
            return(
                <ImageBox haveImage={true}  file={data} index={i} onRemoveImage={this.onRemoveImage.bind(this)}/>
            )
          })
        }
        {this.state.files.length<5 && <ImageBox haveImage={false} onAddImage={this.onAddImage.bind(this)}/>}
      </div>
    );
  }
}
export default UploadImage;
