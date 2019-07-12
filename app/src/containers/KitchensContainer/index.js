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
               <div className="container">
               <KitchenBanner />
               <div className="text-block">
 <h4 className="header">Interio Kitchens</h4>
                 <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br />
                   the home you've always wanted</p2> <br />
                 <button className="butt">Book A Consultation</button>
               </div>
               </div>

               <TypesOFkitchens />
               <div className="container">
                 <h1 className="-easy-steps-to-your">4 easy steps to your dream kitchen</h1>
                 \
                 <DreamKitchens />
               </div>
               <div className="row">
                 <div className="col-md-6">
                   <div className="Backgrounding">
                     <h1 className="Image-gallery  .text-style-1">10 space-saving kitchen layouts</h1>
                   </div>
                 </div>
                 <div className="col-md-6">
                   <img className="Mask" src={require('../../../public/images/mask@3x.png')} alt="rectangle" />
                 </div>
               </div>
               <div className="container">
                 <p1 className="What-goes-into-a-Godr">What goes into a Godrej Kitchen</p1>
                 {/*
                 <InsCrousel /> */}
                 <WhatGoes />

                 <div>
                   <h2 className="Name-Copy">Behind the Scenes Description</h2>
                   <p4 className="This-project-require">This project required a huge amount of hours but sit amet,
                     consectetur adipisicing elit, sed do <br />eiusmod tempor incididunt ut labore et dolore magna
                     aliquat enim ad minim.</p4>

                 </div>
               </div>
               <AlwaysRemember />
               <KitchenHall />
               <div className="container">
                 <div className="col-md-12">
                   <div className="row-md-6">
                     <div className="container">
                       <div className="Blacks">
                         <div className="container">
                           <h1 className="What-goes-into-a-Godr">Why People Love our Kitchens</h1>
                           <WhyPeopleLove />
                           <h1 className="Naming">Alvin Simon</h1>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="row-md-6">


                     <div className="container">

                       <BeforeAfter />
                     </div>
                   </div>
                 </div>
               </div>
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
                 <div className="text-block">
                   <img className="UUs-with-tagline-1" src={require('../../../public/images/u-us-with-tagline-1.jpg')}
                     alt="rectangle" />
                   <h4 className="Image-gallery-Copy-3 ">Godrej Interior Solutions</h4>
                   <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br />
                     the home you've always wanted</p2> <br />
                   <button className="seeMore">Know More</button>
                 </div>

               </div>
               <div className="aboutgodrej">
                 <h className="About-Godrej-Interio ">Interio Kitchens</h><br /><br />
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

             </div>
          
        )
    }
}

