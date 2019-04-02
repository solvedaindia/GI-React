/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import ProductItem from '../GlobalComponents/productItem/productItem';

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
    };
  }

  componentDidMount() {
    const plpData = this.props.plpDataPro;
    if (plpData) {
      const item = plpData.map((item, index) => (
        <ProductItem key={index} data={item} />
      ));
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
