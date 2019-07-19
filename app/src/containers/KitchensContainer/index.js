import React, { Component } from 'react'
import  '../../../public/styles/kitchens/kitchens.scss'
import TypesOFkitchens from '../../components/KitchensComp/TypesOfModKitchens'
import DreamKitchens from '../../components/KitchensComp/DreamKitchens'
import InsCrousel from '../../components/Primitives/crousel'
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import KitchenHall from '../../components/KitchensComp/kitchenHall';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import KitchenBanner from '../../components/KitchensComp/kitchenBanner';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import OurPromises from '../../components/KitchensComp/OurPromises';



export default class Kitchens extends React.Component {
    constructor(props){
        super(props);
        const scatchImg1 =  require('../../../public/images/scatch1.png')
        const scatchImg2 =  require('../../../public/images/btnsch2.jpg')
        const scatchImg3 =  require('../../../public/images/btnsch3.jpg') 

        this.state = {
            imgList: [scatchImg1,scatchImg2,scatchImg3],
index: 0
        }
    }

    onHandleClickFirst= () => {
        if (this.state.index === 0 || this.state.index === 2){
          this.setState({index:1})
        } 
      };
      onHandleClickSecond(){
        if (this.state.index === 0 || this.state.index === 1){
          this.setState({index:2})
        } 
      }
      onHandleClickThird(){
        if (this.state.index === 1 || this.state.index === 2){
          this.setState({index:0})
        }
      }

    render(){
        return (
            <div className="Kitchen-1">
              <div className="kitchensBanner">
                <KitchenBanner />
                <div className="container1">
                  <div className="kitchensBannertext">
                    <h4 className="heading">Interio Kitchens</h4>
                    <p className="subText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod<br /> tempor incididunt ut labore et dolore magna aliqua. <br />
                      the home you've always wanted</p>
                    <button className="btn-book">Book A Consultation</button>

                  </div>
                </div>
              </div>
              <div className="typesofkitch">
              <h1 className="Types-of-Modular-Kit">Types of Modular Kitchens</h1>
            
              <TypesOFkitchens />
              </div>
              <div className="easySteps">
              <div className="container">
                <h1 className="-easy-steps-to-your">4 easy steps to your dream kitchen</h1>
                <DreamKitchens />
              </div>
              </div>
              <div className="kichenLayoutbanner clearfix">
                <div className="textBox">
                  <h1 className="Image-gallery">10 space-saving kitchen layouts</h1>
                  <button className="btn-bookBlog">Read Our Block</button>
                </div>
                <div className="imgBox">
                  <img className="kichenBlog" src={require('../../../public/images/mask@3x.png')} alt="rectangle" />
                </div>
              </div>
              <div className="whatgoesSlider">
              <div className="container">
                <WhatGoes />
                <h3 className="Name-Copy">Behind the Scenes Description</h3>
                <p className="This-project-require">This project required a huge amount of hours but sit amet,
                  consectetur adipisicing elit, sed do <br />eiusmod tempor incididunt ut labore et dolore magna
                  aliquat enim ad minim.</p>
              </div>
              </div>
              <AlwaysRemember /> 
              <div className="kitchenHallLayout">
              <KitchenHall />
              </div>
            
                  

                   <div className="beforeAfterSlides">
                    <div className="container">

                      <BeforeAfter />
                    </div>
                    </div>
                
             
              <div className="container">
                <img className="reactang" src={require('../../../public/images/inspi9.jpg')} alt="Snow" />
                <div className="Form-bakground">
                  <h2 className="Book-a-consultation">Book a consultation</h2>
                  <p className="Answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor. </p>

                  <ConsultationForm />
                </div>

              </div>
                <OurPromises />
              <div className="frequesntly">
                <h className="Frequently-Asked-Que">Frequently asked questions</h><br /><br />
                <div className="panel-group" id="accordion">


                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseTwo">What do I need to start my project?</a>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse">
                      <div className="panel-body">
                        Any registed user, who presents a work, which is genuine and appealing, can post it on
                        <strong>PrepBootstrap</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseThree">What warranty does Godrej Interio have for its products?</a>
                      </h4>
                    </div>
                    <div id="collapseThree" className="panel-collapse collapse">
                      <div className="panel-body">
                        I want to customize one of your products, can I do that?:
                        <ul>
                          <li>Register an account</li>
                          <li>Activate your account</li>
                          <li>Go to the <strong>Themes</strong> section and upload your theme</li>
                          <li>The next step is the approval step, which usually takes about 72 hours.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseFive">Want to customize one of your products, can I do that?</a>
                      </h4>
                    </div>
                    <div id="collapseFive" className="panel-collapse collapse">
                      <div className="panel-body">
                        Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller, regardless
                        of any restrictions, such as volume, date of entry, etc.
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseSix">Are there any delivery charges or installation charges?</a>
                      </h4>
                      <br></br>
                    </div>
                    <div id="collapseSix" className="panel-collapse collapse">
                      <div className="panel-body">
                        There are a number of reasons why you should join us:
                        <ul>
                          <li>A great 70% flat rate for your items.</li>
                          <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if
                            it gets rejected, there is another iteration. We have aliminated this, and made the process
                            very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                          <li>We are not an exclusive marketplace. This means that you can sell your items on
                            <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your
                            earning potential.</li>
                          <li>A great 70% flat rate for your items.</li>
                          <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if
                            it gets rejected, there is another iteration. We have aliminated this, and made the process
                            very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                          <li>We are not an exclusive marketplace. This means that you can sell your items on
                            <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your
                            earning potential.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <div className="faqHeader">Sellers</div> */}

                </div>
              </div>
              <div className="kitchenFaciliies">
              <div className="container">
                <img className="bigSofa" src={require('../../../public/images/inspi9.jpg')} alt="rectangle" />
                <div className="text-block">
                  <img className="UUs-with-tagline-1" src={require('../../../public/images/u-us-with-tagline-1.jpg')}
                    alt="rectangle" />
                  <h4 className="Image-gallery-Copy-3 ">Godrej Interior Solutions</h4>
                  <p className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br />
                    the home you've always wanted</p> <br />
                  <button className="seeMore">Know More</button>
                </div>
                </div>
              </div>
              <div className="modularKitches">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                  <h3 className="heading2">Interio Kitchens</h3>
                  <p className="subText2">Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel cupboard 80 years back to being a vibrant, innovative brand with a diverse portfolio – it’s been a brilliant, exciting journey for us.

We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you.

True to the Godrej mission to conserve the environment, we design products, set up processes and use raw materials that are eco-friendly to do our bit to preserve natural resources.

We offer our customers home and office furniture, along with solutions for laboratories, hospitals and healthcare establishments, education and training institutes, shipyards and navy, auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets. 

Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of India’s largest engineering and consumer product groups.</p>
                  
                  <button className="Read-More2">Read More</button>
                  </div>
                </div>
               
              </div>
              </div>
            </div>
        )
    }
}

