import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import {
  bestSellerAPI,
  imagePrefix,
} from '../../../public/constants/constants';
import { is } from '../../utils/utilityManager';
import '../../../public/styles/bestSeller/bestSeller.scss';
import '../../../public/styles/slickCustom.scss';
import { resendOtp } from '../RegisterComponent/constants';
import Promotions from '../../components/GlobalComponents/productItem/promotion';

class BestSeller extends React.Component {
  state = {
    bestSellerData: {},
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
          bestSellerData: (is(bsData, 'Object') && bsData) || {},
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
    const {
      bestSellerData: { productList = [], title = '' },
    } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };
    console.log('mmsmsms -- ', this.state.bestSellerData);
    return (
      <div className="bestSeller">
        <h3 className="title">{title}</h3>
        <Slider {...settings}>
          {is(productList, 'Array') &&
            productList.map((sellerItemData, index) => {
              var productname = String(sellerItemData.productName).toLowerCase()
              var routePath = `/pdp/furniture-${productname.split(' ').join('-')}/${sellerItemData.uniqueID}`

              return (
                <figure key={index} className="bsSlides">
                  {/* <a href={sellerItemData.onClickUrl}> */}
                  <Link to={routePath}>
                    <img className="subCatImg" src={`${imagePrefix}${sellerItemData.thumbnail}`} alt={sellerItemData.uniqueID} />
                  </Link>
                  {/* </a> */}
                  <figcaption className="bsDetails">
                    <h2 className="prodtitle">{sellerItemData.productName}</h2>
                    <h2 className="peiceDeatils">
                      <span className="discPrice">{sellerItemData.offerPrice !=="" ? `₹${sellerItemData.offerPrice}` : null }</span>
                      <span className="actualPrice">{sellerItemData.actualPrice !== "" ? `₹${sellerItemData.actualPrice}` : null}</span>
                    </h2>
                    {sellerItemData.emiData !== '' ? <p className="emi">
                      EMI Starting From
                    <span className="emiPrice">₹{sellerItemData.emiData}</span>
                    </p> : null}

                    <p className="emiOffer">
                      {sellerItemData.discount !== '' ? <span className="emiOfferDisc">{parseInt(sellerItemData.discount) < 2 ? null : `${sellerItemData.discount}% Off`} </span> : null}
                      {parseInt(sellerItemData.discount) < 2 ? null : sellerItemData.discount !== '' && sellerItemData.promotionData !== '' ? '& ' : ''}
                      {sellerItemData.promotionData !== '' ? sellerItemData.promotionData : null}
                    </p>
                  </figcaption>
                </figure>
              )

            })}
        </Slider>
      </div>
    );
  }
}

export default BestSeller;
