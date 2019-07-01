import React from 'react';
import Accordion from './Accordion'
// import '../../../../public/styles/footerContainer/accordian.scss'
import { Col } from 'react-bootstrap';

const FooterLinkAccordian = props => {
  const footerLinksData = props.name.map((val, index) => (
    <Col key={index} md={3} sm={3}>
      <Accordion>
        {val.map((item, childindex) => (
          <div className="accor footerlink_wrpper">
            <h5 className="head heading">{item.text}<span className='plusIcon'><img src={require('../../../../public/images/plusIconWhite.svg')} /></span></h5>
            <div className="body">
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
          </div>

        ))}
      </Accordion>
    </Col>
  ));
  return footerLinksData;
};

export default FooterLinkAccordian;
