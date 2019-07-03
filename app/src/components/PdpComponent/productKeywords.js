import React from 'react';
import { Col } from 'react-bootstrap';

const productKeywords = props => (
  <>
    {props.productKeywords.keywords.length > 0 && (
      <Col md={12} sm={12} xs={12}>
        <div className="moreKeyword">
          <h3 className="heading">More Items You May Like</h3>
          <ul className="keywordsList">
            {props.productKeywords.keywords.map((keywords, index) => {
              if (index < 5) {
                return (
                  <a href={`/search?keyword=${keywords}`} key={index}>
                    <li className="list">{keywords}</li>
                  </a>
                );
              }
            })}
          </ul>
        </div>
      </Col>
    )}
  </>
);
export default productKeywords;
