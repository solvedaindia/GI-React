import React from 'react';
import axios from "axios";
import Slider from 'react-slick';
import { bestSellerAPI, storeId, accessToken } from '../../../public/constants/constants';

import '../../../public/styles/bestSeller/bestSeller.scss'
class BestSeller extends React.Component{
    state = {
        bestSellerData:null,
        isLoading: true,
        errors: null
    };

    getBestSellerData() {
        axios.get(bestSellerAPI, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
        .then(response => {
            this.setState({
                bestSellerData: response.data.data.productList,
                isLoading: false
            });
            console.log('BestSellerData#########', response.data.data.productList);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
            console.log('ERROR');
        });
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
            slidesToScroll: 1
        }; 
        return(
            <div className='bestSeller'>
            <h1 className='title'>Best Selling Items</h1>
                {/* {!!bestSellerData && bestSellerData.map((sellerItemData, i) => {
                    return (
                       <p>BestSeller Text</p> 
                    )
                })} */}
                <Slider {...settings}>
                    {!!bestSellerData && bestSellerData.map((sellerItemData, index) =>{
                        return (
                            <figure>
                                <a href={sellerItemData.onClickUrl} key={index}>
                                    <img 
                                        className='subCatImg'
                                        src='https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-2.png' 
                                        alt={sellerItemData.uniqueID}
                                    />
                                    {/* <img src='https://192.168.0.36:8443/wcsstore/SolvedaCommerceCatalogAssetStore//images/catalog/apparel/women/wcl000_dresses/200x310/wcl000_0028_a_red.jpg' /> */}
                                </a>
                                <figcaption className='bsDetails'>
                                    <h2 className='prodtitle'>Meraki</h2>
                                    <span className='discPrice'>Rs.24,700</span>
                                    <span className='actualPrice'>Rs.27,000</span>
                                    <p className='emi'>EMI Starting From
                                        <span className='emiPrice'>Rs.399</span>
                                    </p>
                                    <p className='emiOffer'>
                                        <span className='emiOfferDisc'>10% off</span>
                                        &amp; Free accessories
                                    </p>
                                </figcaption>
                            </figure>
                        );
                    })}
                </Slider>
            </div>
        )
    }
}  

export default BestSeller;
