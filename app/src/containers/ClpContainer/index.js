/**
 *
 * CLPContainer
 *
 */

import React from 'react';
import CLPFullBanner from '../../components/ClpComponent/clpSlider';
import LivingTheme from '../../components/ClpComponent/livingInspiration';
import FeaturedCategory from '../../components/ClpComponent/featuredCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import CLPReadMore from '../../components/ClpComponent/clpReadMore';
import ContentEspot from '../../components/Primitives/staticContent';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';

// import Solution from '../../components/ClpComponent/solution';

export class CLPContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clpData: {},
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
      <>
        <ContentEspot espotName={ 'GI_PIXEL_CLP_BODY_START' } />
         <section className="clpBase">
         <Helmet>
					<Pixels espotName= {'GI_PIXEL_CLP_META'}/>
				</Helmet>
          <div className="slider">
            <CLPFullBanner {...this.props.match.params} />
          </div>
          <Breadcrumb {...this.props.match.params} />
          <FeaturedCategory {...this.props.match.params} />
          <LivingTheme {...this.props.match.params} />
          <BestSeller {...this.props.match.params} />
          <ContentEspot espotName={ 'GI_Homepage_Godrej_Solution' } />
          <CLPReadMore {...this.props.match.params} />
        </section>
        <ContentEspot espotName={ 'GI_PIXEL_CLP_BODY_END' } />

      </>
    );
  }
}

export default CLPContainer;
