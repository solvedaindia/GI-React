import React from 'react';
import { Col } from 'react-bootstrap';
import Accordion from './Accordion';
// import '../../../../public/styles/footerContainer/accordian.scss'

// const FooterLinkAccordian = props => {
class FooterLinkAccordian extends React.Component {


  // const footerLinksData = props.name.map((val, index) => (
  //   <Col key={index} md={3} sm={3}>
  //     <Accordion>
  //       {val.map((item, childindex) => (
  //         <div className="accor footerlink_wrpper">
  //           <h5 className="head heading">
  //             {item.text}
  //             <span className="plusIcon" onClick={this._handleClick}>
  //               <img src={require('../../../../public/images/plusIconWhite.svg')} />
  //             </span>
  //           </h5>
  //           <div className="body">
  //             <ul>
  //               {item.children.map((litem, i) => (
  //                 <li className="list" key={i}>
  //                   <a className="link" href={litem.action}>
  //                     {litem.text}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         </div>
  //       ))}
  //     </Accordion>
  //   </Col>
  // ));
  // return footerLinksData;

  render() {

    return (
      <>
        {this.props.name.map((val, index) => (
          <Col key={index} md={3} sm={3}>
            <Accordion>
              {val.map((item, childindex) => (
                <div className="footerlink_wrpper accor" id="footerlink_wrpper">
                  <h5 className="head heading">
                    {item.text}
                    <span className="plusIcon" onClick={this._handleClick}>
                      <img src={require('../../../../public/images/plusIconWhite.svg')} />
                    </span>
                  </h5>
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
        ))}
      </>
    );
  }


}

export default FooterLinkAccordian;
