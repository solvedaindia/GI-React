import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Player, BigPlayButton } from 'video-react';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';
import { imagePrefix } from '../../../public/constants/constants';

import Zoomin from '../../components/SVGs/zoomIn.svg';
import Zoomout from '../../components/SVGs/zoomOut.svg';

class productImagesAndVideos extends React.Component {
  constructor() {
    super();
    this.images = [];
    this.state = {
      activeData: false,
      gallery: null,
    };
    this.isZoomScreen = false;
  }

  componentDidMount() {
    const contentElement = document.getElementsByClassName(
      'image-gallery-thumbnails-container',
    );
    contentElement[0].classList.add('active');
  }

  componentWillReceiveProps(nextProps) {
    const fullscreenButton = document.getElementsByClassName(
      'image-gallery-fullscreen-button',
    );
    this.hideThumnailsOnFullScreen(
      fullscreenButton[0].classList.contains('active'),
    );
  }

  async hideThumnailsOnFullScreen(isFullScreen) {
    const thumbnailsContainer = document.getElementsByClassName(
      'image-gallery-thumbnails-container',
    );

    if (this.state.activeData === false && isFullScreen === true) {
      this.isZoomScreen = true;

      thumbnailsContainer[0].classList.remove('active');
      thumbnailsContainer[0].classList.add('dataNotActive');
      this.setState({
        activeData: true,
      });
      
    } else {
      this.isZoomScreen = false;
      thumbnailsContainer[0].classList.remove('dataNotActive');
      thumbnailsContainer[0].classList.add('active');
      
      this.setState({
        activeData: false,
      });
    }
  }

  /* render Videos */
  filterImagesAndVideos = (imagesAndVideos, screenType) => {
    let imagePath = '';
    this.images = [];
    let imageArray = [];
    if (imagesAndVideos.thumbnailImages.length >= imagesAndVideos.mainImages.length) {
    	imageArray = imagesAndVideos.thumbnailImages;
    } else {
      	imageArray = imagesAndVideos.mainImages;
	}
	
	imageArray.map((data, index) => {
		let thumbnailPath = '';
		if (screenType && imagesAndVideos.zoomImages[index]) {
		  imagePath = imagesAndVideos.zoomImages[index].imagePath;
		} else if(imagesAndVideos.mainImages[index]) {
		  imagePath = imagesAndVideos.mainImages[index].imagePath;
		}
		
		if (imagesAndVideos.thumbnailImages[index]) {
			thumbnailPath = `${imagePrefix}${imagesAndVideos.thumbnailImages[index].imagePath}`;
		}

		if (data.type === 'video') {
		const videoUrl = `${imagePrefix}${data.videoPath}`;
			this.images.push({
				renderItem: this.renderVideoPlayer.bind(this),
				thumbnail: thumbnailPath,
				videourl: videoUrl,
			});  
		} else {
			const fullImagePath = `${imagePrefix}${imagePath}`;
			this.images.push({ original: fullImagePath, thumbnail: thumbnailPath });
		}
	  });
  };


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

  zoomin() {
    const slides = document.getElementsByClassName('image-gallery-slide');
    for (let i = 0; i < slides.length; i++) {
      if (
        slides[i].classList.contains('center') &&
        slides[i].children[0].classList.contains('image-gallery-image')
      ) {
        const currWidth = slides[i].children[0].children[0].clientWidth;
        slides[i].children[0].children[0].style.width = `${currWidth + 100}px`;
      }
    }
  }

  zoomout() {
    const slides = document.getElementsByClassName('image-gallery-slide');
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('center') && slides[i].children[0].classList.contains('image-gallery-image')) {
        const currWidth = slides[i].children[0].children[0].clientWidth;
        if (currWidth == 100) return false;
        slides[i].children[0].children[0].style.width = `${currWidth - 300}px`;
      }
    }
  }

  async handleClick(e) {
    if (
      e.target.nodeName === 'IMG' ||
      e.target.classList.contains('video-react-icon-fullscreen') === true
    ) {
      const btnSubmitTags = document.getElementsByClassName(
        'image-gallery-fullscreen-button',
      );
      btnSubmitTags[0].click();
    } else if (e.target.nodeName === 'VIDEO') {
      const fullscreenButton = document.getElementsByClassName(
        'image-gallery-fullscreen-button',
      );
      if (fullscreenButton[0].classList.contains('active')) {
        this.setState({
          activeData: true,
        });
      } else {
        this.setState({
          activeData: false,
        });
      }
    }
  }

  renderZoomButtons = props => { 
    if (this.isZoomScreen) {
      return  <div className="zoominout" id="zoomdiv">
      <button className="zoom zoomin" onClick={this.zoomin}><img src={Zoomin} alt="Zoomin"/></button>
      <button className="zoom" onClick={this.zoomout}><img src={Zoomout} alt="Zoomout"/></button>
      </div>;
    } else {
      return;
    }
  
  };

  render() {
	  this.filterImagesAndVideos(this.props.skuData.attachments, this.isZoomScreen);
	  let featuredClass = 'hide';
    if (this.props.skuData.ribbonText) {
	    featuredClass = 'featured-box';
	  }

    return (
      <div className="gallaryWrapper">
        <div className={featuredClass}>
	        <span className='ribbon_star'>
	          <svg className="star_img" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
	            <path fill="#FFF" fillRule="evenodd" d="M7.021 11.073l4.339 2.282-.829-4.832L14.042 5.1l-4.851-.705L7.02 0l-2.17 4.396L0 5.1l3.51 3.422-.828 4.832z">
	            </path>
	          </svg>
	        </span>
	        {this.props.skuData.ribbonText &&
            <span className="featured-text">{this.props.skuData.ribbonText}</span>
			    }
        </div>
        
        <ImageGallery
          showFullscreenButton
          items={this.images}
          showNav={this.state.activeData}
          showPlayButton={false}
          onClick={this.handleClick.bind(this)}
          lazyLoad={true}
          renderCustomControls={this.renderZoomButtons}
        />
        
       {/* <div className="zoominout" id="zoomdiv">
        <button className="zoom zoomin" onClick={this.zoomin}><img src={Zoomin} alt="Zoomin"/></button>
				<button className="zoom" onClick={this.zoomout}><img src={Zoomout} alt="Zoomout"/></button>
        </div> */}
      </div>
    );
  }
}
// var node=document.querySelector('.image-gallery-fullscreen-button');
// var elezoom =document.getElementById('zoomdiv');
// node.parentNode.insertBefore(elezoom, node.nextSibling);

export default productImagesAndVideos;
