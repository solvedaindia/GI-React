import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import { string } from 'prop-types';

class DescriptionBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splitData: null,
      fullData: this.props.descriptionDataPro.description,
      title: this.props.descriptionDataPro.title,
      finalData: '',
      isReadMore: false,
      readMoreTitle: 'Read More',
    };
  }

  initBanner(getData) {
    const charLimit = getData.descriptionDataPro.webCharLimit;
	var trimStr;
	if(getData.descriptionDataPro.description != null)
	{
		trimStr = `${getData.descriptionDataPro.description.substring(
		  0,
		  charLimit,
		)}...`;
	}
    this.setState({
      splitData: trimStr,
      finalData: trimStr,
      title: getData.descriptionDataPro.title
    });
  }
  
  componentDidMount() {
    this.initBanner(this.props);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.descriptionDataPro !== this.props.descriptionDataPro) {
      this.initBanner(nextProps);
    }
  }

  
  readMoreClicked() {
    if (this.state.isReadMore) {
      this.setState({
        isReadMore: false,
        finalData: this.state.splitData,
        readMoreTitle: 'Read More',
      });
    } else {
      this.setState({
        isReadMore: true,
        finalData: this.props.descriptionDataPro.description,
        readMoreTitle: 'Read Less',
      });
      {console.log('data',this.state.finalData)}
    }
  }

  render() {
    const { finalData } = this.state
    return (
      !!finalData && (
        <div className="descriptionBanner">
          <Grid>
            <Row>
              <Col md={12}>
                <h1 className="heading">{this.state.title}</h1>
                <ul className="description_area">
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.finalData }}
                  />
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
      )
    );
  }
}

export default DescriptionBanner;
