import React from 'react';
import { Col, Button } from 'react-bootstrap';
import EmiInfo from './emiInfo';
import ProductDefAttriutes from './productdefAttributes';

class productInfo extends React.Component {
  constructor() {
    super();
  }

  toggleOffers() {
    let x = document.getElementById('offers');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  render() {
	  //console.log(this.props.productData, 'skuData---');
	  //defAttributes
    let emidata = this.props.productData.emiData;

    if (emidata === '') {
      emidata = 599;
    }
    return(
      <>
        <div className="price">
                <span className='offerprice text'>&#8377;{this.props.productData.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  <span className='actualprice text'>&#8377;{this.props.productData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  
        </div>
        <div className="shippingCharge">
          Shipping Charges:{' '}
          <span className="bold">
            {' '}
            &#8377;450 {/* this.props.productData.shipingCharges */}
                  </span>
        </div>
        <div className="accessories-offer">
                  <div className='offerbg text'> % </div>
                  <div className='discount-off text'>{this.props.productData.discount}% OFF & free accessories </div>
                  <a className='text viewOffer' role="button" onClick={this.toggleOffers.bind(this)}>View Offer</a>
          </div>
        
        
        <div id="offers">
                  <ul className='cashoffer-wrapper'>
            {this.props.productData.promotions.map((promotion, i) => (
                                <li className='list' key={i}>                                 
                                    <h4 className='heading'>{promotion.name} </h4>
                                    {promotion.description} <a className='link' href={promotion.name}>{promotion.name}</a>                                  
                                </li>
                            ))
                    }
          </ul>
        </div>

        <div className="starting-emitext">
                  <div className='offerbg text'> <span className='emitext'>EMI</span></div>
                  <div className='text'>Starting from </div>
                  <div className='text bold'>रु {emidata} </div>                   
                  <div className='text'>per month</div>
                  <div className='text emiinfo'><EmiInfo price={this.props.productData.offerPrice}/></div>
          </div>
    
       
          <div className='pincode'>
            <div className='PincodeTextdata clearfix'>
              <input className='pincodeVal' type='text' readOnly value='56632' />
              <a className='pincodeEdit' role='button'>Edit</a>
            </div>              
            <div className='soldbyDealers'>Delivery between 6th Jan to 10 Jan</div>
          </div>
          <div className='clearfix'></div>
          
        
        <div className="ExperienceProduct">
          Experience this product at{' '}
          <a className='bold' role="button">Vikroli Store (1.5 K.M away)</a>
        </div>

        <div className="addCart">
          <Button className="btn">-</Button>
                  <input className='btn' type='text' readOnly value='1' />
          <Button className="btn">+</Button>
                  <Button className="btn addcartbtn">Add to Cart</Button>
        </div>
      </>
    );
  }
}

export default productInfo;
