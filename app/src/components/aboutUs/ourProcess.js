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

export class OurProcess extends React.Component {
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
 
      <div className='OurProcessContainer' id='design-process'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='headingtitle'>{this.state.component_title}</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <img className='processBigImg' src={imagePrefix + this.state.img_url} alt='image' />
              <div>
                
                {views}
                <button name='arrowClick' className='arrowNumber' onClick={this.getImageOnArrowClick} >
                  <svg xmlns='http://www.w3.org/2000/svg' width='29' height='25' viewBox='0 0 29 25'  >
                    <g fill='none' fill-rule='evenodd' stroke='#000000'>
                      <path strokeWidth='1.892' d='M27 12.7H.2 27z' />
                      <path strokeWidth='1.89' d='M16.7 1.4l10.6 11.3L16.7 24' />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-md-6 InitialIdea'>
              <h1 className='headingtitle'>{this.state.title}</h1>
              	<p className=' heading-sub-title'>{this.state.sub_title}</p>
 				<p className='Paragraphfont'>{this.state.content}</p>
            </div>
          </div>
        </div>
      </div>
     
    );
    }
    }

export default OurProcess;