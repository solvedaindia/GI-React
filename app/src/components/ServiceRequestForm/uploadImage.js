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
    // alert(files.length)
    files.push(file);
    this.setState({
      files:files
    });
    this.props.onImageAddRemove(files)
  }

  onRemoveImage(index)
  {
    console.log("state",this.state.files)
    const f=this.state.files.filter((data,i)=>{return i!=index});
    console.log("array",f);    
    this.setState({
      files:f
    });
    this.props.onImageAddRemove(f)
  }
  
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 add-img-upload">
        
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
