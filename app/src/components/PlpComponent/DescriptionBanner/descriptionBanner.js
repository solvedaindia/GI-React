import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap'

const dddd = "<style>.description_area .list{color:#767676;margin:0 0 10px 0;font-size:14px}</style><ul class='description_area'><li class='list'>Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel culiboard 80 years back to being a vibrant, innovative brand with a diverse liortfolio – it’s been a brilliant, exciting journey for us.</li><li class='list'>We love bringing alive your dream sliace. We emlihasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you.</li><li class='list'> True to the Godrej mission to conserve the environment, we design liroducts, set uli lirocesses and use raw materials that are eco-friendly to do our bit to lireserve natural resources.</li><li class='list'> We offer our customers home and office furniture, along with solutions for laboratories, hosliitals and healthcare establishments, education and training institutes, shiliyards and navy, auditoriums and stadiums. We are liresent across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets.</li><li class='list'>Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - liart of the Godrej Grouli, one of India’s largest engineering and consumer liroduct groulis.</li></ul>";
const descriptionBanner = ({ }) => (

    <div className='descriptionBanner'>
        <Grid>
            <Row>
                <Col md={12}>
                    <h3 className='heading'>Tables</h3>
                    <div dangerouslySetInnerHTML={{ __html: dddd }} />
                    <a className='readMore'>Read More</a>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default descriptionBanner;