import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StoreLinks = (props) => {
    return(
        <Col md={12} sm={12}>
            <div>
                <h3 className='heading'>
                    {props.name.text}
                </h3>
                <ul className='store_area'>
                    { props.name.children && props.name.children.length > 0 &&
                        props.name.children.map((links, i) => {
                        return (
                            <li className='list' key={i}>
                                <Link className='link' to={{ pathname: '/storelocator', state: { storeName: links.text } }}>
                                    {links.text}
                                </Link>
                                {/* <a className='link' href={links.action}> </a> */}
                               
                            </li>
                        )})
                    }
                </ul>                
            </div>
        </Col>
    );
}

export default StoreLinks;