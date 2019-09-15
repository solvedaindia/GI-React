import React, { Component } from 'react';
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticPages.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import WillowKitchenBanner from '../../components/KitchensComp/willowKitchenbanner';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';


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
  <>
  <ContentEspot espotName={ 'GI_PIXEL_WILLOW_KITCHEN_BODY_START' } />
<div className="staticpage willowKitchen">
<Helmet>
	<Pixels espotName= {'GI_PIXEL_WILLOW_KITCHEN_META'}/>
</Helmet>
    <WillowKitchenBanner />
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_BENEFITS' } />

  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_4' } />
  <ContentEspot espotName = { 'GI_MODULAR_WILLOW_KITCHEN_5' } />

</div>
<ContentEspot espotName={ 'GI_PIXEL_WILLOW_KITCHEN_BODY_END' } />
</>
)
}
}