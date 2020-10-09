
import React from 'react';
import  '../../../public/styles/static-pages/cookie.scss'
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';

export class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		
    };

  }

  render() {
    return (
      <div className='staticpage cookiepolicy'>
         <Pixels espotName={'GI_PIXEL_FURNITURE_META'} />
	  {/* <Breadcrumb {...this.props.match.params} staticName = {'Cookie Policy'}/> */}
    <Breadcrumb {...this.props.match.params} staticName = {'Furniture'}/>
      <ContentEspot espotName={ 'GI_Cookie_Policy_Static_Data' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_2' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_3' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_4' } />
      <ContentEspot espotName={ 'GI_Cookie_Policy_5' } />
      
    </div>

    );
  }
}

export default CookiePolicy;
