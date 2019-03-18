import React from 'react';
import Footerlinks  from './footerLinks';
import Newsletter  from './newsletter';
import { Grid, Row, Col } from 'react-bootstrap';

const FooterComponent = (props) => (
  <Grid>
    <Row>
      <Col md={8} sm={12} xs={12}>
        <Footerlinks name={props.links} />
      </Col>
      <Col md={4} sm={12} xs={12}>
        <Newsletter name={props.newsletter} socialicon={props.socialicons}  />
      </Col>
    </Row>   
  </Grid>
);


export default FooterComponent;
