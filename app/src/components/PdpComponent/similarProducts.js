import React from 'react';
import { Col } from 'react-bootstrap';
import { newMachineUrl } from '../../../public/constants/constants';

class similarProducts extends React.Component {
  constructor() {
    super();
    this.dataClass = '';
    this.state = {
      hide: '',        
    };
  }
  /* show feature images */
  showFeatureImage(divId) {
    const featureImages = document.getElementsByClassName('featureImages');
    const contentElement = document.getElementById(`featureImage_${divId}`);
    for (let i = 0; i < featureImages.length; i++) {
      featureImages[i].classList.remove('dataNotActive');
      featureImages[i].classList.add('dataNotActive');
    }
    contentElement.classList.remove('dataNotActive');
  }

  renderProducts(renderId) {  
    document.getElementById('similarProducts').classList.add('dataNotActive');
    document.getElementById('similarCombos').classList.add('dataNotActive');
    document.getElementById(renderId).classList.remove('dataNotActive');   

  }
  
  render() {
    return (
      <div className='similarProduct-Wrapper'>
        <ul className="similarProduct_Tabs">
         <li className='list active' onClick={() => this.renderProducts('similarProducts') }><a className='link' href='javascript:void(0)'>Similar Products</a></li>
         <li className='list' onClick={() => this.renderProducts('similarCombos') }><a className='link' href='javascript:void(0)'>Combos You May Like</a></li>
        </ul>

        <div id='similarProducts'>
        <ul className='similarProducts'>
        {this.props.similarProducts.map((data, index) => {
          let emiData = data.emiData;
          if (emiData === '') {
            emiData = 699;
          }
          const imgUrl =
            'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-3.png';
          return (
            
            <li className="productlist" key={index}>
              <div className='imgBox' key={index}>
                <img src={imgUrl}  alt='Img'/>
              </div>
              <div className="product-text">
                <p className='heading text'>{data.productName}</p>
                
                <p className="price text">
                  <span className="discount-price">&#8377;{data.actualPrice}</span>
                  <span className="priceno-discount">&#8377;{data.offerPrice}</span>
                </p>
               <p className='emi-text text'>
                 <span className='free-accessories'>EMI Starting from <span className='bold'>{emiData}</span></span>
                
                <span className='bold'>10% Off </span> on this product
               </p>
               
              </div>
            </li>
           
          );
        })}
         </ul>
         </div>

         <div className='dataNotActive' id='similarCombos'>         
           <h4>Combos Data</h4>
        </div>
      </div>
    );
  }
}

export default similarProducts;
