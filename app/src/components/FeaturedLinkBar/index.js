/**
 *
 * FeaturedLinkBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import '../../../public/styles/featuredLinkBar/featuredLinkBar.css';


/* eslint-disable react/prefer-stateless-function */
class FeaturedLinkBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // API vars
      featuredData: [],
      leftData: [],
      rightData: [],
    };

  }

  componentDidMount() {
    this.fetchHeaderData()
  }

  fetchHeaderData() {
    if (this.props.featuredData) {
      const left = []
      left.push(this.props.featuredData[0]);
      left.push(this.props.featuredData[1]);

      const right = []
      right.push(this.props.featuredData[2]);
      right.push(this.props.featuredData[3]);
      right.push(this.props.featuredData[4]);
      right.push(this.props.featuredData[5]);
      right.push(this.props.featuredData[6]);
      right.push(this.props.featuredData[7]);

      this.setState({
        leftData: left,
        rightData: right
      })
    }
  }


  render() {
    const { leftData, rightData, } = this.state;
    return (
      <section className="featuredLinksBar">
        <div className="container">
          <Row>
            <Col md={4} sm={4}>
              <ul className="featuredLinksBarContactlinks">
                {
                  leftData.map(item => (
                    <li key={item.label}>
                      <a href={item.url}>
                        <span className="contact-channel-icon">
                          <img src={item.imagepath} alt={item.label} />
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </Col>
            <Col sm={8} md={8}>
              <ul className="featuredLinksBarlinkContainer pull-right">
                {
                  rightData.map(item => {
                  if (item.isNew) {
                    return (
                      <li key={item.label}>
                        <span className="featuredLinksBar__link-new">
                          <Link
                            className="featuredLinksBar__link"
                            to={item.href}
                          >
                            {item.label} <sup>New</sup>
                          </Link>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li>
                      <Link to={item.imagepath}> {item.label} </Link>
                    </li>
                  );
                })
                }
              </ul>
            </Col>
          </Row>
        </div>
        <div className="clearfix" />
      </section>
    );
  }
}

FeaturedLinkBar.propTypes = {};
export default FeaturedLinkBar;
