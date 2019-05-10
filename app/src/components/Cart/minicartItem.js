import React from 'react';


class MinicartItem extends React.Component {
  state = {

  };



  render() {

    return (
      <>
        <div className='minicartList'>
        <div className="imgBox">
        <img src={require('../../../public/images/miniItem1.png')} className="imgfullwidth"/>
            {/* <img src="https://192.168.0.36:8443/wcsstore/SolvedaCommerceCatalogAssetStore//images/catalog/apparel/women/wcl000_dresses/200x310/wcl000_0028_a_red.jpg" className="imgfullwidth"/> */}
           
         </div>

         <div className="product-text">
            <p className="heading">Hermitage Fit and Flare Dress </p>
            <p className="description">(With Locker, Mirror, OHU & Drawer)</p>
            <p className="price"><span className="discount-price">₹100</span> <span className="priceno-discount">₹250</span></p>
            <p className="free-accessories"> <span className="bold">10% Off</span>free accessories</p>
            <p className='quantity-shipping clearfix'>
              <span className='quantity'>Quantity<br/><span className='textval'>1</span></span>
              <span className='shipping-charge'>SHIPPING CHARGESf<br/><span className='textval'>500</span></span>
            </p>
         </div>
         
        </div>
       
      </>


    );
  }
}

export default MinicartItem;
