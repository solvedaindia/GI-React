import React from 'react';
import { WISHLIST_EMPTY, ITEMS_WISHLIST} from '../../constants/app/myWishListConstants';

class EmptyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="emptyWishlist">
        <div className="heading-Wishlist">{WISHLIST_EMPTY}</div>
        <div className="subtext">{ITEMS_WISHLIST}</div>
      </div>
    );
  }
}

export default EmptyWishlist;
