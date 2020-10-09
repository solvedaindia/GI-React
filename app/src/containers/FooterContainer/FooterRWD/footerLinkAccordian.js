import React from 'react';
import { Col } from 'react-bootstrap';
import Accordion from './Accordion';

class FooterLinkAccordian extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        { this.props.name.data && this.props.name.data.length > 0 && this.props.name.data.map((val, index) => (
          <Col key={index} md={3} sm={3} id="accordion">

              {val.map((item, childindex) => (
                <div className="footerlink_wrpper">
                  <h5 className="heading accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href={"#collapseOne"+index} >
                    {item.text}
                    <span className="plusIcon">
                      <img src={require('../../../../public/images/plusIconWhite.svg')} alt='addMore'/>
                     
                    </span>
                    <span className="minusIcon">
                      <img src={require('../../../../public/images/minusImgIcon.svg')} alt='collapse show'/>
                    </span>
                  </h5>
                  <div id={"collapseOne"+index} className="panel-collapse collapse">
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

          </Col>
        ))}
      </>
    );
  }


}

export default FooterLinkAccordian;
