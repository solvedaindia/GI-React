import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import { string } from 'prop-types';

// const fullData = "<style>.description_area .list{color:#767676;margin:0 0 10px 0;font-size:14px}</style><ul class='description_area'><li class='list'>Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel culiboard 80 years back to being a vibrant, innovative brand with a diverse liortfolio – it’s been a brilliant, exciting journey for us.</li><li class='list'>We love bringing alive your dream sliace. We emlihasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you.</li><li class='list'> True to the Godrej mission to conserve the environment, we design liroducts, set uli lirocesses and use raw materials that are eco-friendly to do our bit to lireserve natural resources.</li><li class='list'> We offer our customers home and office furniture, along with solutions for laboratories, hosliitals and healthcare establishments, education and training institutes, shiliyards and navy, auditoriums and stadiums. We are liresent across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets.</li><li class='list'>Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - liart of the Godrej Grouli, one of India’s largest engineering and consumer liroduct groulis.</li></ul>";
const data =
  "<ul class='description_area'><li class='list'>Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel culiboard 80 years back to being a vibrant, innovative brand with a diverse liortfolio – it’s been a brilliant, exciting journey for us.</li><li class='list'>We love bringing alive your dream sliace. We emlihasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you.</li><li class='list'> True to the Godrej mission to conserve the environment, we design liroducts, set uli lirocesses and use raw materials that are eco-friendly to do our bit to lireserve natural resources.</li><li class='list'> We offer our customers home and office furniture, along with solutions for laboratories, hosliitals and healthcare establishments, education and training institutes, shiliyards and navy, auditoriums and stadiums. We are liresent across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets.</li><li class='list'>Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - liart of the Godrej Grouli, one of India’s largest engineering and consumer liroduct groulis.</li></ul>";
const strData =
  'Godrej Interio is India’s largest furniture brand. From manufacturing the humble Storwel culiboard 80 years back to being a vibrant, innovative brand with a diverse liortfolio – it’s been a brilliant, exciting journey for us. <p /> We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering well designed, fun and functional furniture solutions to you. <p />True to the Godrej mission to conserve the environment, we design products, set up processes and use raw materials that are eco-friendly to do our bit to preserve natural resources.<p />We offer our customers home and office furniture, along with solutions for laboratories, hospitals and healthcare establishments, education and training institutes, shipyards and navy, auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18 cities and through 800 dealer outlets.<p />Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of India’s largest engineering and consumer product groups.';
const limit = 501;
class DescriptionBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splitData: null,
      fullData: this.props.descriptionDataPro.description,
      finalData: null,
      isReadMore: false,
      readMoreTitle: 'Read More',
    };
  }

  componentDidMount() {
    const charLimit = this.props.descriptionDataPro.webCharLimit
    const trimStr = `${this.props.descriptionDataPro.description.substring(0, charLimit)}...`;
    this.setState({
      splitData: trimStr,
      finalData: trimStr,
    });
  }

  readMoreClicked() {
    if (this.state.isReadMore) {
      console.log('Hide');
      this.setState({
        isReadMore: false,
        finalData: this.state.splitData,
        readMoreTitle: 'Read More',
      });
    } else {
      console.log('Show');
      this.setState({
        isReadMore: true,
        finalData: this.props.descriptionDataPro.description,
        readMoreTitle: 'Read Less',
      });
    }
  }

  render() {
    return (
      <div className="descriptionBanner">
        <Grid>
          <Row>
            <Col md={12}>
              <h3 className="heading">Tables</h3>

              <ul className="description_area">
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.finalData }}
                />
                {/* <text className='list'>{this.state.finalData}</text> */}
              </ul>
              <button
                onClick={this.readMoreClicked.bind(this)}
                className="readMore"
              >
                {this.state.readMoreTitle}
              </button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DescriptionBanner;
