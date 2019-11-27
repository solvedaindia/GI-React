import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import {
  bestSellerAPI,
  espotAPI,
  imagePrefix,
} from '../../../public/constants/constants';
import { is, formatPrice,createPdpURL, createSEOPdpURL } from '../../utils/utilityManager';
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
          bestSellerData: (is(bsData, 'Object') && bsData) || [],
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getBestSellerData();
  }

  handleTitle = (title) => {
    <title>{title}</title>
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
            infinite: false,
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
    if(productList.length<=0){
      return null;
    }
    return (
      <div className="bestSeller">
        <h3 className="title">{title}</h3>
        <Slider {...settings}>
          {is(productList, 'Array') &&
            productList.map((sellerItemData, index) => {
              
              var productname = String(sellerItemData.productName).toLowerCase();
              var routePath = createSEOPdpURL(sellerItemData.productName, sellerItemData.shortDescription, sellerItemData.partNumber);

              return (
                <figure key={index} className="bsSlides">
                  
                  <Link to={routePath}>
                    <img className="subCatImg" src={`${imagePrefix}${sellerItemData.thumbnail}`} alt={sellerItemData.productName} onClick={this.handleTitle(`${sellerItemData.pageTitle}`)}/>
                  </Link>
           
                  <figcaption className="bsDetails">
                    <Link to={routePath}><h2 className="prodtitle">{sellerItemData.productName}</h2></Link>
                    <h2 className="peiceDeatils">
						{sellerItemData.actualPrice <= sellerItemData.offerPrice ? 
							<span className="discPrice">
								{sellerItemData.actualPrice !=="" ? `₹${formatPrice(sellerItemData.actualPrice)}` : null }
							</span>
						:
						<>
						<span className="discPrice">
							{sellerItemData.offerPrice !=="" ? `₹${formatPrice(sellerItemData.offerPrice)}` : null }
						</span>
						<span className='actualPriceLine'>
							<span className="actualPrice">
							{sellerItemData.actualPrice !== "" ? `₹${formatPrice(sellerItemData.actualPrice)}` : null}
							</span>
						</span>
						</>
						}
                    </h2>
                    {sellerItemData.emiData !== '' ? <p className="emi">
                      EMI Starting From
                    <span className="emiPrice">₹{formatPrice(sellerItemData.emiData)}</span>
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
