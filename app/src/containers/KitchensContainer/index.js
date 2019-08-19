import React, { Component } from 'react';
import  '../../../public/styles/static-pages/kitchens.scss';
import TypesOFkitchens from '../../components/KitchensComp/TypesOfModKitchens';
import DreamKitchens from '../../components/KitchensComp/DreamKitchens';
import InsCrousel from '../../components/Primitives/crousel';
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import KitchenHall from '../../components/KitchensComp/kitchenHall';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import KitchenBanner from '../../components/KitchensComp/kitchenBanner';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import OurPromises from '../../components/KitchensComp/ourPromises';
import InterioText from '../../components/KitchensComp/interiotext';
import LayoutImage from '../../components/KitchensComp/layoutImage';
import FaqEspot from '../../components/Primitives/faq.js';
import KitchenTypesEspot from '../../components/KitchensComp/kitchenTypesEspot';
import EasystepsEspot from '../../components/KitchensComp/easystepsEspot';
import ExKitchens from '../../components/KitchensComp/expKitchens';
import {Link} from 'react-router-dom';
import '../../../public/styles/static-pages/consultForm.scss';
import {imagePrefix} from '../../../public/constants/constants';


export default class Kitchens extends React.Component {
    constructor(props){
        super(props);
      

        this.state = {
       }
    }

   

    render(){
        return (
            <div className="Kitchen-1">
              <div className="kitchensBannerLayout">
                <KitchenBanner />
                <div className="container1">
                  <div className="kitchensBannertext">
                    <a href='#consultForm'><button className="btn-book">Book A Consultation</button></a>
                  </div>
                </div>
              </div>
              <KitchenTypesEspot />
              <EasystepsEspot />
              <LayoutImage />
              <div className="whatgoesSlider">
                <div className="container">
                  <WhatGoes />
                </div>
              </div>
              <div className='AlwaysRememberParent'>
                <div className='container'>
                  <AlwaysRemember />
                </div>
              </div>
              <div className="kitchenHallLayout">
                <KitchenHall />
              </div>
              <div className="beforeAfterSlides">
                <div className="container">
                  <BeforeAfter />
                </div>
              </div>
              <div className="formContainer">
                <div className="container">
                  <img className="formBackGroundCover" src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt="Snow" />
                  <div id='consultForm' className="Form-bakground">
                    <ConsultationForm />
                  </div>
                </div>
              </div>
              <div className="ourprom">
                <OurPromises />
              </div>
 
              
              <FaqEspot />
             
              <ExKitchens/>
              <InterioText />
            </div>
        )
    }
}

