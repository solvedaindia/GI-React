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

export class HeaderContainer extends React.Component {
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
          <SubCategory />
          <LivingTheme />
          <BestSeller />
          {/* <Solution /> */}
          <CLPReadMore />
        </div>
      </section>
    );
  }
}

export default HeaderContainer;
