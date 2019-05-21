import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import TopContainer from './topContainer'

class CompPrd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    renderProducts = () => {
      var prds = [];
      this.props.data.map(element => {
        prds.push(<TopContainer product={element} />)
      });
      return prds;
    }
    render() {
      return (
        <div>
          {this.renderProducts()}
        </div>
      );
    }
}

export default CompPrd;
