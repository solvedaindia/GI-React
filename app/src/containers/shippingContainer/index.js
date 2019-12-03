import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ContentEspot from '../../components/Primitives/staticContent';
import '../../../public/styles/content.scss';
import Pixels from '../../components/Primitives/pixels';
import { ShippingES} from '../../utils/EspotConstant';
class Shipping extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='staticpage shippingPage'>
          <Pixels espotName={ShippingES.helpMeta} />
        <Breadcrumb {...this.props.match.params} staticName = {'Shipping Information'}/>
        <ContentEspot espotName={ ShippingES.shipping1 } />
        <ContentEspot espotName={ ShippingES.shipping2 } />
        <ContentEspot espotName={ ShippingES.shipping3 } />
      </div>
    );
  }
}

export default Shipping;
