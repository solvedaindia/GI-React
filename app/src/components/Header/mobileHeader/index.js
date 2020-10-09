import React from 'react';
import { Icon, Row, Col } from 'react-bootstrap';
import Logo from 'components/Logo';
import Header from './styles.js';

class MobileHeader extends React.Component {
  render() {
    return(
      <Header>
        <Row>
          <Col xs={4}>
          </Col>
          <Col xs={4}>
            <Logo isMobile />
          </Col>
          <Col span={4} />
          <Col xs={3}>
            <Icon type="phone" theme="filled" />
          </Col>
          <Col xs={3}>
            <Icon type="heart" theme="filled" />
          </Col>
          <Col xs={3}>
            <Icon type="smile" theme="twoTone" />
          </Col>
          <Col xs={3}>
            <Icon type="shopping-cart" />
          </Col>
        </Row>
      </Header>
    );
  }
}

export default MobileHeader;