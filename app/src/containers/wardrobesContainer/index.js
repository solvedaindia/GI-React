/**
 *
 * Wardrobe Container
 *
 */

import React from 'react';
import  '../../../public/styles/static-pages/kitchen.scss';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import { imagePrefix } from '../../../public/constants/constants';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import WHallOfFame from '../../components/wardrobesComponent/wardrobeHall';
import AboutWardrobe from '../../components/wardrobesComponent/aboutWardrobe';
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticpages/staticpages.scss';

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
        <section className="staticpage kitchenContainer">
            <WardrobeBanner />
			<ContentEspot espotName = { 'GI_Wardrobes_Benefit_Modular' } />

            <WHallOfFame />
			<div className="formContainer">
			<ContentEspot espotName = { 'GI_WARDROBES_FORMBACKGROUND_IMG' } />
				<div id='consultForm' className='formDetails'>
					<ConsultationForm />
				</div>
            </div>
            <ContentEspot espotName = { 'GI_WARDROBES_FAQ' } />
            <KitchenStore />
			<AboutWardrobe />
			<ContentEspot espotName={ 'GI_WARDROBES_9' } />
			<ContentEspot espotName={ 'GI_WARDROBES_10' } />
			<ContentEspot espotName={ 'GI_WARDROBES_11' } />

        </section>
    );
  }
}

export default WardrobeContainer;
