import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticPages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import WillowKitchenBanner from '../../components/KitchensComp/willowKitchenbanner';


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
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_BENEFITS' } />

  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_4' } />
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_5' } />

</div>
)
}
}