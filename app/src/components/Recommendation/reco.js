import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    recommendationAPI,
} from '../../../public/constants/constants';
import { Link } from 'react-router-dom';

import '../../../public/styles/reco/reco.scss';
import Reco1 from '../../../public/images/reco-1.png';
import Reco2 from '../../../public/images/reco-2.png';
import Reco3 from '../../../public/images/reco-3.png';
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
            console.log('Recommendation Data', data.data);
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
        this.getRecommendation();
    }

    render() {
        const { recoData } = this.state;
        if ( recoData == '') return null;
        
        const getProdName = !!recoData && recoData.recommendationArray.map((prodName) => {
            return prodName.productName;
        });
        const getUniqueID = !!recoData && recoData.recommendationArray.map((id) => {
            return id.uniqueID;
        });
        
        const productname1 = String(getProdName[0]).toLowerCase();
        const productname2 = String(getProdName[1]).toLowerCase();
        const productname3 = String(getProdName[2]).toLowerCase();
        
        const routePath1 = `/pdp/furniture-${productname1.split(' ').join('-')}/${getUniqueID[0]}`;
        const routePath2 = `/pdp/furniture-${productname2.split(' ').join('-')}/${getUniqueID[1]}`;
        const routePath3 = `/pdp/furniture-${productname3.split(' ').join('-')}/${getUniqueID[2]}`;
        
        return (
            !!recoData &&
            <section className='reco'>
                <div className='leftSide'>
                    <div className='recoDesc'>
                        <RecoIcon  width='71' height='70' className='icon'/>
                        <h1 className='title'>{recoData.title}</h1>
                        <p className='data'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt </p>
                    </div>
                    <Link className="link" to={routePath1}>
                        <figure className='leftOne' onMouseOver={this.handleData}>
                            <img src={Reco1} className='recoImg' />
                            <div className='prodDetails'>
                                <div className='details'>
                                    <p className='name'>{recoData.recommendationArray[0].productName}</p>
                                    <p className='price'>
                                        <span className='offerPrice'>₹{recoData.recommendationArray[0].offerPrice}</span>
                                        <span className='actualPriceLine'><span className='actualPrice'>₹{recoData.recommendationArray[0].actualPrice}</span></span>
                                    </p>
                                    <p className='emiInfo'>
                                    EMI Starting from ₹399
                                    </p>
                                    <p className='offerAmount'>
                                    </p>
                                </div>
                            </div>
                        </figure>
                    </Link>
                    <Link className="link" to={routePath2}>
                        <figure className='leftTwo'>
                            <img src={Reco2} className='recoImg' />
                            <div className='prodDetails'>
                                <div className='details'>
                                    <p className='name'>{recoData.recommendationArray[1].productName}</p>
                                    <p className='price'>
                                        <span className='offerPrice'>₹{recoData.recommendationArray[1].offerPrice}</span>
                                        <span className='actualPriceLine'><span className='actualPrice'>₹{recoData.recommendationArray[1].actualPrice}</span></span>
                                    </p>
                                    <p className='emiInfo'>
                                    EMI Starting from ₹399
                                    </p>
                                    <p className='offerAmount'>
                                        6% Off
                                    </p>
                                </div>
                            </div>
                        </figure>
                    </Link>
                </div>
                <Link className="link" to={routePath3}>
                    <div className='rightSide'>
                        <figure className='rightThree'>
                            <img src={Reco3} className='recoImg' />
                            <div className='prodDetails'>
                                <div className='details'>
                                    <p className='name'>{recoData.recommendationArray[2].productName}</p>
                                    <p className='price'>
                                        <span className='offerPrice'>₹{recoData.recommendationArray[2].offerPrice}</span>
                                        <span className='actualPriceLine'><span className='actualPrice'>₹{recoData.recommendationArray[2].actualPrice}</span></span>
                                    </p>
                                    <p className='emiInfo'>
                                    EMI Starting from ₹399
                                    </p>
                                    <p className='offerAmount'>
                                        10% Off &amp; Free accessories
                                    </p>
                                </div>
                            </div>
                        </figure>
                    </div>
                </Link>
            </section>
        );
    }
}

export default Recommendation;
