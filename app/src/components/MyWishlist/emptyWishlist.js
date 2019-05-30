import React from 'react';

class EmptyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="emptyWishlist">
        <div className="heading-Wishlist">Your Wishlist is empty </div>
        <div className="subtext">Start addinng items to your wishlist</div>
      </div>
    );
  }
}

export default EmptyWishlist;
