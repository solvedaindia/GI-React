import React from 'react';
import { Row, Col } from 'react-bootstrap';

class productDetail extends React.Component {
	constructor() {
		super();
        this.dataClass = '';
	}

    /* display tab with data */
    productDetailsTab(divId) {
        let tabcontent = document.getElementsByClassName('tabcontent');
        let element = document.getElementById(divId);

        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove('dataNotActive');
            tabcontent[i].classList.add('dataNotActive');
        }
        
        element.classList.remove('dataNotActive');
        element.classList.remove('dataActive');
    }

	render () {
        return(
            <div className='product_details'>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <h3 className='heading'> Product Detail</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                      <div className='product_img'>
                        <img className='imgfullwidth' src={this.props.productDetail.imagePath}/>
                      </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className='product_description'>
                            {
                                this.props.productDetail.description.map((data, index) => {
                                    if (index > 0) {
                                        this.dataClass = 'dataNotActive';
                                    }
                                    return (
                                        <div key={index}>
                                            <a className={'tab tab_'+index} onClick={() => this.productDetailsTab(index)}>{data.title}</a>
                                            <div id={index} className={`tabcontent ${this.dataClass}`}>
                                                {
                                                    data.values.map((tabData, id) => {
                                                        return (
                                                            <div key={id}>
                                                                <b>{tabData.name}</b>
                                                                <p>{tabData.value}</p>
                                                            </div>
                                                        );
                                                    }) 
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
	}
}

export default productDetail;