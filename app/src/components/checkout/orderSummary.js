import React from 'react';
import '../../../public/styles/checkout.scss';

export class OrderSummaryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    componentDidMount() {
        
    }

    render() {
      return (
            <div className="row">
              <h4 style={{fontWeight: "bold"}}>Order Summary</h4>
              <div className="col-md-9">
                <h5 style={{fontWeight: 'bold'}}>Cart Total</h5>
              </div>
              <div className="col-md-3">
                <h5 style={{fontWeight: 'bold', float: 'right'}}>&#8377;25000</h5>
              </div>
              <div className="col-md-9">
                <h5 style={{fontWeight: 'bold'}}>Product Discount</h5>
              </div>
              <div className="col-md-3">
                <h5 style={{fontWeight: 'bold', float: 'right'}}>- &#8377;500</h5>
              </div>
              <div className="col-md-9">
                <h5 style={{fontWeight: 'bold'}}>Order Discount</h5>
              </div>
              <div className="col-md-3">
                <h5 style={{fontWeight: 'bold', float: 'right'}}>- &#8377;500</h5>
              </div>
              <div className="col-md-9">
                <h5 style={{fontWeight: 'bold'}}>Shipping</h5>
              </div>
              <div className="col-md-3">
                <h5 style={{fontWeight: 'bold', float: 'right'}}>Free</h5>
              </div>
              <div className="col-md-12">
                <p style={{fontSize: "12px"}}>Free shipping on cart total above &#8377;5000</p>
                <hr style={{marginTop: '10px', marginBottom: '10px'}} />
              </div>
              <div className="col-md-8">
                <h5 style={{fontWeight: 'bold'}}>EMI Starting from &#8377;999 per month</h5>
              </div>
              <div className="col-md-4">
                <h5 style={{fontWeight: 'bold', color: '#036cc5', float: 'right'}}>Know More</h5>
              </div>
              <div className="col-md-12">
                <hr style={{marginTop: '10px', marginBottom: '0px'}} />
              </div>
              <div className="col-md-8">
                <h3 style={{fontWeight: 'bold', color: '#036cc5'}}>Total</h3>
              </div>
              <div className="col-md-4">
                <h3 style={{fontWeight: 'bold', color: '#036cc5', float: 'right'}}>&#8377;24,000</h3>
              </div>
              <div className="col-md-12">
                <p style={{fontSize: '12px'}}>You saved <span style={{color: '#00b5a4', fontWeight: "bold"}}>&#8377;2500</span></p>
              </div>
              <div className="col-md-12"><button className="btn btn-large"
                  style={{width: '100%', background: 'black', color: 'white'}}>Pay &#8377;24,000</button></div>
              <div className="col-md-12" style={{marginLeft: "135px", marginTop: '20px'}}>
                <p style={{fontSize:"12px"}}>Secure Checkout</p>
              </div>
            </div>
      )
    }
}