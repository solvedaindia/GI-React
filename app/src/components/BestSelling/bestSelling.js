import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import {
  bestSellerAPI,
  imagePrefix,
} from '../../../public/constants/constants';
import {is} from '../../utils/utilityManager';
import '../../../public/styles/bestSeller/bestSeller.scss';
import '../../../public/styles/slickCustom.scss';
import { resendOtp } from '../RegisterComponent/constants';

class BestSeller extends React.Component {
  state = {
    bestSellerData: null,
    title: null,
    isLoading: true,
    errors: null,
  };

  getBestSellerData() {
    apiManager
      .get(bestSellerAPI)
      .then(response => {
		const { data } = response || {};
		const bsData = data && data.data;
        this.setState({
			bestSellerData: is(bsData, 'Object') && bsData,
			isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('Best Seller ERROR');
      });
    console.log('ERROR');
  }

  componentDidMount() {
    this.getBestSellerData();
  }

  render() {
    const { bestSellerData } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <div className="bestSeller">
        <h1 className="title">Best Selling Products</h1>
        <Slider {...settings}>
		{!!bestSellerData && bestSellerData.productList.map((sellerItemData, index) => (
              <figure key={index} className="bsSlides">
                <a href={sellerItemData.onClickUrl}>
                  <img
                    className="subCatImg"
                    src={`${imagePrefix}${sellerItemData.thumbnail}`}
                    alt={sellerItemData.uniqueID}
                  />
                </a>
                <figcaption className="bsDetails">
                  <h2 className="prodtitle">{sellerItemData.productName}</h2>
                  <h2 className="peiceDeatils">
                    <span className="discPrice">Rs.24,700</span>
                    <span className="actualPrice">Rs.27,000</span>
                  </h2>
                  <p className="emi">
                    EMI Starting From
                    <span className="emiPrice">Rs.399</span>
                  </p>
                  <p className="emiOffer">
                    <span className="emiOfferDisc">10% off</span>
                    &amp; Free accessories
                  </p>
                </figcaption>
              </figure>
            ))}
        </Slider>
      </div>
    );
  }
}

export default BestSeller;
