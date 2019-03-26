/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import ProductItem from '../GlobalComponents/productItem/productItem';;


class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
    };
  }

  componentDidMount() {
    console.log('plpcommm---', this.props.plpDataPro)
    const plpData = this.props.plpDataPro;
    if (plpData) {
      const item = plpData.map((item, index) => {
        return (
          <ProductItem key={index} data={item} />
        )
      })
      this.setState({ plpItem: item });
    }
    
  }

  render() {

    return (
      <>
        <section className='plpCategories'>
          <div className='container'>
            <div className='row'>
              {this.state.plpItem}
            </div>
          </div>
        </section>
      </>
    );
  }
}

PlpComponent.propTypes = {};

export default PlpComponent;
