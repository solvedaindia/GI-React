import React from 'react';
import MediaPress from '../../components/aboutUs/mediaPress';
import { Link } from 'react-router-dom';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import WidgetList from '../../components/HomePageStatic/widgetList';
import  '../../../public/styles/static-pages/aboutUs.scss';
import apiManager from '../../utils/apiManager';
import {isMobile} from '../../utils/utilityManager';
import {
  espotAPI,
  storeId,
  accessToken,
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
          title:'initial Ideation 1',
          sub_title:'Brainstorming to the final product 1',
          paragraph: `The Phase Zero is where we lay the foundation to any project. The first step towards initiating a New Product Development is the Marketing brief, followed by the Research and Study, where the ideas are sculpted and given form. Then, the concept is validated and improvised followed by photo-rendering to give clarity of design and structure.
          It is at this level that the Target Green Quotient of this product is defined.`,
          image_url: img
        },
        {
          title:'initial Ideation 2 ',
          sub_title:'Brainstorming to the final product 2',
          paragraph: `The Final product is further refined, and the product prototype is tested for the possible product abuse. For every new and critical process in the design manufacturing, we collaborate with vendors and suppliers to work out the details and preserve the idea.
          A final prototype is made if any corrections post testing is required, and this is also checked for the fit and finish. 
          `,
          image_url: images
        },
        {
          title:'initial Ideation 3',
          sub_title:'Brainstorming to the final product 3',
          paragraph: `The work in this phase involves actual development of all tools, jigs, fixtures, gauges and special purpose machines and its verification to ensure smooth production of the product. It also includes the Pilot lot production for the final approval for launch. The Design Team contributes to supporting the product managers with requisite documents to prepare the launch communications.`,
          image_url: img
        },
        {
          title:'initial Ideation 4',
          sub_title:'Brainstorming to the final product 4',
          paragraph: `This phase focuses on making the launch of the product successful by ensuring training, communication, in-store display, and visual merchandising. Besides introducing the product/ solution in an effective manner, this phase also focuses on improvements. Post the first few order executions, a team of the product managers and designers visit the customers to understand their experiences and gather feedback for improvements.`,
          image_url: images
        },
        {
          title:'initial Ideation 5',
          sub_title:'Brainstorming to the final product 5',
          paragraph: `Over the negative fusses another requisite. A copied analysis describes a priest behind the powered railroad. The definitive shame stretches throughout the generic trigger. The jungle enjoys the poetic taxi. Its angry brigade plays below the textual sister. The fatuous container pants after the noble.`,
          image_url: img
        },
        {
          title:'initial Ideatio 6',
          sub_title:'Brainstorming to the final product 6',
          paragraph: `With her grandfather elaborates the hideous lecture. A contract truncates a dead item. A convenience simulates the impaired urge past the mill. Will the burned swamp name the raised fog? Does the garden frown our individual orbit? A wine mentions the copyright monopoly.`,
          image_url: images
        },
        {
          title:'initial Ideation 7 ',
          sub_title:'Brainstorming to the final product 7',
          paragraph: `When can the component weight the magical banner? A performing musical soaps a clash. The rarer constraint disconnects the prerequisite. How will a banner designer triumph after the incentive?`,
          image_url: img
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
    if(event.target.name == 1) {
        this.setState({
            img_url: img,
            content: paraSecond,
            button1: 'active',
            button2: false,
            button3: false,
            button4: false,
            button5: false,
            button6: false,
            button7: false,
        })
    }
   else if(event.target.name == 2) {
    this.setState({
      img_url: images,
      content: paraThird,
      button2: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 3) {
  this.setState({
      img_url:img,
      content: paraForth,
      button3: 'active',
      button1: false,
      button2: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,

  })
}
else if(event.target.name == 4) {
  this.setState({
      img_url:images,
      content: paraSecond,
      button4: 'active',
      button1: false,
      button3: false,
      button2: false,
      button5: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 5) {
  this.setState({
      img_url:img,
      content: paraFirst,
      button5: 'active',
      button1: false,
      button3: false,
      button4: false,
      button2: false,
      button6: false,
      button7: false,
  })
}
else if(event.target.name == 6) {
  this.setState({
      img_url:images,
      content: paraSecond,
      button6: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button2: false,
      button7: false,
  })
}
else if(event.target.name == 7) {
  this.setState({
      img_url:img,
      content: paraFirst,
      button7: 'active',
      button1: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button2: false,

  })
}
}

getImageOnArrowClick = (e) =>{

  const {data} = this.state;
  console.log("getImageOnArrowClick",this.state);
  let selected_index= this.state.selected_index;
  selected_index = selected_index+1;
  console.log("getImageOnArrowClick",selected_index);
  if(selected_index==this.state.data.length)
  {
    selected_index =0;
  }
  this.setState({
    img_url: data[selected_index].image_url,
    content: data[selected_index].paragraph,
    title:data[selected_index].title,
    sub_title:data[selected_index].sub_title,
    selected_index:selected_index
  });
  console.log("getImageOnArrowClick",this.state);
//   if (e.target.name == 'arrowClick'){
//   if (this.state.img_url == images) {
//     this.setState({
//       img_url: img
//       })
//   }
//   else if (this.state.img_url == img) {
//     this.setState({
//       img_url: images
//       })
//   }
  
  
// }
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


render() {
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
                <button name="1" className={`ProcessNumber ${this.state.button1}`} onClick={this.handleclick}>1</button>
                <button name="2" className={`ProcessNumber ${this.state.button2}`} onClick={this.handleclick}>2</button>
                <button name="3" className={`ProcessNumber ${this.state.button3}`} onClick={this.handleclick}>3</button>
                <button name="4" className={`ProcessNumber ${this.state.button4}`} onClick={this.handleclick}>4</button>
                <button name="5" className={`ProcessNumber ${this.state.button5}`} onClick={this.handleclick}>5</button>
                <button name="6" className={`ProcessNumber ${this.state.button6}`} onClick={this.handleclick}>6</button>
                <button name="7" className={`ProcessNumber ${this.state.button7}`} onClick={this.handleclick}>7</button>
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