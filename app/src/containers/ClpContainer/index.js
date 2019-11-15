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
      isLoading: true,
      error: null,
    };
  }
  
   componentDidMount() 
   {
	   console.log(this.props.match.params.id);
		this.getCategoryData(this.props.match.params.id);
   }    
   
   getCategoryData(id) 
   {
    apiManager
      .get(`${catDetailsAPI}${id.toUpperCase()}`)
      .then(response => {
        if (response.data.data) {
          this.setState({ categoryDetails: response.data.data,isLoading:false });
        }
      })
      .catch(error => {
		  console.log(error);
		  this.setState({ categoryDetails: null, isLoading:false });
      });
  }

  componentWillReceiveProps(nextProps) {
	 this.getCategoryData(nextProps.match.params.id);
  }
  render() {
	  if(this.state.isLoading)
	  {
		  return <></>
	  }
    return (
      <>
        <ContentEspot espotName={ 'GI_PIXEL_CLP_BODY_START' + '_'+ this.props.match.params.id.toUpperCase().replace(' ', '') } />
         <section className="clpBase">
		{this.state.categoryDetails ? 
		(<>
       <Pixels 
       espotName= {'GI_PIXEL_CLP_META' + '_'+ this.props.match.params.id.toUpperCase().replace(' ', '')}
       title={this.state.categoryDetails.pageTitle}
       description={this.state.categoryDetails.metaDescription}
       kewords={this.state.categoryDetails.categoryName + ' ' + this.state.categoryDetails.shortDescription}
       />
		 </>
		):null}
		   
          <div className="slider">
            <CLPFullBanner {...this.props.match.params} />
          </div>
		  
          <Breadcrumb catBreadCrumb={this.state.categoryDetails.categoryName}/>
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
