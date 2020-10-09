import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { imagePrefix } from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';

const MakeSpaceComponent = props => {
  const makeSpace = props.makeSpaceContent;
  const settings = {
    dots: isMobile(),
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: isMobile() ? 1 : 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  if (makeSpace && makeSpace.content && makeSpace.content.length > 0) {
    return (
      <Grid className="makeSpace">
        <Row>
          <Col xs={12}>
            <h2 className="makeSpaceTitle">{makeSpace.title}</h2>
          </Col>
        </Row>
        <Row className="text-center">
          <Slider {...settings}>
            {makeSpace.content.map((content, index) => (
              <Col xs={3} className="makeSpaceItems" key={`item_${index}`}>
                <img
                  className="makeSpaceItemImg"
                  src={`${imagePrefix}${content.imagePath}`}
                  alt={content.title}
                />
                <h2 className="makeSpaceItemTitle">{content.title}</h2>
                <h3 className="makeSpaceItemDesc">{content.description}</h3>
              </Col>
            ))}
          </Slider>
        </Row>
      </Grid>
    );
  }
  return null;
}

export default MakeSpaceComponent;
