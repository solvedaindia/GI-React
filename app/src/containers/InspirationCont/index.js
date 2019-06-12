/**
 *
 * CLPContainer
 *
 */

import React from 'react';
import FullBanner from '../../components/Primitives/slider';
import LivingTheme from '../../components/ClpComponent/subComponents/livingInspiration';
import SubCategory from '../../components/GlobalComponents/subCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import ReadMore from '../../components/GlobalComponents/readMore';

export class Inspiration extends React.Component {
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
          	<FullBanner />
			<SubCategory />
			<LivingTheme />
			<BestSeller />
			<ReadMore />
        </div>
      </section>
    );
  }
}

export default Inspiration;
