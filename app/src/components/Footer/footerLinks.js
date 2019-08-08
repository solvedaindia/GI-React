import React from 'react';
import { Col } from 'react-bootstrap';

const Footerlinks = props => {
  let footerLinksData = '';
  if (props.name.data && props.name.data.length > 0) {
   footerLinksData = props.name.data.map((val, index) => (
    <Col key={index} md={3} sm={3}>
      {val.map((item, childindex) => (
        <div className="footerlink_wrpper" key={childindex}>
          <h5 className="heading">{item.text}</h5>
          <ul>
            {item.children.map((litem, i) => (
              <li className="list" key={i}>
                <a className="link" href={litem.action}>
                  {litem.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Col>
  ));
  }
  return footerLinksData;
};

export default Footerlinks;
