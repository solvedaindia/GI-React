import React from 'react';
import '../../public/styles/loadingIndicator/loadingIndicator.scss';

const loadingImg = (
  <img
    className="loadingIndicatorStyle-outter"
    src={require('../../src/components/SVGs/loading-spinning-bubbles.svg')}
  />
);
class LoadingIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="loader-modal">{loadingImg}</div>;
  }
}

export default LoadingIndicator;
