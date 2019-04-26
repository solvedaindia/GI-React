import React from 'react';
import { Col } from 'react-bootstrap';
import { newMachineUrl} from '../../../public/constants/constants';

class similarProducts extends React.Component {

    constructor() {
        super();
        this.dataClass = '';
        this.state = {
            hide: ''
        }
        
    }

    /* show feature images */
    showFeatureImage(divId) {
        let featureImages = document.getElementsByClassName('featureImages');
        let contentElement = document.getElementById('featureImage_'+divId);
        for (let i = 0; i < featureImages.length; i++) {
            featureImages[i].classList.remove('dataNotActive');
            featureImages[i].classList.add('dataNotActive');
        }
        contentElement.classList.remove('dataNotActive');
    }

    render() {
        return(
            <div>
                <h4 className='heading text-center'>
                    similarProducts
                </h4>
                {
                   this.props.similarProducts.map((data, index) =>{
                       let emiData = data.emiData;
                        if (emiData === '') {
                            emiData = 699;
                        }
                        const imgUrl = 'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-3.png';
                        return(<div className='col-md-4' key={index}>
                        <div key={index}>
                            <img src={imgUrl} />
                        </div>
                        <div className='text-center' >
                            <b>{data.productName}</b><br/>
                            <div className='price'>
                                <span className='actualprice text'>&#8377;{data.actualPrice}</span>
                                <span className='offerprice text'>&#8377;{data.offerPrice}</span>
                            </div>
                            <br/>
                            EMI Starting from {emiData}<br/>
                            10% Off on this product
                        </div>
                        </div>);
                   }) 
                }
            </div>
        );
    }
}

export default similarProducts;