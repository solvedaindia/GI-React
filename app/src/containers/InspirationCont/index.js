import React from 'react';
import SubCategory from '../../components/GlobalComponents/subCategory';
import  '../../../public/styles/static-pages/inspiration.scss';
import LookbookThemeCarousel from '../../components/Primitives/lookBookTheme';
import InspirationBanner from '../../components/InspirationComp/inspirationBanner';
import GodrejSolutionEspot from '../../components/InspirationComp/godrejSolution';
import  '../../../public/styles/staticpages/staticPages.scss';
import ContentEspot from '../../components/Primitives/staticContent';

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
      <div className="staticpage inspiration">
        <InspirationBanner />
        <LookbookThemeCarousel />
        <ContentEspot espotName={ 'GI_INSPIRATION_SUMMER' } />
         <ContentEspot espotName={ 'GI_Homepage_Godrej_Solution' } />
          <ContentEspot espotName={ 'GI_LOOKBOOK_5' } />
        <ContentEspot espotName={ 'GI_LOOKBOOK_6' } />
      </div>
    );
  }
}

export default Inspiration;;
