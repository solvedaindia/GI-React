import React from 'react';
import ProductItem from '../../GlobalComponents/productItem/productItem';

class TrendingCategories extends React.Component {
    render() {
        return (
            <>
                <section className='trending-section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 className='heading'>Trending Products</h3>
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
                                        <li className='list'><a className='link' href='#'>Sofas</a></li>
                                        <li className='list'><a className='link' href='#'>Recliners</a></li>
                                        <li className='list'><a className='link' href='#'>Coffee Tables</a></li>
                                        <li className='list'><a className='link' href='#'>Corner Tables</a></li>
                                        <li className='list'><a className='link' href='#'>Display Units</a></li>
                                        <li className='list'><a className='link' href='#'>Accessories</a></li>

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
                                            <div className='featured-texttop'>Featured Product</div>
                                            <div className='product-text'>
                                                <p className='paragraph'>Fantasia Similine</p>
                                                <p className='price paragraph'>Rs 23,000</p>
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
                                            <div className='featured-texttop'>Featured Product</div>
                                            <div className='product-text'>
                                                <p className='paragraph'>Fantasia Similine</p>
                                                <p className='price'>Rs 23,000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='text-center'>
                                            <a href='#' className='btn-bg'>View All</a>
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