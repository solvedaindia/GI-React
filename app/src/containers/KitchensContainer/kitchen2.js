import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticpages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import ChefKitchenBanner from '../../components/KitchensComp/chefKitchenBanner';
import SteelKitchenTypes from '../../components/KitchensComp/typesOfSteelKitchen';
import SteelKitchenBenefits from '../../components/KitchensComp/benefitsOfSteelType';
import YourKitchenYourWay from '../../components/KitchensComp/yourKitchenYourWay';
import FaqEspot from '../../components/Primitives/faq.js';
import ExKitchens from '../../components/KitchensComp/expKitchens';
import '../../../public/styles/static-pages/consultForm.scss';

import {
  imagePrefix,
} from '../../../public/constants/constants';
import ConsultationForm from '../../components/Primitives/ConsultForm';


export default class ChefKitchenContainer extends React.Component {
constructor(props){
super(props);


this.state = {

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
componentDidMount(){
  
}

render(){
return (
<div className="chefKitchen">
  <div className="kitchensBannerLayout">
    <ChefKitchenBanner />
    <div className="container1">
      <div className="kitchensBannertext">
        <a href='#consultForm'><button className="btn-book">Book A Consultation</button></a>
      </div>
    </div>
  </div>
  <SteelKitchenBenefits />
  <div className='typesOfSteelContainer'>
    <div className='container'>
      <SteelKitchenTypes />
    </div>
  </div>
  
  <YourKitchenYourWay />
 
  <div className="formContainer">
    <div className="container">
      <img className="formBackGroundCover"
        src={`${imagePrefix}/B2C/EspotImages/Images/Banners/GI_Homepage_Hero_Banner1.png`} alt="Snow" />
      <div id='consultForm' className="Form-bakground">
        <ConsultationForm />
      </div>
    </div>
  </div>
  <FaqEspot />
  <ExKitchens />
  <ContentEspot espotName = { 'GI_MODULAR_KITCHEN_INTERIOR' } />

  {/* <InterioText /> */}
</div>
)
}
}