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
    let emidata = this.props.productData.emiData;

    if (emidata === '') {
      emidata = 599;
    }

    return(
      <>
        <div className="product">
                  <span className='text'>Product ID:</span> 
                  <span className='text'>{this.props.productData.partNumber}</span>
        </div>
        <div className="slimline">
                  <h4 className='heading'>
                    {this.props.productData.productName}
                  </h4>
                  {this.props.productData.shortDescription}<br/>
                  <div className='soldbyDealers'>sold by RMZ furniture Dealers</div>
        </div>
        <ProductDefAttriutes defAttributes={this.props.defAttributes} />
        <div className="price">
                  <span className='actualprice text'>&#8377;{this.props.productData.actualPrice}</span>
                  <span className='offerprice text'>&#8377;{this.props.productData.offerPrice}</span>
          
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
                  <div className='discount-off text'>{this.props.productData.discount} </div>
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
                  <div className='text emiinfo'><EmiInfo /></div>
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
