import React from 'react';
import { Helmet } from "react-helmet";
import apiManager from '../../utils/apiManager';
import { espotAPI } from '../../../public/constants/constants';
import '../../../public/styles/content.scss';
import { imagePrefix } from '../../../public/constants/constants';

class Pixels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixelData: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.props.espotName)
      .then(response => {
        const { data } = response || {};
        this.setState({
          pixelData: data && data.data.SEOTags,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    if (this.props.espotName) {
      this.getEspotData();
    }
    else {
      this.setState({
        pixelData: {},
        isLoading: false,
      });
    }
  }

  render() {
    const { pixelData } = this.state;
    if (pixelData === null || pixelData === undefined) {
      return null;
    }
    const fullImagePath = `${imagePrefix}${this.props.image}`;
    const keywords = Array.isArray(pixelData.keywords) && pixelData.keywords && pixelData.keywords.length !== 0 ? pixelData.keywords : this.props.keywords;
    return (
      <Helmet>
        <title>{pixelData.title ? pixelData.title : this.props.title}</title>
        <meta property="description" content={pixelData.description ? pixelData.description : this.props.description} />
        <meta name="keywords" content={
          !!keywords && keywords.map((keywordsData) => {
            return (
              keywordsData
            )
          })
        }></meta>
        <link rel="canonical" href={window.location.href} />
        <meta name="twitter:card" content={pixelData.twitter_card ? pixelData.twitter_card : "summary_large_image"} />
        <meta name="twitter:site" content={pixelData.twitter_site ? pixelData.twitter_site : "@godrejinterio"} />
        <meta name="twitter:title" content={pixelData.title ? pixelData.title : this.props.title} />
        <meta name="twitter:description" content={pixelData.description ? pixelData.description : this.props.description} />
        <meta name="twitter:image" content={pixelData.twitter_image ? pixelData.twitter_image : fullImagePath} />
        <meta name="twitter:image:alt" content={pixelData.twitter_image_alt ? pixelData.twitter_image_alt : this.props.alt} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content={'website'} />
        <meta property="og:title" content={pixelData.title ? pixelData.title : this.props.title} />
        <meta property="og:description" content={pixelData.description ? pixelData.description : this.props.description} />
        <meta property="og:image" content={pixelData.og_image ? pixelData.og_image : fullImagePath} />
      </Helmet>
    );
  }
}

export default Pixels;
