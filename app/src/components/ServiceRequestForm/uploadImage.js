import React from 'react';
import ImageBox from './imageBox'
class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: this.props.title
    };
  }

  
  render() {
    console.log('ddkk')
    return (
      <div className="form-BgContainer addAddressContainer">
        
        <ImageBox haveImage={true}/>
        <ImageBox haveImage={true}/>
        <ImageBox haveImage={true}/>
        <ImageBox haveImage={false}/>
      </div>
    );
  }
}
export default UploadImage;
