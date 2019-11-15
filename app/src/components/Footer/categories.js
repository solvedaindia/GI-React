import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = (props) => {
    return(
        <Col md={12} sm={12} className='categories_section'>
            <div>
                <h3 className='heading'>
                    {props.name.text}
                </h3>
                { props.name.children && props.name.children.length > 0 &&
                    props.name.children.map((links, i) => {
                    return (
                        <h4 className='categoriestext list' key={i}>
                            <Link className='link' to={links.action}>
                                {links.text}
                            </Link>
                        </h4>
                    )})
                }
            </div>
        </Col>
    );
}

export default Categories;
