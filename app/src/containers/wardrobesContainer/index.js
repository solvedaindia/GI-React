/**
 *
 * Wardrobe Container
 *
 */

import React from 'react';
import '../../../public/styles/static-pages/kitchen.scss';
import '../../../public/styles/staticpages/staticPages.scss';
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import ConsultationForm from '../../components/Primitives/ConsultForm';
import ContentEspot from '../../components/Primitives/staticContent';
import AboutWardrobe from '../../components/wardrobesComponent/aboutWardrobe';
import WHallOfFame from '../../components/wardrobesComponent/wardrobeHall';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';
import {BOOK_CONSULTATION,KITCHEN_CONSULT,WARDROBE_CONSULT} from '../../constants/app/primitivesConstants';

import WardrobeConfiguration from '../../components/wardrobesComponent/wardrobeConfigTabSlider';
import WardrobeAccessoriesConfiguration from '../../components/wardrobesComponent/wardrobeAccessoriesTabSlider';


export class WardrobeContainer extends React.Component {
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
        <ContentEspot espotName = { 'GI_PIXEL_WARDROBES_BODY_START' } />
        <section className="staticpage wardrobesContainer">
        <Helmet>
			<Pixels espotName= {'GI_PIXEL_WARDROBES_META'}/>
		</Helmet>
			<Breadcrumb {...this.props.match.params} staticName = {'Wardrobe Collections'}/>
            <WardrobeBanner />
			<ContentEspot espotName = { 'GI_Wardrobes_Benefit_Modular' } />
            <WardrobeConfiguration />
			<WardrobeAccessoriesConfiguration />
			<div className="formContainer">
			<ContentEspot espotName = { 'GI_WARDROBES_FORMBACKGROUND_IMG' } />
				 <div id='consultForm' className="formDetails">
					<h2 className="title">{BOOK_CONSULTATION}</h2>
					<p className="desc">{WARDROBE_CONSULT} </p>
					<ConsultationForm />
			  </div>
            </div>
            <ContentEspot espotName = { 'GI_WARDROBES_FAQ' } />
            <KitchenStore />
			<ContentEspot espotName={ 'GI_WARDROBES_9' } />
			<ContentEspot espotName={ 'GI_WARDROBES_10' } />
			<ContentEspot espotName={ 'GI_WARDROBES_11' } />

        </section>
        <ContentEspot espotName = { 'GI_PIXEL_WARDROBES_BODY_END' } />
        </>
    );
  }
}

export default WardrobeContainer;
