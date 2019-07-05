import React, { Component } from 'react'
import  '../../../public/styles/wardrobes/warobes.scss'
import DreamKitchens from '../../components/KitchensComp/DreamKitchens'
import InsCrousel from '../../components/Primitives/crousel'
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import WardrobesHAll from '../../components/wardrobesComponent/wardrobeHall.js';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import WardrobesTypes from '../../components/wardrobesComponent/wadrobesTypes';
import WhatGoesward from '../../components/wardrobesComponent/whatgoesWard.js'


export default class WardrobesContainer extends React.Component {
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
           
             <div className="Kitchen-11">
               <WardrobeBanner />
               <div className="text-blocks">
                 <h4 className="header">Modular Wardrobe Ardra</h4>
                 <p2 className="A-one-stop-shop-inte">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/> tempor incididunt ut labore et dolore magna aliqua. <br />
                   the home you've always wanted</p2> <br />
                 <button className="butt">Book A Consultation</button>
               </div>

               <div>
                   <h1 className="Benefits-of-Modular">Benefits of Modular Wardrobes</h1>
                   <div className="container">
                   <div className="row">
                       <div className="col-md-1">
                       <img className="Combined-Shape" src={require('../../../public/images/ic1.png')} alt="rectangle" />
<h3 className="titlesss">modular</h3>
                       </div>
                       <div className="col-md-1">
                       <img className="Combined-Shape" src={require('../../../public/images/ic2.png')} alt="rectangle" />
                       <h3 className="titlesss">modular</h3>

                       </div>
                       <div className="col-md-1">
                       <img className="Combined-Shape" src={require('../../../public/images/ic3.png')} alt="rectangle" />
                       <h3 className="titlesss">modular</h3>

                       </div>
                       <div className="col-md-1">
                       <img className="Combined-Shape" src={require('../../../public/images/ic4.png')} alt="rectangle" />
                       <h3 className="titlesss">modular</h3>

                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-2">
                       <img className="Combined-Shape" src={require('../../../public/images/ic5.png')} alt="rectangle" />
                       <h3 className="titlesss">modular</h3>

                       </div>
                       <div className="col-md-2">
                       <img className="Combined-Shape" src={require('../../../public/images/ic6.png')} alt="rectangle" />
                       <h3 className="titlesss">modular</h3>

                       </div>

                   </div>
                   </div>
               </div>
              
              <div className="crouselBAckground">
                  <h1 className="Types-of-Modular-War">Types of Modular Wardrobes</h1>
                  <WardrobesTypes/>
                  
               {/* <KitchenHall /> */}
              
               </div>
               <div className="container">
                  
              <div className="row">
              <h1 className="What-goes-into-a-Mod ">What goes into a Modular wardrobe</h1>
<p1 className="Choose-from-a-vast-r ">Choose from a vast range of acessories. Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore<br/> et dolore magna aliquat enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p1>
                <div className="col-md-6">
                <h1 className="Accessories">Accessories</h1>
<p1 className="Choose-from-a-vast-r-Copy ">Choose from a vast range of acessories. Consectetur adipisicing elit,<br/> sed do eiusmod tempor incididunt ut labore et dolore magna aliquat<br/>  enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor<br/>  sit amet, consectetur adipisicing elit.<br/> </p1>
                 
<ul className="moved">
  <li className="Materials-and-Finish">Materials and Finishes</li>
  <li className="Materials-and-Finish">Element</li>
  <li className="Materials-and-Finish">Add-ones</li>

</ul>
                </div>
                <div className="col-md-6">
<WhatGoesward/>

                </div>
              </div>
              </div>
              <WardrobesHAll/>
               <div className="container">
                 <img className="reactang" src={require('../../../public/images/inspi9.jpg')} alt="Snow" />
                 <div className="Form-bakground">
                   <h2 className="Book-a-consultation">Book a consultation</h2>
                   <p4 className="Answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                     tempor. </p4>
                 </div>

               </div>
               <div className="promises">
                 <h className="Our-Promises">Our promises</h>
               </div>
               <div className="frequesntly">
                 <h className="Frequently-Asked-Que">Frequently asked questions</h>
               </div>
               <div className="container">
                 <img className="bigSofa" src={require('../../../public/images/inspi9.jpg')} alt="rectangle" />
                 <div class="text-block">
                   <img className="UUs-with-tagline-1" src={require('../../../public/images/u-us-with-tagline-1.jpg')}
                     alt="rectangle" />
                   <h4 className="Image-gallery-Copy-3 ">Godrej Interior Solutions</h4>
                   <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br />
                     the home you've always wanted</p2> <br />
                   <button className="seeMore">Know More</button>
                 </div>

               </div>
               <div className="aboutgodrej">
                 <h className="About-Godrej-Interio ">Modular Wardrobes</h><br /><br />
                 <p1 className="Godrej-Interio-is-In">Godrej Interio is India’s largest furniture brand. From
                   manufacturing the humble Storwel cupboard 80 years back to being a vibrant, innovative brand with a
                   diverse portfolio<br /> – it’s been a brilliant, exciting journey for us.<br />

                   We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering well
                   designed, fun and functional furniture solutions to you.<br />

                   True to the Godrej mission to conserve the environment, we design products, set up processes and use
                   raw materials that are eco-friendly to do our bit to preserve natural<br /> resources.<br />

                   We offer our customers home and office furniture, along with solutions for laboratories, hospitals
                   and healthcare establishments, education and training institutes, shipyards<br /> and navy,
                   auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18 cities
                   and through 800 dealer outlets.<br />

                   Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of
                   India’s largest engineering and consumer product groups.</p1>
                 <br /><button className="Read-More ">Read More</button>
               </div>

               <div></div>
             </div>
          
        )
    }
}

