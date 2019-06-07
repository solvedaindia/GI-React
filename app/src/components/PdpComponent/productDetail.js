import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  newMachineUrl,
  store,
  catalog,
  imagePrefix
} from '../../../public/constants/constants';

class productDetail extends React.Component {
  constructor() {
    super();
    this.dataClass = '';
    this.activeClass = 'active';
  }

  /* display tab with data */
  productDetailsTab(divId) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    const tabData = document.getElementsByClassName('tabData');
    const contentElement = document.getElementById(`content_${divId}`);
    const tabElement = document.getElementById(`tab_${divId}`);

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('dataNotActive');
      tabcontent[i].classList.add('dataNotActive');
      tabData[i].classList.remove('active');
    }
    contentElement.classList.remove('dataNotActive');
    contentElement.classList.remove('dataActive');
    tabElement.classList.add('active');
  }

  /* render tab data */
  renderTabData() {
    return this.props.productDetail.description.map((tabData, index) => {
      this.activeClass = 'active';
      if (index > 0) {
        this.activeClass = '';
      }

      return (
        <li
          id={`tab_${index}`}
          className={`tab tabData ${this.activeClass}`}
          key={index}
        >
          <a onClick={() => this.productDetailsTab(index)}>{tabData.title}</a>
        </li>
      );
    });
  }

  /* render tab content */
  renderTabContent() {
    return this.props.productDetail.description.map((data, index) => {
      this.dataClass = '';
      if (index > 0) {
        this.dataClass = 'dataNotActive';
      }

      let displayContent = '';
      if (Array.isArray(data.values)) {
        displayContent = data.values.map((tabContent, id) => (
          <Col md={6} sm={12} xs={12} key={id}>
            <b>{tabContent.name}</b>
            {<p>{tabContent.value}</p>}
          </Col>
        ));
      } else {
        displayContent = data.values;
      }

      return (
        <div
          key={index}
          id={`content_${index}`}
          className={`tabcontent ${this.dataClass}`}
        >
          {displayContent}
        </div>
      );
    });
  }

  render() {
    const imagePath = `${imagePrefix}${this.props.productDetail.imagePath}`;
    return (
      <div className="product_details">
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h3 className="heading"> Product Details</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <div className="product_img">
              <img className="imgfullwidth" src={imagePath} />
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} className="product_description">
            <Row>
              <Col md={12} sm={12} xs={12} className="prod-desc-tab">
                <ul>{this.renderTabData()} </ul>
              </Col>
              <Col md={12} sm={12} xs={12} className="prod-desc-tab-details">
                {this.renderTabContent()}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default productDetail;
