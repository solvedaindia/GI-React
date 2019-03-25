/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import SubCategories from '../GlobalComponents/productSubcategories/subCategories';
import ProductItem from '../GlobalComponents/productItem/productItem';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';



/* eslint-disable react/prefer-stateless-function */
class PlpComponent extends React.Component {
  render() {

    return (
      <>
      
        {/* Need to remove image from Css and put in JSX */}
        {/* <img src={require('../../public/images/product-slider.jpg')} alt='slider' /> */}
        <div className='plp-slider'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                <div className='explore-range'>
                  <h3 className='heading'>Explore the range of <br />Table</h3>
                  <a href='#' className='btn-bg'>Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='tablecarousel'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <div className='headingText'>
                  <h3 className='heading'>Table</h3>
                  <p className='total-products'>(38 Product)</p>
                </div>
              </div>
            </div>
           
            <SubCategories />
            
          </div>
        </section>

        <section className='plpCategories'>
          <div className='container'>
            <div className='row'>
           
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
          
            </div>
          </div>
        </section>
      </>
    );
  }
}

PlpComponent.propTypes = {};

export default PlpComponent;
