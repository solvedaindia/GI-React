import React, { Component } from 'react';
import '../../../public/styles/static-pages/chefkitchen.scss';
import  '../../../public/styles/staticpages/staticPages.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import WillowKitchenBanner from '../../components/KitchensComp/willowKitchenbanner';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';
import ExKitchens from '../../components/KitchensComp/expKitchens';
import {BOOK_CONSULTATION,KITCHEN_CONSULT} from '../../constants/app/primitivesConstants';
import '../../../public/styles/static-pages/consultForm.scss';
import ConsultationForm from '../../components/Primitives/ConsultForm';
import WillowKitchenConfiguration from '../../components/KitchensComp/willowKitchenTabSlider';

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
			  <WillowKitchenConfiguration/>
			  <ContentEspot espotName={ 'GI_WILLOW_KITCHEN_SHUTTERS' } />
			  <ContentEspot espotName={ 'GI_WILLOW_KITCHEN_ACCESSORIES' } />
			  <div className="formContainer">
				  <ContentEspot espotName={ 'GI_KITCHEN_FORMBACKGROUND_IMG' } />
				  <div id='consultForm' className="formDetails">
						<h2 className="title">{BOOK_CONSULTATION}</h2>
						<p className="desc">{KITCHEN_CONSULT} </p>
						<ConsultationForm />
				  </div>
			  </div>
			  <ContentEspot espotName={ 'GI_WILLOW_KITCHEN_FAQ' } />
			  <ExKitchens />

			  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_INTERIOR_WILLOW' } />

			  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_10' } />
			  <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_11' } />
   		 </div>
		<ContentEspot espotName={ 'GI_PIXEL_WILLOW_KITCHEN_BODY_END' } />
		</>


	)
	}
}