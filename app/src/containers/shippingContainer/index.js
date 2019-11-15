import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ContentEspot from '../../components/Primitives/staticContent';
import '../../../public/styles/content.scss';
import Pixels from '../../components/Primitives/pixels';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='staticpage shippingPage'>
          <Pixels espotName={'GI_PIXEL_HELP_META'} />
        <Breadcrumb {...this.props.match.params} staticName = {'Shipping Information'}/>
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_1' } />
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_2' } />
        <ContentEspot espotName={ 'GI_SHIPPING_PAGE_3' } />
      </div>
    );
  }
}

export default Shipping;
