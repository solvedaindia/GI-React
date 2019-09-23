import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ContentEspot from '../../components/Primitives/staticContent';

import '../../../public/styles/content.scss';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  

 

  render() {
    return (
        <div className='staticpage shippingPage'>
        <Breadcrumb {...this.props.match.params} staticName = {'Shipping Information'}/>
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_1' } />
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_2' } />
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_3' } />
      </div>
    );
  }
}

export default Shipping;
