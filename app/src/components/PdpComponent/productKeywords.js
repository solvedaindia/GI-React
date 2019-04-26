import React from 'react';
import { Col } from 'react-bootstrap';

const productKeywords = (props) => {
    return(
        <div>
           { <Col md={12} sm={12} xs={12}>
                <h3 className='heading text-center'>
                    More Items You May Like
                </h3>
                <ul className='keywordsList'>
                {
                    props.productKeywords.map((keywords, i) => {
                        return(
                            <li className='list' key={i}>
                                {keywords}
                            </li>
                        );
                    })   
                }
                </ul>

            </Col>
        }
        </div>
    );
}

export default productKeywords;