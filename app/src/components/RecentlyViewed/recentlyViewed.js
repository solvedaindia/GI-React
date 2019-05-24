import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import {
  recentlyViewedAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';

import '../../../public/styles/bestSeller/bestSeller.scss';
class RecentlyViewed extends React.Component {
  state = {
    recentlyViewedData: null,
    isLoading: true,
    errors: null,
  };

  getRecentlyViewed() {
    apiManager
      .get(recentlyViewedAPI)
      .then(response => {
        this.setState({
          recentlyViewedData: response.data.data,
          isLoading: false,
        });
        console.log('Recently Viewed', response.data.data);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('ERROR');
      });
  }

  componentDidMount() {
    this.getRecentlyViewed();
  }

  render() {
    // const { recentlyViewedData } = this.state;
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1
    // };
    return (
      <div className="bestSeller">
        <h1 className="title">Recently Viewed</h1>
        {/* <Slider {...settings}>
                    {!!recentlyViewedData && recentlyViewedData.map((rcItemData, index) =>{
                        return (
                            <figure>
                                <a href={rcItemData.onClickUrl} key={index}>
                                    <img 
                                        className='subCatImg'
                                        src='https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-2.png' 
                                        alt={sellerItemData.uniqueID}
                                    />
                                </a>
                                <figcaption className='bsDetails'>
                                    <h2 className='prodtitle'>Meraki</h2>
                                    <span className='discPrice'>24,700</span>
                                    <span className='actualPrice'>27,000</span>
                                    <p className='emi'>EMI Starting From
                                        <span className='emiPrice'>399</span>
                                    </p>
                                    <p className='emiOffer'>
                                        <span className='emiOfferDisc'>10% off</span>
                                        &amp; Free accessories
                                    </p>
                                </figcaption>
                            </figure>
                        );
                    })}
                </Slider> */}
      </div>
    );
  }
}

export default RecentlyViewed;
