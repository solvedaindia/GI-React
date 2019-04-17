/**
 *
 * CLPContainer
 *
 */

import React from 'react';
import FullBanner from '../../components/Primitives/slider';
import LivingTheme from '../../components/ClpComponent/subComponents/livingInspiration';

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		clpData: {},
		isLoading: false,
		error: null,
    };
  }

  render() {
    return (
      <section className="clpBase">
        <div className="slider">
          	<FullBanner />
			<LivingTheme />
        </div>
      </section>
    );
  }
}

export default HeaderContainer;
