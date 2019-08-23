
import React from 'react';
import FullBanner from '../../components/Primitives/slider';
import LivingTheme from '../../components/ClpComponent/subComponents/livingInspiration';
import SubCategory from '../../components/GlobalComponents/subCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import ReadMore from '../../components/GlobalComponents/readMore';
import  '../../../public/styles/static-pages/inspiration.scss';
import InsCrousel from '../../components/Primitives/crousel';
import InspirationBanner from '../../components/InspirationComp/inspirationBanner';
import GodrejSolutionEspot from '../../components/InspirationComp/godrejSolution';

import SummerData from '../../components/InspirationComp/InspEspot';
;
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
      <div className="inspiration">
        <div className="inpspirationBanner">
          <InspirationBanner />
        </div>
        <div className="lookcrouse">
          <InsCrousel />
        </div>
		    <SummerData/>
          <div className="uuscontainer">
            <GodrejSolutionEspot/>
          </div>
      </div>
    );
  }
}

export default Inspiration;;
