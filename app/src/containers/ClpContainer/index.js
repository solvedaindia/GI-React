/**
 *
 * CLPContainer
 *
 */

import React from 'react';
import CLPFullBanner from '../../components/ClpComponent/clpSlider';
import LivingTheme from '../../components/ClpComponent/livingInspiration';
import SubCategory from '../../components/ClpComponent/subCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import CLPReadMore from '../../components/ClpComponent/clpReadMore';
import ContentEspot from '../../components/Primitives/staticContent';
// import Solution from '../../components/ClpComponent/solution';

export class CLPContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clpData: {},
      isLoading: false,
      error: null,
    };
    console.log('CLP Props', props);
  }

  render() {
    return (
      <section className="clpBase">
        <div className="slider">
          <CLPFullBanner {...this.props.match.params}/>
		    </div>
          <SubCategory {...this.props.match.params}/>
          <LivingTheme {...this.props.match.params}/>
          <BestSeller {...this.props.match.params}/>
          <ContentEspot espotName = { 'GI_Homepage_Godrej_Solution' } />
          <CLPReadMore {...this.props.match.params}/>
      </section>
    );
  }
}

export default CLPContainer;
