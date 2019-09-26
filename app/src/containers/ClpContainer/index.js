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
import apiManager from '../../utils/apiManager';
import {catDetailsAPI,
} from '../../../public/constants/constants';

// import Solution from '../../components/ClpComponent/solution';

export class CLPContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clpData: {},
	  categoryDetails:null,
      isLoading: false,
      error: null,
    };
  }
  
    
   componentDidMount() 
   {
    apiManager
      .get(`${catDetailsAPI}${this.props.match.params.id.toUpperCase()}`)
      .then(response => {
        if (response.data.data) {
          this.setState({ categoryDetails: response.data.data });
        }
      })
      .catch(error => {
		  console.log(error);
      });
  }

  render() {
    return (
      <>
        <ContentEspot espotName={ 'GI_PIXEL_CLP_BODY_START' + '_'+ this.props.match.params.id.toUpperCase().replace(' ', '') } />
         <section className="clpBase">
		{this.state.categoryDetails ? 
		(<>
			<Helmet>
			 <Pixels espotName= {'GI_PIXEL_CLP_META' + '_'+ this.props.match.params.id.toUpperCase().replace(' ', '')}/>
			 <title>{this.state.categoryDetails.pageTitle}</title>            
			 <meta name="description" content={this.state.categoryDetails.metaDescription} />
			 <meta name="keywords" content={this.state.categoryDetails.categoryName + ' ' + this.state.categoryDetails.shortDescription} />
			</Helmet>
		 </>
		):null}
		   
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
        <ContentEspot espotName={ 'GI_PIXEL_CLP_BODY_END' + '_'+ this.props.match.params.id.toUpperCase().replace(' ', '') } />

      </>
    );
  }
}

export default CLPContainer;
