import React from 'react';

const espot = (props) => {
    //console.log(props.PdpEspot.data, 'hey');
    return(
        <div className="our-promises">
         <div className='container'>
            <div className="row">
                <div className="col-md-9">
                    <div className="ourpromises-heading clearfix">
                        <h3 className="heading">Our Promises</h3>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="Promise-boxtext"> 
                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/delivery.svg" alt="delivery" />
                            <h4 className="sub-heading">On Time delivery</h4>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="Promise-boxtext">
                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/installation.svg" alt="installation" />
                            <h4 className="sub-heading">Free Installation</h4>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="Promise-boxtext">
                            <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/exchange.svg" alt="exchange" />
                            <h4 className="sub-heading">Furniture Exchange</h4>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do e</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="product-bg">
                        <img className="imgfullwidth" src="https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/promises-product.png" alt="Img" />
                    </div>
                </div>
            </div>
         </div>

        
        </div>
    );
}

export default espot;