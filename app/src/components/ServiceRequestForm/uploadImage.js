import React from 'react';
import ImageBox from './imageBox'
import { getCookie } from '../../utils/utilityManager';
import axios from 'axios';
class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files:[],
      uploaded:[],
      percentage:[100,100,100,100,100]
    };
    this.onSubmit=this.onSubmit.bind(this);
  }
  onSubmit()
  {
    this.setState({
      uploaded:[],
    });
  }

  onAddImage(file)
  {
    const files=this.state.files;
    const uploaded=this.state.uploaded;
    files.push(file);
    uploaded.push("")
    const index=uploaded.length-1;
    console.log("statefile at",index)
    this.setState({
      files:files,
      uploaded:uploaded
    });
    //this.props.onImageAddRemove(uploaded)
    this.uploadImageToSerer(file,index)
        
  }

  uploadImageToSerer(file,index)
  {
    var myHeaders = new Headers();
    myHeaders.append("public_key", "somekey");
    var formdata = new FormData();
    formdata.append("userid", getCookie("userID"));
    formdata.append("typeid", this.props.type);
    formdata.append("file", file, file.name);
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };
    // fetch("/imageupload", requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     const res=JSON.parse(result)
    //     const imageUrl=res.fileUrl;
    //     this.updateArray(imageUrl,index)
    //   })
    //   .catch(error => {
    //     console.log("fileupload_Error", error)
    //     updateArray("error",index)
    //   });
    const config = {
      onUploadProgress: (progressEvent)=> {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log("percentCompleted",percentCompleted)
        const per=this.state.percentage;
        per[index]=percentCompleted;
        this.setState({
          percentage:per,
        })
      },
      headers:{public_key: "somekey"}
    }
    axios.post("/imageupload",formdata,config).then((response)=>{
      console.log("imageupload",response);
      this.updateArray(response.data.fileUrl,index)
    }).catch((error)=>{
      console.log("imageuploaderror",error);
    })
  }
  updateArray(imageUrl,index)
  {
    const uploaded=this.state.uploaded;
    uploaded[index]=imageUrl;
    this.setState({
      uploaded:uploaded
    });
    this.props.onImageAddRemove(uploaded)
  }

  onRemoveImage(index,flag)
  {
    if(this.state.uploaded.length<index)
    {
        return;
    }
    if(this.state.uploaded[index]=='error')
    {
      this.updateArrayAfterRemove(index)
    }
    var myHeaders = new Headers();
    myHeaders.append("public_key", "some_key");

    var formdata = new FormData();
    formdata.append("nameFile", this.state.uploaded[index]);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

  fetch("/imagedelete", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      if(flag===undefined)
      {
        this.updateArrayAfterRemove(index)
      }
      
    })
    .catch(error => console.log('error', error));
  }
  updateArrayAfterRemove(index)
  {
     const f=this.state.files.filter((data,i)=>{return i!=index});
     const u=this.state.uploaded.filter((data,i)=>{return i!=index}); 
     this.setState({
       files:f,
       uploaded:u
     });
     this.props.onImageAddRemove(u)
  }
  componentWillUnmount()
  {
    // if(this.props.submitted===true)
    // {
    //   return;
    // }
    // this.state.uploaded.map((data,index)=>{
    //     this.onRemoveImage(index,true)
    // })
  }
  
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 add-img-upload">
        
        {
          this.state.files.map((data,i)=>{
            console.log("index11111",this.state.uploaded,this.state.uploaded.length,i)
            return(
                <ImageBox haveImage={true} url={this.state.uploaded.length>i ? this.state.uploaded[i]:"error"}  
                  file={data} index={i} 
                  percentage={this.state.percentage[i]}
                  onRemoveImage={this.onRemoveImage.bind(this)}/>
            )
          })
        }
        {this.state.files.length<5 && <ImageBox haveImage={false} onAddImage={this.onAddImage.bind(this)}/>}
      </div>
    );
  }
}
export default UploadImage;
