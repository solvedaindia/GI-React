import React, {useRef} from 'react';
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
  
  scrollToRef = (ref) => window.scrollTo(0, ref.offsetTop)   
  // useMountEffect = (fun) => useEffect(fun, [])

  initBanner(getData) {
    let charLimit;
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
      charLimit = getData.descriptionDataPro.mobileCharLimit
    } else {
      charLimit = getData.descriptionDataPro.webCharLimit;
    }
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
    if (this.state.isReadMore) {
      this.setState({
        isReadMore: false,
        finalData: this.state.splitData,
        readMoreTitle: 'Read More',
      });
      this.scrollToRef(this.refs.description)
    } 
  }

  
  readMoreClicked() {
    if (this.state.isReadMore) {
      this.setState({
        isReadMore: false,
        finalData: this.state.splitData,
        readMoreTitle: 'Read More',
      });
      this.scrollToRef(this.refs.description)
    } else {
      // debugger;
      // const a = document.getElementsByClassName('descriptionBanner');
      
      this.setState({
        isReadMore: true,
        finalData: this.props.descriptionDataPro.description,
        readMoreTitle: 'Read Less',
      });
    }
  }
  
  render() {
    const { finalData } = this.state
    return (
      !!finalData && (
        <div ref="description" className="descriptionBanner">
          <Grid>
            <Row>
              <Col md={12}>
                {this.props.isH1Tag ? <h1 className="heading">{this.state.title}</h1> : <h3 className="heading">{this.state.title}</h3>}
                
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
