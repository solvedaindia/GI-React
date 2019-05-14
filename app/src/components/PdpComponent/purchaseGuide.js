import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { Player, BigPlayButton } from 'video-react';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';

class purchaseGuide extends React.Component {
	constructor() {
		super();
		this.videos = []
		this.state = {
			hide: '',
		};
	}

		/* render Videos */
		filterImagesAndVideos = videos => {

			videos.map((data) => {
				this.videos.push({'renderItem': this.renderVideoPlayer.bind(this) , 'thumbnail': data.thumbImagePath, 'videourl': 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'});
			}
			);
		};

			/* render video player */
	renderVideoPlayer(event) {
		return (
			<div className='video-wrapper'>
			    <Player src={event.videourl}>
      				<BigPlayButton position="center" />
    			</Player>
			</div>
		);
	}

	render() {
		this.videos = [];

		this.filterImagesAndVideos(this.props.purchaseGuide);
	return (      
		<div>
		<Row>
          <Col md={12} sm={12} xs={12}>
            <h3 className="heading">Purchase Guide</h3>
          </Col>
        </Row>
		<Row>
		<Col md={6} sm={12} xs={12}>
            <div className="product_description">
              {this.props.purchaseGuide.map((tabData, index) => {
                this.activeClass = 'active';
                if (index > 0) {
                  this.activeClass = '';
                }

                return (
                  <a
                    key={index}
                    id={`tab_${index}`}
                    className={`tab tabData ${this.activeClass}`}
                    onClick={() => this.productDetailsTab(index)}
                  >
                    {tabData.title}
                  </a>
                );
              })}
					<ImageGallery 
								  showFullscreenButton={false}
								  items={this.videos}
								  showNav={true}
								  showPlayButton={false}
							  />
            </div>
          </Col>
			</Row>
		</div>
	);
	}
}

export default purchaseGuide;
