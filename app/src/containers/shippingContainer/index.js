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
        <div className='staticpage'>
        <Breadcrumb {...this.props.match.params} staticName = {'shipping'}/>
        <ContentEspot espotName={ 'SHIPPING_PAGE_1' } />
        <ContentEspot espotName={ 'SHIPPING_PAGE_2' } />
        <ContentEspot espotName={ 'SHIPPING_PAGE_3' } />
      </div>
    );
  }
}

export default Shipping;
