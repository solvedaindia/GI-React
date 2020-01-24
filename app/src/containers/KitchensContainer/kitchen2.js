import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticPages/staticPages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import ChefKitchenBanner from '../../components/KitchensComp/chefKitchenBanner';
import ExKitchens from '../../components/KitchensComp/expKitchens';
import AboutSteelChefKitchen from '../../components/KitchensComp/aboutSteelChefKitchen';
import '../../../public/styles/static-pages/consultForm.scss';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';
import {BOOK_CONSULTATION,KITCHEN_CONSULT,WARDROBE_CONSULT} from '../../constants/app/primitivesConstants';

import {
  imagePrefix,
} from '../../../public/constants/constants';
import ConsultationForm from '../../components/Primitives/ConsultForm';
import KitchenConfiguration from '../../components/KitchensComp/kitchenTabSlider';

export default class ChefKitchenContainer extends React.Component {
constructor(props){
super(props);


this.state = {

}
}


componentDidMount(){
  
}

sShutt()
{
	var target=document.getElementById("steelShutter");
	if(target.style.display=='none') 
	{
		target.style.display='block';
	} 
	else 
	{
		target.style.display='none';
	}
} 
mdfShutt()
{
	var target=document.getElementById("mdfShutter"); 
	if(target.style.display=='none') 
	{
		target.style.display='block';
	}
	else 
	{
		target.style.display='none';
	}
}

render(){
return (
  <>
    <ContentEspot espotName={ 'GI_PIXEL_CHEF_KITCHEN_BODY_START' } />
    <div className="staticpage chefKitchen">
		
			<Pixels espotName= {'GI_PIXEL_CHEF_KITCHEN_META'}/>
		
		  <ChefKitchenBanner />
		  <ContentEspot espotName={ 'GI_STEEL_KITCHEN_BENEFITS' } />
		  <div className="steel-chef-configuration">
			<KitchenConfiguration/>
		  </div>
		  <ContentEspot espotName={ 'GI_STEEL_KITCHEN_SHUTTERS' } />
		  <ContentEspot espotName={ 'GI_STEEL_KITCHEN_ACCESSORIES' } />
		  <div className="formContainer">
			  <ContentEspot espotName={ 'GI_KITCHEN_FORMBACKGROUND_IMG' } />

			  <div id='consultForm' className="formDetails">
					<h2 className="title">{BOOK_CONSULTATION}</h2>
					<p className="desc">{KITCHEN_CONSULT} </p>
					<ConsultationForm />
			  </div>
		  </div>
		  <ContentEspot espotName={ 'GI_STEEL_KITCHEN_FAQ' } />
		  <ExKitchens />
		  <AboutSteelChefKitchen />
		  {/* <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_INTERIOR_CHEF' } /> */}
		  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_10' } />
		  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_11' } />
    </div>
    <ContentEspot espotName={ 'GI_PIXEL_CHEF_KITCHEN_BODY_END' } />
  </>
)
}
}