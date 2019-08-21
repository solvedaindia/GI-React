import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';
import { Link } from 'react-router-dom';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/static-pages/aboutUs.scss';
import apiManager from '../../utils/apiManager';
import {isMobile} from '../../utils/utilityManager';
import {
  imagePrefix,
} from '../../../public/constants/constants';
import AboutTopMost from '../../components/aboutUs/aboutUsTop';
import GreenInitiatives from '../../components/aboutUs/greenInitiatives';
const paraFirst = `The Phase Zero is where we lay the foundation to any project. The first step towards initiating a New Product Development is the Marketing brief, followed by the Research and Study, where the ideas are sculpted and given form. Then, the concept is validated and improvised followed by photo-rendering to give clarity of design and structure.
It is at this level that the Target Green Quotient of this product is defined.
`;
const paraSecond = `The Final product is further refined, and the product prototype is tested for the possible product abuse. For every new and critical process in the design manufacturing, we collaborate with vendors and suppliers to work out the details and preserve the idea.
A final prototype is made if any corrections post testing is required, and this is also checked for the fit and finish. 
`;
const paraThird = `The work in this phase involves actual development of all tools, jigs, fixtures, gauges and special purpose machines and its verification to ensure smooth production of the product. It also includes the Pilot lot production for the final approval for launch. The Design Team contributes to supporting the product managers with requisite documents to prepare the launch communications.
`;
const paraForth = `This phase focuses on making the launch of the product successful by ensuring training, communication, in-store display, and visual merchandising. Besides introducing the product/ solution in an effective manner, this phase also focuses on improvements. Post the first few order executions, a team of the product managers and designers visit the customers to understand their experiences and gather feedback for improvements.
`
const img = `${imagePrefix}/staticImages/aboutUs/teach.jpg`
const images = `${imagePrefix}/staticImages/aboutUs/ourprocessimg.jpg`

export class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `The Phase Zero is where we lay the foundation to any project. The first step towards initiating a New Product Development is the Marketing brief, followed by the Research and Study, where the ideas are sculpted and given form. Then, the concept is validated and improvised followed by photo-rendering to give clarity of design and structure.
          It is at this level that the Target Green Quotient of this product is defined.`,
          image_url: img,
          checked:'active'
        },
        {
          title:'initial Ideation ',
          sub_title:'Brainstorming to the final product',
          paragraph: `The Final product is further refined, and the product prototype is tested for the possible product abuse. For every new and critical process in the design manufacturing, we collaborate with vendors and suppliers to work out the details and preserve the idea.
          A final prototype is made if any corrections post testing is required, and this is also checked for the fit and finish. 
          `,
          image_url: images,
          checked:false
        },
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `The work in this phase involves actual development of all tools, jigs, fixtures, gauges and special purpose machines and its verification to ensure smooth production of the product. It also includes the Pilot lot production for the final approval for launch. The Design Team contributes to supporting the product managers with requisite documents to prepare the launch communications.`,
          image_url: img,
          checked:false
        },
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `This phase focuses on making the launch of the product successful by ensuring training, communication, in-store display, and visual merchandising. Besides introducing the product/ solution in an effective manner, this phase also focuses on improvements. Post the first few order executions, a team of the product managers and designers visit the customers to understand their experiences and gather feedback for improvements.`,
          image_url: images,
          checked:false
        },
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `The work in this phase involves actual development of all tools, jigs, fixtures, gauges and special purpose machines and its verification to ensure smooth production of the product. It also includes the Pilot lot production for the final approval for launch. The Design Team contributes to supporting the product managers with requisite documents to prepare the launch communications.`,
          image_url: img,
          checked:false
        },
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `This phase focuses on making the launch of the product successful by ensuring training, communication, in-store display, and visual merchandising. Besides introducing the product/ solution in an effective manner, this phase also focuses on improvements. Post the first few order executions, a team of the product managers and designers visit the customers to understand their experiences and gather feedback for improvements.`,
          image_url: images,
          checked:false
        },
        {
          title:'initial Ideation',
          sub_title:'Brainstorming to the final product',
          paragraph: `The work in this phase involves actual development of all tools, jigs, fixtures, gauges and special purpose machines and its verification to ensure smooth production of the product. It also includes the Pilot lot production for the final approval for launch. The Design Team contributes to supporting the product managers with requisite documents to prepare the launch communications.`,
          image_url: img,
          checked:false
        }
      ],
      img_url: img,
      content: paraFirst,
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
  for ( var i =0; i<data.length; i++){
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
    img_url: data[index].image_url,
    content: data[index].paragraph,
    title:data[index].title,
    sub_title:data[index].sub_title,
    selected_index:index
  });
  console.log("getImageOnArrowClick",this.state);
}

getImageOnArrowClick = (e) =>{

  const {data} = this.state;
  console.log("getImageOnArrowClick",this.state);
  let index= this.state.selected_index;
  index = index+1;
  console.log("getImageOnArrowClick Index",index);
  if(index>=this.state.data.length)
  {
    index =0;
  }
  for ( var i =0; i<data.length; i++){
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
    img_url: data[index].image_url,
    content: data[index].paragraph,
    title:data[index].title,
    sub_title:data[index].sub_title,
    selected_index:index
  });
  console.log("getImageOnArrowClick",this.state);

}
componentDidMount(){

  const {data,selected_index} = this.state;
  console.log("componentDidMount",data);
  this.setState({
      img_url: data[selected_index].image_url,
      content: data[selected_index].paragraph,
      title:data[selected_index].title,
      sub_title:data[selected_index].sub_title
  });
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
    <div className="About-Us">
      <div className="container">
        <AboutTopMost />
      </div>
      <div className='OurProcessContainer'>
        <div className="container">
          <div className='row'>
            <div className='col-md-12'>
              <h1 className="headingtitle">Our Process</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img className='processBigImg' src={this.state.img_url} alt="image" />
              <div>
                
                {views}
                <button name="arrowClick" className='arrowNumber' onClick={this.getImageOnArrowClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25">
                    <g fill="none" fill-rule="evenodd" stroke="#ffffff">
                      <path strokeWidth="1.892" d="M27 12.7H.2 27z" />
                      <path strokeWidth="1.89" d="M16.7 1.4l10.6 11.3L16.7 24" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-md-6 InitialIdea">
              <h1 className='headingtitle'>{this.state.title}</h1>
              <p className="h4 heading-sub-title">{this.state.sub_title}</p>

 <p className="Paragraphfont">{this.state.content}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='greenContainer'>
        <div className='container'>
          <h1 className='greenTitle'>Green Initiatives</h1>
        </div>
        <GreenInitiatives />
      </div>
      <div className="CareerContainer">
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <div container>
                <div id="cat">
                  <h1 className="careerHeading">Careers</h1>
                  {!isMobile() ? <p className="paragraphCareer">your information is secure and encrypted, consectetur<br />
                    adipisicing elit,sed do eiumsod tempor incididunt ut<br />
                    labore et dalore magna aliqion anim ad minim.
                  </p>:<p className="paragraphCareer">your information is secure and encrypted, consectetur
                    adipisicing elit,sed do eiumsod tempor incididunt ut
                    labore et dalore magna aliqion anim ad minim.
                  </p>}
                  <button className="CareerButton">See More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MediaPress />
    </div>
    );
    }
    }

export default AboutUs;