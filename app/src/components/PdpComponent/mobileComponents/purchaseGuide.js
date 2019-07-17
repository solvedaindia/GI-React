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
  renderTabData() {
    return this.props.purchaseGuide.purchaseGuide.map((tabData, index) => {
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
  renderTabContent() {
    return this.props.purchaseGuide.purchaseGuide.map((contentData, index) => {
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

  render() {
    return (
      <>
        {this.props.purchaseGuide.purchaseGuide.length > 0 && (
          <Accordion>
            <div>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <h2 className="heading">Purchase Guide</h2>
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
                    <ul>{this.renderTabData()}</ul>
                  </Col>
                  <Col md={12} sm={12} xs={12} className="tab-content">
                    {this.renderTabContent()}
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
