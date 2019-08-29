import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticpages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import WillowKitchenBanner from '../../components/KitchensComp/willowKitchenBanner';
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
<div className="staticpage willowKitchen">
    <WillowKitchenBanner />
  <SteelKitchenBenefits />
     
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_4' } />
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_5' } />

</div>
)
}
}