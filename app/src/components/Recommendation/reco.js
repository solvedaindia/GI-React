import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    recommendationAPI,
} from '../../../public/constants/constants';
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
        // const productname = String(this.state.data.productName).toLowerCase();
        // const routePath = `/pdp/furniture-${productname.split(' ').join('-')}/${this.state.data.uniqueID}`;
        return (
            !!recoData &&
            <section className='reco'>
                <div className='leftSide'>
                    <div className='recoDesc'>
                        <RecoIcon  width='71' height='70' className='icon'/>
                        <h1 className='title'>{recoData.title}</h1>
                        <p className='data'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt </p>
                    </div>
                        <figure className='leftOne'>
                            <img src={Reco1} className='recoImg' />
                        </figure>
                        <figure className='leftTwo'>
                            <img src={Reco2} className='recoImg' />
                        </figure>
                </div>
                    <div className='rightSide'>
                        <figure className='rightThree'>
                            <img src={Reco3} className='recoImg' />
                        </figure>
                    </div>
            </section>
        );
    }
}

export default Recommendation;
