import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { Player, BigPlayButton } from 'video-react';
import '../../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';
import {
  imagePrefix,
} from '../../../../public/constants/constants';
import Accordion from './Accordion';
import '../../../../public/styles/pdpComponent/accordian.scss';
import {PURCHASE_GUIDE} from '../../../constants/app/pdpConstants';


class purchaseGuide extends React.Component {
  constructor() {
    super();
    this.imagesAndVideos = [];
    this.activeClass = '';
  }

  /* render Videos */
  filterImagesAndVideos = imagesAndVideos => {
    this.imagesAndVideos = [];
    imagesAndVideos.map(data => {
      const thumbnailPath = `${imagePrefix}${data.thumbImagePath}`;
      const path = `${imagePrefix}${data.path}`;

      if (data.type === 'image') {
        this.imagesAndVideos.push({ original: Path, thumbnail: thumbnailPath });
      } else {
        this.imagesAndVideos.push({
          renderItem: this.renderVideoPlayer.bind(this),
          thumbnail: thumbnailPath,
          videourl: path,
        });
      }
    });
  };

  /* display tab with data */
  productDetailsTab(divId) {
    const tabcontent = document.getElementsByClassName(
      'purchaseGuideTabContent',
    );
    const tabData = document.getElementsByClassName('purchaseGuideTab');
    const contentElement = document.getElementById(
      `purchaseGuidecontent_${divId}`,
    );
    const tabElement = document.getElementById(`purchaseGuideTab_${divId}`);

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('dataActive');
      tabcontent[i].classList.remove('dataNotActive');
      tabcontent[i].classList.add('dataNotActive');
      tabData[i].classList.remove('active');
    }
    contentElement.classList.remove('dataNotActive');
    contentElement.classList.remove('dataActive');
    contentElement.classList.add('dataActive');
    tabElement.classList.add('active');
  }

  /* render video player */
  renderVideoPlayer(event) {
    return (
      <div className="video-wrapper">
        <Player src={event.videourl}>
          <BigPlayButton position="center" />
        </Player>
      </div>
    );
  }

  /* render tab data */
  renderTabData(filterArray) {
    return filterArray.map((tabData, index) => {
      this.activeClass = 'active';
      if (index > 0) {
        this.activeClass = '';
      }

      return (
        <li
          id={`purchaseGuideTab_${index}`}
          className={`purchaseGuideTab purchaseGuideTabData ${
            this.activeClass
          }`}
          key={index}
        >
          <a onClick={() => this.productDetailsTab(index)}>{tabData.title}</a>
        </li>
      );
    });
  }

  /* render tab content */
  renderTabContent(filterArray) {
    return filterArray.map((contentData, index) => {
      if (index > 0) {
        this.activeClass = 'dataNotActive';
      }
      this.filterImagesAndVideos(contentData.values);
      return (
        <div
          id={`purchaseGuidecontent_${index}`}
          className={`purchaseGuideTabContent ${this.activeClass}`}
          key={index}
        >
          <ImageGallery
            showFullscreenButton={false}
            items={this.imagesAndVideos}
            showNav
            showPlayButton={false}
          />
        </div>
      );
    });
  }

  /* filter purchase guide array */
  filterPurchaseGuideArray(purchaseGuideData) {
    const data = purchaseGuideData.filter(function(data) {
      return data.values.length > 0;
    });
    return data;
  }

  render() {
    let purchaseGuideLength = 0;
    let filterArray = [];
    if (this.props.purchaseGuide.purchaseGuide && this.props.purchaseGuide.purchaseGuide.length > 0) {
      filterArray = this.filterPurchaseGuideArray(this.props.purchaseGuide.purchaseGuide);
      purchaseGuideLength = filterArray.length;
    }
    return (
      <>
        {this.props.purchaseGuide.purchaseGuide && this.props.purchaseGuide.purchaseGuide.length > 0 && purchaseGuideLength > 0 && (
          <Accordion>
            <div className="purchaseGuideDiv" id="purchaseGuideDiv">
            <Row>
              <Col md={12} sm={12} xs={12}>
                <h2 className="heading">{PURCHASE_GUIDE}</h2>
                <span className="plusIcon"></span>
              </Col>
            </Row>
            <Row className="body">
              <Col
                md={12}
                sm={12}
                xs={12}
                className="purchaseGuide_description"
              >
                <Row>
                  <Col md={12} sm={12} xs={12} className="tab-nav-container">
                    <ul>{this.renderTabData(filterArray)}</ul>
                  </Col>
                  <Col md={12} sm={12} xs={12} className="tab-content">
                    {this.renderTabContent(filterArray)}
                  </Col>
                </Row>
              </Col>
            </Row>
            </div>
        </Accordion>
        )}
      </>
    );
  }
}

export default purchaseGuide;
