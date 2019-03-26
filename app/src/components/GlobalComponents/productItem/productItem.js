import React from 'react';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';

class ProductItem extends React.Component {

    render() {
        console.log('myyyyy---', this.props.data);
        return (
            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6'>
                <div className='productBox'>
                    <div className='imgBox'>
                        <ItemImage data={this.props.data.imageSrc} />
                        <div className='featurepro-like'>
                            <div className='fa fa-heart-o wishlist'></div>
                        </div>
                        <div className='overlay-comparequick'>
                            <div className='inner-overlay'>
                                <ul className='colortheme clearfix'>
                                    <li className='colortheme-list yellow'></li>
                                    <li className='colortheme-list red-dirt'></li>
                                    <li className='colortheme-list grey'></li>
                                    <li className='colortheme-list blue'></li>
                                </ul>
                                <div className='btn-wrapper'>
                                    <button className='btnborder-line'>Compare +</button>
                                    <button className='btnborder-line'>Quick View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RibbonTag data={this.props.data.ribbonText}/>
                    <div className='product-text'>
                        <p className='paragraph'>{this.props.data.productName}</p>
                        <Price actualPrice={this.props.data.actualPrice} offerPrice={this.props.data.offerPrice}/>
                        <Promotions data={this.props.data.promotionData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductItem;