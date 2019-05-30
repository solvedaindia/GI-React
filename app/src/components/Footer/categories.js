import React from 'react';
import { Col } from 'react-bootstrap';

const Categories = props => (
  <Col md={12} sm={12} className="categories_section">
    <div>
      <h3 className="heading">{props.name.text}</h3>
      {props.name.children.map((links, i) => (
        <h4 className='categoriestext list'><a className='link ' href={links.action}>{links.text}</a></h4>
      )
      )}
    </div>
  </Col>
);

export default Categories;
