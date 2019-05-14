import React from 'react';
import { connect } from 'react-redux';
import EmptyWishlist from './emptyWishlist';
import '../../../public/styles/myWishlist/myWishlist.scss';
import '../../../public/styles/plpContainer/plpContainer.scss';
import PlpComponent from '../PlpComponent/index';
import {
  plpAPI,
  myWishlistAPI

} from '../../../public/constants/constants';
import { getReleventReduxState } from '../../utils/utilityManager';
import apiManager from '../../utils/apiManager';

class MyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      wishlistData: [],
    };
  }

  componentDidMount() {
    this.fetchMyWishlistData();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.wishlistUpdatedCount + '  this Porps ', this.props.wishlistUpdatedCount)
    if (nextProps.wishlistUpdatedCount !== this.props.wishlistUpdatedCount) {
      this.fetchMyWishlistData();
    }
  }

  fetchMyWishlistData() {
    console.log('fetchMyWishlistData Called');
    apiManager
      .get(myWishlistAPI, {})
      .then(response => {
        console.log('PLP Response----', response.data);
        console.log('Wishlist ITem Count --- ', response.data.data.wishlistItemCount)
        this.setState({
          wishlistData: response.data.data.wishlistData,
          isLoading: true
        })
      })
      .catch(error => {
        console.log('PLPBannerrror---', error);
        this.setState({
          error: error.message,
          isLoading: false,
        });

      });

  }

  render() {

    const wishlistItem = <>
      <h3 className='headingTitle'>My Wishlist</h3>
      <section className="plpCategories">
        <PlpComponent
          plpDataPro={this.state.wishlistData}
          isFromWishlistPro={true}
        />
      </section>
    </>

    const loadingIndicator = <div className="lazyloading-Indicator">
      <img
        id="me"
        className="loadingImg"
        src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
      />
    </div>
    
    return (
      <>
        {!this.state.isLoading ? loadingIndicator : <div className='myWishlist'>
          {this.state.wishlistData.length != 0 ? wishlistItem : <EmptyWishlist />}
        </div>}
      </>
    );
  }

}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount');
  console.log('Its Globale MyWishlist', wishlistCount);
  return {
    wishlistUpdatedCount: wishlistCount,
  };
}

export default connect(mapStateToProps)(MyWishlist);