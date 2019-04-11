/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import ProductItem from '../GlobalComponents/productItem/productItem';
import AdBanner from './adBanner';
import LoadingIndicator from '../../utils/loadingIndicator'

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
      adBannerIndex: 12,
    };
  }

  componentWillReceiveProps(nextProps) {
    const plpData = nextProps.plpDataPro;
    if (plpData) {
      const item = plpData.map((item, index) => {
        let adBannerItem = '';
        // console.log('Ad Banner Count Outer ---- ',this.state.adBannerIndex)
        // if (this.state.adBannerIndex === index) {
          
          //adBannerItem = 

        //   this.setState({adBannerIndex: this.state.adBannerIndex + 12});
        //   console.log('Ad Banner Count Inner ---- ',this.state.adBannerIndex)
        // }
        return (
          <>
            <ProductItem key={index} data={item} />
            {<AdBanner indexPro={index}/>}
          </>
        )
      });
      this.setState({ plpItem: item });
    }
  }

  render() {
    return (
      <section className="plpCategories">
        <div className="container">
          <div className="row">
            <h3 className="headingTitle">Tables</h3>
            <div className="headingSubTitle">(Produts 35)</div>
          </div>
          <div className="row no-padding">
            <ul className="plp-products">{this.state.plpItem}</ul>
          </div>
        </div>
      </section>
    );
  }
}

PlpComponent.propTypes = {};

export default PlpComponent;
