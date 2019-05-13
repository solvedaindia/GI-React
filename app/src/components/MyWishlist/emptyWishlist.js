import React from 'react';


class EmptyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='emptyWishlist'>
        <h1 className='emptyText1'>Your Wishlist is empty </h1>
        <h1 className='emptyText2'>Start addinng items to your wishlist</h1>
      </div>
    )
  }

}

export default EmptyWishlist;