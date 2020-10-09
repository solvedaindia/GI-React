import React from 'react';
import Category from '../../Category/category';
class HeaderL2 extends React.Component {
  state = {
    layer2Data: {},
    isLoading: true,
    errors: null,
  };

  render() {
    return <Category />;
  }
}

export default HeaderL2;
