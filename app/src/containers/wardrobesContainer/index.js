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
        <section className="staticpage wardrobesContainer">
			
            <WardrobeBanner />
			<Breadcrumb {...this.props.match.params} staticName = {'Wardrobe Collections'}/>
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
