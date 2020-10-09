import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { imagePrefix } from '../../../public/constants/constants';

const ModularComponent = props => {
  const details = props.modularDetails;
  if (details) {
    return (
      <Grid className="modular-details">
        <Row>
          <Col xs={12} md={7}>
            <img
              className="details-img"
              src={imagePrefix + details.image}
              alt={details.imageAlt}
            />
          </Col>
          <Col xs={12} md={5} className="details-desc">
            <h1 className="name">{details.name}</h1>
            <h2 className="short-desc">{details.shortDescription}</h2>
            <h3 className="long-desc">{details.longDescription}</h3>
            <div className="colors">
              <Row>
                {details.colors &&
                  details.colors.map(color => {
                    return (
                      <Col xs={2} className="color">
                        {color.imageRgb ? (
                          <span
                            className="circle"
                            style={{
                              backgroundColor: `rgb${color.imageRgb}`,
                            }}
                          />
                        ) : (
                          <img
                            className="imgCircle"
                            src={imagePrefix + color.imageSrc}
                            alt={color.imageAlt}
                          />
                        )}
                        <div className="color-names">{color.name}</div>
                      </Col>
                    );
                  })}
              </Row>
            </div>
            <p className="price-text">{details.priceText}</p>
          </Col>
        </Row>
      </Grid>
    );
  }
  return null;
}

export default ModularComponent;
