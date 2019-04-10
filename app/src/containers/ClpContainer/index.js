/**
 *
 * CLPContainer
 *
 */

import React from 'react';
import FullBanner from '../../components/Primitives/slider';

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerData: {},
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
      <section className="clpBase">
        <div className="slider">
          <FullBanner />
        </div>
        {/* <div className="navigation">
          <HeaderL1 />
          <HeaderL2 />
        </div> */}
      </section>
    );
  }
}

export default HeaderContainer;
