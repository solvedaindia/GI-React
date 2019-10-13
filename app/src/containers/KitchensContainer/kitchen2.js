import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticPages.scss';
;
import ContentEspot from '../../components/Primitives/staticContent';
import ChefKitchenBanner from '../../components/KitchensComp/chefKitchenBanner';
import SteelKitchenTypes from '../../components/KitchensComp/typesOfSteelKitchen';
import SteelKitchenBenefits from '../../components/KitchensComp/benefitsOfSteelType';
import YourKitchenYourWay from '../../components/KitchensComp/yourKitchenYourWay';
import FaqEspot from '../../components/Primitives/faq.js';
import ExKitchens from '../../components/KitchensComp/expKitchens';
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
		<Helmet>
			<Pixels espotName= {'GI_PIXEL_KITCHEN_META'}/>
		</Helmet>
		  <ChefKitchenBanner />
		  <ContentEspot espotName={ 'GI_STEEL_KITCHEN_BENEFITS' } />
		  <KitchenConfiguration/>
		  <ContentEspot espotName={ 'GI_STEEL_YOUR_KITCHEN_YOUR_WAY' } />
		  <div className="formContainer">
			  <ContentEspot espotName={ 'GI_KITCHEN_FORMBACKGROUND_IMG' } />

			  <div id='consultForm' className="formDetails">
					<h2 className="title">{BOOK_CONSULTATION}</h2>
					<p className="desc">{KITCHEN_CONSULT} </p>
					<ConsultationForm />
			  </div>
		  </div>
		  <ContentEspot espotName={ 'GI_KITCHEN_FAQ' } />
		  <ExKitchens />
		  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_INTERIOR_CHEF' } />
		  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_10' } />
		  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_11' } />
    </div>
    <ContentEspot espotName={ 'GI_PIXEL_CHEF_KITCHEN_BODY_END' } />
  </>
)
}
}