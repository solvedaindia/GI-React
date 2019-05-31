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
import { resetRemoveFromWishlistFlag } from '../../actions/app/actions';
import BestSeller from '../BestSelling/bestSelling';

class MyWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      wishlistData: [],
      wishlistPopup: null,
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
    if (nextProps.removeWishlistFlag) {
      console.log('Show The Popup Rmove from Wishlist',nextProps.removeWishlistFlag,this.props.removeWishlistFlag );
      this.setState({
        wishlistPopup: this.wishlistPopupItem(),
      })
      this.props.resetRemoveFromWishlistFlag(false);
    }
  }

  wishlistPopupItem() {
    setTimeout(() => {
      this.setState({
        wishlistPopup: null,
      });
    }, 2000);
    return (
      <div className="removeFromWishlist clearfix">
        <span className="wishlist-text">Product Added to Wishlist</span>
        <button onClick={() => this.redirectToWishlistPage()} className="view-btn">View</button>
      </div>
    );
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
      <div className='container'>
        <h3 className="heading">My Wishlist</h3>
        <section className="plpCategories">
          <PlpComponent
            plpDataPro={this.state.wishlistData}
            isFromWishlistPro={true}
          />
        </section>
      </div>
    </>

    const loadingIndicator = <div className="lazyloading-Indicator">
      <img
        id="me"
        className="loadingImg"
        src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
      />
    </div>

    return (
      <div className="myWishlist">
      {this.state.wishlistPopup}
        {!this.state.isLoading ? loadingIndicator : <div className='myWishlist'>
          {this.state.wishlistData.length != 0 ? wishlistItem : <><EmptyWishlist /><BestSeller/></>}
        </div>}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount');
  const removeFlag = getReleventReduxState(stateObj, 'removeWishlistFlag');
  console.log('Its Globale MyWishlist', removeFlag);
  return {
    wishlistUpdatedCount: wishlistCount,
    removeWishlistFlag: removeFlag,
  };
}

export default connect(mapStateToProps,
  {resetRemoveFromWishlistFlag},)
(MyWishlist);
