import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';
import { Link } from 'react-router-dom';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/static-pages/aboutUs.scss';
import apiManager from '../../utils/apiManager';
import {isMobile} from '../../utils/utilityManager';
import {
  imagePrefix,aboutUsOurProcessApi,
} from '../../../public/constants/constants';
import AboutTopMost from '../../components/aboutUs/aboutUsTop';
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
import OurProcess from '../../components/aboutUs/ourProcess';
import ContentEspot from '../../components/Primitives/staticContent';
import Careers from '../../components/aboutUs/careers';

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      img_url: '',
      content: '',
      component_title:'',
      title:'',
      sub_title:'',
      selected_index:0,
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false

    };
  }
handleclick = event => {
  let index = parseInt(event.target.name);
  const {data} = this.state;
  for ( let i =0; i<data.length; i++){
    if(i==index)
    {
        data[i].checked='active'
    }
    else{
      data[i].checked= false
    }
  }
  this.setState({
    data : data,
    img_url: data[index].image_url.imageSrc,
    content: data[index].paragraph,
    title:data[index].title,
    sub_title:data[index].sub_title,
    selected_index:index
  });
  console.log('getImageOnArrowClick',this.state);
}

getImageOnArrowClick = (e) =>{

  const {data} = this.state;
  console.log('getImageOnArrowClick',this.state);
  let index= this.state.selected_index;
  index = index+1;
  console.log('getImageOnArrowClick Index',index);
  if(index>=this.state.data.length)
  {
    index =0;
  }
  for (let i =0; i<data.length; i++){
      if(i==index)
      {
          data[i].checked='active'
      }
      else{
        data[i].checked= false
      }
  }
  this.setState({
    data : data,
    img_url: data[index].image_url.imageSrc,
    content: data[index].paragraph,
    title:data[index].title,
    sub_title:data[index].sub_title,
    selected_index:index
  });
  console.log('getImageOnArrowClick',this.state);

}

getOurProcessData()
{
  apiManager
  .get(aboutUsOurProcessApi)
  .then(response => {
    console.log('getOurProcessData', response)
    const {data} = response || {}
    console.log('getOurProcessData Title', data.data.processData);
    this.setState({
      component_title:data.data.title,
      data :data.data.processData,
      img_url: data.data.processData[0].image_url.imageSrc,
      content: data.data.processData[0].paragraph,
      title:data.data.processData[0].title,
      sub_title:data.data.processData[0].sub_title

    });
    console.log('getOurProcessData state',this.state);
  })
  .catch(error => {
    this.setState({
    });
    console.log('getOurProcessData',error);
  });
}

componentDidMount(){

  const {data,selected_index} = this.state;
  console.log('componentDidMount',data);
  this.getOurProcessData()
  

}

getButtons=(data)=>{
  const views = [];
   for ( var i =0; i<data.length; i++){
     views.push(<button name={i} className={`ProcessNumber ${data[i].checked}`} onClick={this.handleclick}>{i+1}</button>);
   }
  return views;
}


render() {
    let views = this.getButtons(this.state.data);
    return (
    <div className='staticpage about-us'>

      <ContentEspot espotName={ 'GI_ABOUT_US_TOP' } />
      <ContentEspot espotName={ 'GI_ABOUT_US_2' } />
      <a id='ourProcess'>
      <OurProcess />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_4' } />
      <a id='greenInitiatives'>
      <GreenInitiatives />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_6' } />
      <a id='careers' >
      <ContentEspot espotName={ 'GI_CAREERS' } />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_8' } />
      <a id='mediaPress'>
      <ContentEspot espotName={ 'GI_MEDIA_PRESS' } />
      </a>
      <ContentEspot espotName={ 'GI_ABOUT_US_10' } />
    </div>
    );
    }
    }

export default AboutUs;