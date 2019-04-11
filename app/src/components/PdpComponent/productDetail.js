import React from 'react';
import { Row, Col } from 'react-bootstrap';

class productDetail extends React.Component {
  constructor() {
    super();
    this.dataClass = '';
  }

  /* display tab with data */
  productDetailsTab(divId) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    const element = document.getElementById(divId);

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('dataNotActive');
      tabcontent[i].classList.add('dataNotActive');
    }

    element.classList.remove('dataNotActive');
    element.classList.remove('dataActive');
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={2} sm={12} xs={12}>
            <h3 className="heading">Product Detail</h3>
          </Col>
        </Row>
        <Row>
          <Col md={5} sm={12} xs={12}>
            <img src={this.props.productDetail.imagePath} />
          </Col>
          <Col md={5} sm={12} xs={12}>
            <div>
              {this.props.productDetail.description.map((data, index) => {
                if (index > 0) {
                  this.dataClass = 'dataNotActive';
                }
                return (
                  <div key={index}>
                    <button onClick={() => this.productDetailsTab(index)}>
                      {data.title}
                    </button>
                    <div id={index} className={`tabcontent ${this.dataClass}`}>
                      {data.values.map((tabData, id) => (
                        <div key={id}>
                          <b>{tabData.name}</b>
                          <p>{tabData.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default productDetail;
