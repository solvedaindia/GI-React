import React from 'react';import SubCategory from '../../components/GlobalComponents/subCategory';
import  '../../../public/styles/static-pages/inspiration.scss';
import LookbookThemeCarousel from '../../components/Primitives/lookBookTheme';
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
        <div className="container">
          <LookbookThemeCarousel />
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
