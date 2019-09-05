import React from 'react';
import { Col } from 'react-bootstrap';
import Slider from 'react-slick';
import {isMobile} from '../../utils/utilityManager';

class productKeywords extends React.Component {
  constructor() {
    super();
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow:2,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            infinite: true
          }
        }
      ]
    };

    return(
      <div>
      {this.props.productKeywords.keywords && this.props.productKeywords.keywords.length > 0 && (
        <Col md={12} sm={12} xs={12}>
          <div className="moreKeyword">
            <h3 className="heading">Products You May Like</h3>
            {isMobile() &&
              <Slider {...settings}>
              {this.props.productKeywords.keywords.map((keywords, index) => {
                  if (index < 5) {
                    return (     
                      <div className='prodKeywordList'> 
                        <a className='list' href={`/search?keyword=${keywords}`} key={index}>
                          {keywords}
                        </a> 
                        </div>
                    );
                  }
                })}
              </Slider>
            }
            {!isMobile() &&
              <ul className="keywordsList">
                {this.props.productKeywords.keywords.map((keywords, index) => {
                  if (index < 5) {
                    return (
                      <a href={`/search?keyword=${keywords}`} key={index}>
                        <li className="list">{keywords}</li>
                      </a>
                    );
                  }
                })}
              </ul>
            }
          </div>
        </Col>
      )}
    </div>
    );
  }
}

export default productKeywords;
