/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import ProductItem from '../GlobalComponents/productItem/productItem';
import AdBanner from './AdBanner/adBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';
import LoadingIndicator from '../../utils/loadingIndicator';

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
      adBannerIndex: 12,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.parsePLPData(nextProps.plpDataPro);
  }

  componentDidMount() {
    this.parsePLPData(this.props.plpDataPro);
  }

  parsePLPData(data) {
    const plpData = data;
    if (plpData) {
      const item = plpData.map((item, index) => {
        return (
          <>
            <ProductItem key={index} data={item} />
            {<AdBanner indexPro={index + 1} />}
          </>
        );
      });
      this.setState({ plpItem: item });
    }
  }

  render() {
    return (
      <div className="row no-padding">
        <ul className="plp-products grid3">{this.state.plpItem}</ul>
      </div>
    );
  }
}

PlpComponent.propTypes = {};

export default PlpComponent;
