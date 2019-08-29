import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticpages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import ChefKitchenBanner from '../../components/KitchensComp/chefKitchenBanner';
import SteelKitchenBenefits from '../../components/KitchensComp/benefitsOfSteelType';


export default class WillowKitchens extends React.Component {
constructor(props){
super(props);


this.state = {

}
}


componentDidMount(){
  
}

render(){
return (
<div className="staticpages willowKitchen">
    <ChefKitchenBanner />
  <SteelKitchenBenefits />
     
  <ContentEspot espotName = { 'GI_MODULAR_KITCHEN_INTERIOR' } />
  <ContentEspot espotName = { 'GI_MODULAR_CHEF_KITCHEN_4' } />
  <ContentEspot espotName = { 'GI_MODULAR_CHEF_KITCHEN_5' } />

</div>
)
}
}