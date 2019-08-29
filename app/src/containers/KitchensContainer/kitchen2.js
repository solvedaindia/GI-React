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


componentDidMount(){
  
}

render(){
return (
<div className="staticpages chefKitchen">
    <ChefKitchenBanner />
    <ContentEspot espotName = { 'GI__STEEL_KITCHEN_BENEFITS' } />
    <SteelKitchenTypes />
    <ContentEspot espotName = { 'GI__STEEL_YOUR_KITCHEN_YOUR_WAY' } />
 
  <div className="formContainer">
    <div className="container">
    <ContentEspot espotName = { 'GI_KITCHEN_FORMBACKGROUND_IMG' } />

      <div id='consultForm' className="Form-bakground">
        <ConsultationForm />
      </div>
    </div>
  </div>
  <ContentEspot espotName = { 'GI_KITCHEN_FAQ' } />
  <ExKitchens />
  <ContentEspot espotName = { 'GI_MODULAR_KITCHEN_INTERIOR' } />
  <ContentEspot espotName = { 'GI_MODULAR_KITCHEN_10' } />
  <ContentEspot espotName = { 'GI_MODULAR_KITCHEN_11' } />

</div>
)
}
}