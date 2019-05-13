import React from 'react';
import EmptyWishlist from './emptyWishlist';
import '../../../public/styles/myWishlist/myWishlist.scss';
import '../../../public/styles/plpContainer/plpContainer.scss';
import PlpComponent from '../PlpComponent/index';
import {
  plpAPI,

} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

class MyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistData: [],
    };
  }

  componentDidMount() {
    this.fetchPLPProductsData();
  }

  fetchPLPProductsData() {
    this.setState({ isLoading: true }, () => {
      /**
       * TODO: Category ID is static from Node side.
       */

      const plpURL =
        `${plpAPI + '12540'}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&` +
        `orderby=${this.props.sortingValue}&${this.props.updatedFilter}`;
      // let newStoreId = '';
      // if (categoryId === '12540') {
      //   newStoreId = '10151';
      // } else {
      //   newStoreId = '10801';
      // }

      apiManager
        .get(plpURL, {
          headers: {
            store_id: '10151',
            cat_details: false,

          },
        })
        .then(response => {
          console.log('PLP Response----', response.data);
          this.setState({
            wishlistData: response.data.data.productList
          })
        })
        .catch(error => {
          // console.log('PLPBannerrror---', error);


        });
    });
  }

  render() {
    return (
      <div className='myWishlist'>
        <h3 className='headingTitle'>My Wishlist</h3>
        <section className="plpCategories">
          <PlpComponent
            plpDataPro={this.state.wishlistData}
            isFromWishlistPro={true}
          />
        </section>
        {/* <EmptyWishlist/> */}
      </div>


    );
  }

}

export default MyWishlist;