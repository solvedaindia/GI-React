/**
 *
 * KitchenContainer
 *
 */

import React from 'react';
import  '../../../public/styles/static-pages/kitchens.scss';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';

import KitchenHall from '../../components/KitchensComp/kitchenHall';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
// import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import KitchenBanner from '../../components/KitchensComp/kitchenBanner';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {BOOK_CONSULTATION,KITCHEN_CONSULT,WARDROBE_CONSULT} from '../../constants/app/primitivesConstants';

export class KitchenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
      <>
        <Breadcrumb {...this.props.match.params} staticName={ 'Kitchen Collections' } />
        <ContentEspot espotName={ 'GI_PIXEL_KITCHEN_BODY_START' } />
        <section className="staticpage kitchenContainer">
		   <Helmet>
			 <Pixels espotName= {'GI_PIXEL_KITCHEN_META'}/>
		  </Helmet>
          <div className="slider">
            <KitchenBanner />
          </div>
          <ContentEspot espotName={ 'GI_KITCHEN_TYPES' } />
          <ContentEspot espotName={ 'GI_DREAM_KITCHEN_STEPS' } />
          <ContentEspot espotName={ 'GI_KITCHEN_LAYOUTS' } />
          <WhatGoes />
          <KitchenHall />
          {/*
          <BeforeAfter /> */}
          <div className="formContainer">
			  <ContentEspot espotName={ 'GI_KITCHEN_FORMBACKGROUND_IMG' } />
		
			  <div id='consultForm' className="formDetails">
				<h2 className="title">{BOOK_CONSULTATION}</h2>
				<p className="desc">{KITCHEN_CONSULT} </p>
				<ConsultationForm />
			  </div>
		  </div>
          <ContentEspot espotName={ 'GI_Homepage_Our_Promises' } />
          <ContentEspot espotName={ 'GI_KITCHEN_FAQ' } />
          <KitchenStore />
          <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_INTERIOR' } />
          <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_12' } />
          <ContentEspot espotName={ 'GI_MODULAR_KITCHEN_13' } />
        </section>
        <ContentEspot espotName={ 'GI_PIXEL_KITCHEN_BODY_END' } />
      </>
    );
  }
}

export default KitchenContainer;
