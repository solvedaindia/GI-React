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
		CLPData: {},
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
      </section>
    );
  }
}

export default HeaderContainer;
