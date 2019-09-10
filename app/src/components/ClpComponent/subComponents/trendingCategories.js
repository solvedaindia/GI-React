import React from 'react';
import ProductItem from '../../GlobalComponents/productItem/productItem';
import {TRENDING_PRODUCTS,SOFAS, RECLINERS,COFFEE, CORNER_TABLES,DISPLAY_UNITS, ACCESSORIES, FEATURED_PRODUCTS,FANTASIA_SIMILINE, RS,VIEW_ALL} from '../../../constants/app/clpConstants';

class TrendingCategories extends React.Component {
    render() {
        return (
            <>
                <section className='trending-section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 className='heading'>{TRENDING_PRODUCTS}</h3>
                            </div>
                        </div>
                        <div className='row'>
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </div>
                    </div>
                </section>
                <section className='clpCategories'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-3 col-sm-3'>
                                <div className='Categories-list'>
                                    <ul className='categories'>
                                        <li className='list'><a className='link' href='#'>{SOFAS}</a></li>
                                        <li className='list'><a className='link' href='#'>{RECLINERS}</a></li>
                                        <li className='list'><a className='link' href='#'>{COFFEE}</a></li>
                                        <li className='list'><a className='link' href='#'>{CORNER_TABLES}</a></li>
                                        <li className='list'><a className='link' href='#'>{DISPLAY_UNITS}</a></li>
                                        <li className='list'><a className='link' href='#'>{ACCESSORIES}</a></li>

                                    </ul>
                                </div>
                            </div>

                            <div className='col-md-9 col-sm-9'>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='productBox'>
                                            <div className='imgBox'>
                                                <img className='img-fullwidth' src={require('../../../../public/images/sofa.png')} alt='sofa' />
                                                <div className='featurepro-like'>
                                                    <div className='fa fa-heart-o wishlist'></div>
                                                </div>
                                            </div>
                                            <div className='featured-texttop'>{FEATURED_PRODUCTS}</div>
                                            <div className='product-text'>
                                                <p className='paragraph'>{FANTASIA_SIMILINE}</p>
                                                <p className='price paragraph'>{RS}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-6'>
                                        <div className='productBox'>
                                            <div className='imgBox'>
                                                <img className='img-fullwidth' src={require('../../../../public/images/sofa2.png')} alt='sofa' />
                                                <div className='featurepro-like'>
                                                    <div className='fa fa-heart-o wishlist'></div>
                                                </div>
                                            </div>
                                            <div className='featured-texttop'>{FEATURED_PRODUCTS}</div>
                                            <div className='product-text'>
                                                <p className='paragraph'>{FANTASIA_SIMILINE}</p>
                                                <p className='price'>{RS}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='text-center'>
                                            <a href='#' className='btn-bg'>{VIEW_ALL}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        )
    }
}

export default TrendingCategories;