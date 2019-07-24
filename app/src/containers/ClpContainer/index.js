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
import Solution from '../../components/ClpComponent/solution';

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
      <section className="clpBase">
        <div className="slider">
          <CLPFullBanner />
		</div>
          <SubCategory />
          <LivingTheme />
          <BestSeller />
          {/* <Solution /> */}
          <CLPReadMore />
      </section>
    );
  }
}

export default CLPContainer;
