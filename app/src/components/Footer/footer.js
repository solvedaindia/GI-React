import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Footerlinks from './footerLinks';
import Newsletter from './newsletter';
import Stores from './stores';
import Categories from './categories';
import { footerLogoUrl } from '../../../public/constants/constants';

const logoImg = <img style={{width: '60px'}} src={require('../../../public/images/NN1.png')}/>
const FooterComponent = props => (
  <Grid>
    <Row>
      <Col md={7} sm={12} xs={12} className="rightPadding">
        <Row>
          <div className="logo_white">
            {logoImg}
            {/* <a href='/'><img className="logo_width" src={footerLogoUrl} alt="Godrej Interio" /></a> */}
          </div>
          <Footerlinks name={props.links} />
        </Row>
      </Col>
      <Col md={5} sm={12} xs={12}>
        <Row>
          <Newsletter name={props.newsletter} socialicon={props.socialicons} />
        </Row>
      </Col>
    </Row>
    <Row>
      <Col md={7} sm={12} xs={12} className="rightPadding">
        <Row>
          <Stores name={props.stores} />
        </Row>
      </Col>
      <Col md={5} sm={12} xs={12}>
        <Row>
          <Categories name={props.categories} />
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default FooterComponent;
