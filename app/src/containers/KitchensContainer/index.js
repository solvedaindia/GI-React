import React, { Component } from 'react'
import  '../../../public/styles/kitchens/kitchens.scss'
import TypesOFkitchens from '../../components/KitchensComp/TypesOfModKitchens'
import DreamKitchens from '../../components/KitchensComp/DreamKitchens'
import InsCrousel from '../../components/Primitives/crousel'
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import KitchenHall from '../../components/KitchensComp/KitchenHall';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';



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
        <img
                      className="Rectangle"
                      src={require('../../../public/images/kitch1.jpg')}
                      alt="rectangle"
                    />
                   <div className="text-block">
                   
                    <h4 className="header">Interio Kitchens</h4>
   <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br /> the home you've always wanted</p2> <br />
   <button className="butt">Book A Consultation</button>
  </div>

        <TypesOFkitchens />
        <div className="container">
        <h1 className="-easy-steps-to-your">4 easy steps to your dream kitchen</h1>
        \        <DreamKitchens />
       </div>
       <div className="row">
           <div className="col-md-6">
               <div className="Backgrounding">
                   <h1 className="Image-gallery  .text-style-1">10 space-saving kitchen layouts</h1>                  
</div>
           </div>
           <div className="col-md-6">
           <img
                      className="Mask"
                      src={require('../../../public/images/mask@3x.png')}
                      alt="rectangle"
                    />
           </div>
       </div>
       <div className="container">
           <p1 className="What-goes-into-a-Godr">What goes into a Godrej Kitchen</p1>
        {/* <InsCrousel/> */}
               <WhatGoes />

        <div>
                    <h2 className="Name-Copy">Behind the Scenes Description</h2>
                    <p4 className="This-project-require">This project required a huge amount of hours but  sit amet, consectetur adipisicing elit, sed do <br/>eiusmod tempor incididunt ut labore et dolore magna aliquat enim ad minim.</p4>

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
       
                    
                    <div class="container">
                    

  <img className="Fullhalf" src={require('../../../public/images/sm4.jpg')} alt="Snow"/>

  <img  className="Group-24" src={require('../../../public/images/arrowimg.png')} alt="Snows"/>
</div>

<div class="container">
                    

                    <img className="reactang" src={require('../../../public/images/behindForm.png')} alt="Snow"/>
                  
<div className="Form-bakground">
  </div>                  
</div>




       
       </div>
       </div>
       </div>
            </div>
        )
    }
}

