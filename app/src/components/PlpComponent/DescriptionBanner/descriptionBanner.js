import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import { string } from 'prop-types';

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
    console.log('PLPDescripton',this.props.descriptionDataPro.description);
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
