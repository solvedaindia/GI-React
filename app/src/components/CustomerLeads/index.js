/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import * as _ from 'lodash';
import * as $ from 'jquery';

import '../../../public/styles/customerLeads/customerLeads.scss';
import CustomerLeadsForm from './form';
import Pixels from '../Primitives/pixels';
import ContentEspot from '../Primitives/staticContent';
import { espotAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import { isMobile } from '../../utils/utilityManager';

class CustomerLeads extends Component {
  constructor() {
    super();
    this.state = {
      banners: [],
    };
  }

  fetchBannerData = () => {
    apiManager
      .get(`${espotAPI}GI_Customer_Leads_Banner`)
      .then(response => {
        const { data } = response;
        if (
          data &&
          data.data &&
          data.data.banners &&
          data.data.banners.length > 0
        ) {
          this.setState({
            banners: data.data.banners,
          });
        }
      })
      .catch(error => {});
  };

  componentDidMount() {
    this.fetchBannerData();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  render() {
    const { banners } = this.state;
    const bannerCarouselSettings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        <Pixels espotName="GI_PIXEL_CUSTOMER_LEADS_META" />
        <section className="consultation-page">
          <Grid fluid>
            <Row className="bg-banners">
              <Col xs={12}>
                <div className="fsBanner">
                  <Slider {...bannerCarouselSettings}>
                    {banners &&
                      banners.length > 0 &&
                      banners.map(banner => (
                        <img
                          className="consultation-form-bg"
                          src={
                            !isMobile() ? banner.imgUrlWeb : banner.imgUrlRes
                          }
                          alt={banner.imgAlt}
                          key={banner.imgAlt.toLowerCase()}
                        />
                      ))}
                  </Slider>
                </div>
              </Col>
            </Row>
            <Row className="overlay">
              <div className="outer-container">
                <div className="form-container">
                  <h1 className="heading">Request A Callback</h1>
                  <CustomerLeadsForm />
                </div>
              </div>
            </Row>
          </Grid>
        </section>
        <ContentEspot espotName="GI_Homepage_Our_Promises" />
      </>
    );
  }
}

export default CustomerLeads;
