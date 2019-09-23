import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    recommendationAPI,

} from '../../../public/constants/constants';
import {createPdpURL, formatPrice } from '../../utils/utilityManager';
import { Link } from 'react-router-dom';

import '../../../public/styles/reco/reco.scss';
import RecoIcon from '../SVGs/recoLogo';
class Recommendation extends React.Component {
  state = {
    recoData: null,
    isLoading: true,
    errors: null,
  };

    getRecommendation() {
        apiManager
        .get(recommendationAPI)
        .then(response => {
            const {data} = response || {};
            this.setState({
                recoData: data && data.data,
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
        this.getRecommendation();
    }

    render() {
        const { recoData } = this.state;
        if ( recoData == '') return null;
        
        const getProdName = !!recoData && recoData.recommendationArray.map((prodName) => {
            return prodName.productName;
        });
        const getSkuID = !!recoData && recoData.recommendationArray.map((id) => {
            return id.partNumber;
        });
        
        const productname1 = String(getProdName[0]).toLowerCase();
        const productname2 = String(getProdName[1]).toLowerCase();
        const productname3 = String(getProdName[2]).toLowerCase();
        
        const routePath1 = createPdpURL(productname1, getSkuID[1]);
        const routePath2 = createPdpURL(productname2, getSkuID[2]);
        const routePath3 = createPdpURL(productname3, getSkuID[3]);
        
        return (
            !!recoData &&
            <section className='homeReco'>
                <div className='reco row'>
                    <div className='leftSide col-md-7'>
                        <div className='recoDesc col-md-7'>
                            <RecoIcon  width='71' height='70' className='icon'/>
                            <h1 className='title'>{recoData.title}</h1>
                            <p className='data'>{recoData.description}</p>
                        </div>
                        <figure className='leftOne col-md-5' onMouseOver={this.handleData}>
                            <Link className="link" to={routePath1}>
                                <img src={recoData.recommendationArray[0].imagePath} className='recoImg' alt={recoData.recommendationArray[0].productName}/>
                                <div className='prodDetails'>
                                    <div className='details'>
                                        <p className='name'>{recoData.recommendationArray[0].productName}</p>
                                        <p className='price'>
                                            <span className='offerPrice'>₹{formatPrice(recoData.recommendationArray[0].offerPrice)}</span>
                                            <span className='actualPriceLine'><span className='actualPrice'>₹{formatPrice(recoData.recommendationArray[0].actualPrice)}</span></span>
                                        </p>
                                        <p className='emiInfo'>
                                            {recoData.recommendationArray[1].emiData !== '' ? `${'EMI Starting from ₹'}${recoData.recommendationArray[0].emiData}` : ''}
                                        </p>
                                        <p className='offerAmount'>
                                            {recoData.recommendationArray[0].discount !== '' ? `${recoData.recommendationArray[0].discount}%` : '' } {recoData.recommendationArray[0].promotionData !== `${'&'} ${recoData.recommendationArray[0].promotionData}` }
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </figure>
                        <figure className='leftTwo col-md-12'>
                            <Link className="link" to={routePath2}>
                                <img src={recoData.recommendationArray[1].imagePath} className='recoImg' alt={recoData.recommendationArray[1].productName}/>
                                <div className='prodDetails'>
                                    <div className='details'>
                                        <p className='name'>{recoData.recommendationArray[1].productName}</p>
                                        <p className='price'>
                                            <span className='offerPrice'>₹{formatPrice(recoData.recommendationArray[1].offerPrice)}</span>
                                            <span className='actualPriceLine'><span className='actualPrice'>₹{formatPrice(recoData.recommendationArray[1].actualPrice)}</span></span>
                                        </p>
                                        <p className='emiInfo'>
                                            {recoData.recommendationArray[1].emiData !== '' ? `${'EMI Starting from ₹'}${recoData.recommendationArray[1].emiData}` : ''}
                                        </p>
                                        <p className='offerAmount'>
                                            {recoData.recommendationArray[1].discount !== '' ? `${recoData.recommendationArray[1].discount}${'% Off'} ${recoData.recommendationArray[1].promotionData}` : ''}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </figure>
                    </div>
                    <div className='rightSide col-md-5'>
                        <figure className='rightThree col-md-12'>
                            <Link className="link" to={routePath3}>
                                <img src={recoData.recommendationArray[2].imagePath}  className='recoImg' alt={recoData.recommendationArray[2].productName}/>
                                <div className='prodDetails'>
                                <div className='details'>
                                    <p className='name'>{recoData.recommendationArray[2].productName}</p>
                                    <p className='price'>
                                        <span className='offerPrice'>₹{formatPrice(recoData.recommendationArray[2].offerPrice)}</span>
                                        <span className='actualPriceLine'><span className='actualPrice'>₹{formatPrice(recoData.recommendationArray[2].actualPrice)}</span></span>
                                    </p>
                                    <p className='emiInfo'>
                                            {recoData.recommendationArray[1].emiData !== '' ? `${'EMI Starting from ₹'}${recoData.recommendationArray[2].emiData}` : ''}
                                        </p>
                                    <p className='offerAmount'>
                                        {recoData.recommendationArray[2].discount !== '' ? `${recoData.recommendationArray[2].discount}${'% Off'} ${recoData.recommendationArray[2].promotionData}` : ''}
                                    </p>
                                </div>
                            </div>
                            </Link>
                        </figure>
                    </div>
                </div>
            </section>
        );
    }
}

export default Recommendation;
