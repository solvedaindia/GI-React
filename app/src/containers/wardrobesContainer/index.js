/**
 *
 * Wardrobe Container
 *
 */

import React from 'react';
import '../../../public/styles/static-pages/wardrobes.scss';
import '../../../public/styles/staticPages/staticPages.scss';
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import ConsultationForm from '../../components/Primitives/ConsultForm';
import ContentEspot from '../../components/Primitives/staticContent';
import AboutWardrobe from '../../components/wardrobesComponent/aboutWardrobe';
import WHallOfFame from '../../components/wardrobesComponent/wardrobeHall';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';
import {
  BOOK_CONSULTATION,
  WARDROBE_CONSULT,
} from '../../constants/app/primitivesConstants';

import WardrobeConfiguration from '../../components/wardrobesComponent/wardrobeConfigTabSlider';
import WardrobeAccessoriesConfiguration from '../../components/wardrobesComponent/wardrobeAccessoriesTabSlider';
import WardrobeTypes from '../../components/wardrobesComponent/wardrobeTypes';

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
        {/* <ContentEspot espotName = { 'GI_PIXEL_WARDROBES_BODY_START' } /> */}
        <Breadcrumb
          {...this.props.match.params}
          staticName="Wardrobe Collections"
        />
        <section className="staticpage wardrobesContainer">
          <Pixels espotName="GI_PIXEL_WARDROBES_META" />
          <div className="slider">
            <WardrobeBanner />
          </div>
          <WardrobeTypes />
          <ContentEspot espotName="GI_DREAM_WARDROBES_STEPS" />
          <div className="formContainer">
            <ContentEspot espotName="GI_WARDROBES_FORMBACKGROUND_IMG" />
            <div id="consultForm" className="formDetails">
              <h2 className="title">{BOOK_CONSULTATION}</h2>
              <p
                className="desc"
                dangerouslySetInnerHTML={{ __html: WARDROBE_CONSULT }}
              />
              <ConsultationForm sourcePage="wardrobes" />
            </div>
          </div>
          <ContentEspot espotName="GI_Homepage_Our_Promises" />
        </section>
        {/* <ContentEspot espotName = { 'GI_Wardrobes_Benefit_Modular' } />
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
			<ContentEspot espotName={ 'GI_WARDROBES_11' } /> */}
        {/* <ContentEspot espotName = { 'GI_PIXEL_WARDROBES_BODY_END' } /> */}
      </>
    );
  }
}

export default WardrobeContainer;
