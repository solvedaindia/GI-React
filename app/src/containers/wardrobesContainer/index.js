import React, { Component } from 'react';
import  '../../../public/styles/static-pages/warobes.scss';
import DreamKitchens from '../../components/KitchensComp/DreamKitchens';
import InsCrousel from '../../components/Primitives/crousel';
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import WardrobesHAll from '../../components/wardrobesComponent/wardrobeHall.js';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import WardrobesTypes from '../../components/wardrobesComponent/wadrobesTypes';
import WhatGoesward from '../../components/wardrobesComponent/whatgoesWard.js'
import ConsultationForm from '../../components/Primitives/ConsultForm';
import {Link} from 'react-router-dom';
import WbEspots from '../../components/wardrobesComponent/wardrobesBenefits';
import WIEspots from '../../components/wardrobesComponent/wardrobesInterio';
import ExKitchens from '../../components/KitchensComp/expKitchens';
import '../../../public/styles/static-pages/consultForm.scss';


export default class WardrobesContainer extends React.Component {
    constructor(props){
        super(props);
       

        this.state = {
        }
    }
 render(){
        return (
            <div className="wardrobes1">
              <div className="wardroBanner">
                <WardrobeBanner />
              </div>
              <WbEspots />
              <div className="crouselBAckgrounding">
                <div className='container'>
                <WardrobesTypes />
              </div>
              </div>
              <div className='whatGoesContainer'>
                <div className="container">
                  <div className="row">
                    <h1 className="What-goes-into-a-Mod ">What goes into a Modular wardrobe</h1>
                    <p className="whatgoessubhead">Choose from a vast range of acessories. Consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim
                      veniam,
                      quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div className="col-md-6">
                      <h1 className="AccessoriesText">Accessories</h1>
                      <p className="whatGoesPara">Choose from a vast range of acessories. Consectetur
                        adipisicing elit,<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliquat<br />
                        enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor<br /> sit amet, consectetur
                        adipisicing elit.<br /> </p>
                      <ul className="moved">
                        <li> <a className="Materials-and-Finish">Materials and Finishes</a>
                        </li>
                        <li> <a className="Materials-and-Finish">Element</a>
                        </li>
                        <li> <a className="Materials-and-Finish">Add-ones</a>
                        </li>

                      </ul>
                    </div>
                    <div className="col-md-6">
                      <WhatGoesward />

                    </div>
                  </div>
                </div>
              </div>
              <div className='wardroHallCont'>
                <WardrobesHAll />
              </div>
              <div className="formContainer">
                <div className="container">
                  <img className="formBackGroundCover" src='https://203.110.85.50/imagestore/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png' alt="Snow" />
                  <div id='consultForm' className="Form-bakground">
                    <ConsultationForm />
                  </div>
                </div>
              </div>
              <div className="frequesntly">
                <div className="container">
                  <h className="Frequently-Asked-Que">Frequently asked questions</h>
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
                          Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller,
                          regardless
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
                            <li>Fast response/approval times. Many sites take weeks to process a theme or template. And
                              if
                              it gets rejected, there is another iteration. We have aliminated this, and made the
                              process
                              very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                            <li>We are not an exclusive marketplace. This means that you can sell your items on
                              <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase
                              your
                              earning potential.</li>
                            <li>A great 70% flat rate for your items.</li>
                            <li>Fast response/approval times. Many sites take weeks to process a theme or template. And
                              if
                              it gets rejected, there is another iteration. We have aliminated this, and made the
                              process
                              very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                            <li>We are not an exclusive marketplace. This means that you can sell your items on
                              <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase
                              your
                              earning potential.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <ExKitchens/>
              <WIEspots />
              {/* <div className="modularWardrobes">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="heading">Modular Wardrobes</h3>
                      <p className="subText">Godrej Interio is India’s largest furniture brand. From
                        manufacturing the humble Storwel cupboard 80 years back to being a vibrant, innovative brand
                        with a
                        diverse portfolio<br /> – it’s been a brilliant, exciting journey for us.<br />

                        We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering
                        well
                        designed, fun and functional furniture solutions to you.<br />

                        True to the Godrej mission to conserve the environment, we design products, set up processes and
                        use
                        raw materials that are eco-friendly to do our bit to preserve natural<br /> resources.<br />

                        We offer our customers home and office furniture, along with solutions for laboratories,
                        hospitals
                        and healthcare establishments, education and training institutes, shipyards<br /> and navy,
                        auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18
                        cities
                        and through 800 dealer outlets.<br />

                        Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group,
                        one of
                        India’s largest engineering and consumer product groups.</p>
                      <button className="Read-More">Read More</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
        )
    }
}

