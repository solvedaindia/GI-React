import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Player, BigPlayButton } from 'video-react';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';
import { imagePrefix } from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import Zoomin from '../../components/SVGs/zoomIn.svg';
import Zoomout from '../../components/SVGs/zoomOut.svg';

class productImagesAndVideos extends React.Component {
  constructor() {
    super();
    this.images = [];
    this.state = {
      activeData: false,
      gallery: null,
      infinite: true,
      autoPlay : false,
      isRTL: false,
      isZoomScreen:false,
    };
    this.isZoomScreen = false;
  }

  componentDidMount() {
    const contentElement = document.getElementsByClassName(
      'image-gallery-thumbnails-container',
    );
    contentElement[0].classList.add('active');
  }

  // componentWillReceiveProps(nextProps) {
  //   const fullscreenButton = document.getElementsByClassName(
  //     'image-gallery-fullscreen-button',
  //   );
  //   this.hideThumnailsOnFullScreen(
  //     fullscreenButton[0].classList.contains('active'),
  //   );
  // }

  async hideThumnailsOnFullScreen(isFullScreen) {
    const thumbnailsContainer = document.getElementsByClassName(
      'image-gallery-thumbnails-container',
    );

    if (/*this.state.activeData === false &&*/ isFullScreen === true) {
      this.isZoomScreen = true;

      thumbnailsContainer[0].classList.remove('active');
      thumbnailsContainer[0].classList.add('dataNotActive');
      // this.setState({
      //   activeData: true,
      // });
      
    } else {
      this.isZoomScreen = false;
      thumbnailsContainer[0].classList.remove('dataNotActive');
      thumbnailsContainer[0].classList.add('active');
      
      // this.setState({
      //   activeData: false,
      // });
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
      //imagePath = '/B2C/EspotImages/Images/Kitchen/Kitchen_Hero_Banner1.png'//imagesAndVideos.zoomImages[index].imagePath;
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
				thumbnail: thumbnailPath, originalAlt:this.props.skuData.productName, thumbnailAlt:this.props.skuData.productName, 
				videourl: videoUrl,
			});  
		} else {
			const fullImagePath = `${imagePrefix}${imagePath}`;
			this.images.push({ original: fullImagePath, originalAlt:this.props.skuData.imageAltText, thumbnailAlt:this.props.skuData.imageAltText, thumbnail: thumbnailPath });
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
        slides[i].children[0].children[0].style.width = `${currWidth - 100}px`;
      }
    }
  }

  resetwidth(e) {    
    let imgGallery = document.getElementsByClassName('image-gallery-image');  
    for (let i = 0; i < imgGallery.length; i++) {    
      if (imgGallery[i] === undefined) {
        imgGallery[i].children[0].style.width=''; 
      } 
      else {
        imgGallery[i].children[0].style.width='';
      }
    } 
  
  }

  async handleClick(e) {    
    if (
      e.target.nodeName === 'IMG' ||
      e.target.classList.contains('video-react-icon-fullscreen') === true
    ) {
      this.resetwidth();
      const btnSubmitTags = document.getElementsByClassName(
        'image-gallery-fullscreen-button',
      );
        if(this.state.isZoomScreen===false)
        {
          this.setState({isZoomScreen:true});
          const elements = document.getElementsByClassName("image-gallery-image");
          for (let i = 0; i < elements.length && !isMobile(); i++) {
            // elements[i].children[0].style.position="absolute"
            // elements[i].children[0].style.margin="auto"
            // elements[i].children[0].style.left="-100%"
            // elements[i].children[0].style.right="-100%"
            // elements[i].children[0].style.top="-100%"
            // elements[i].children[0].style.bottom="-100%"

            // elements[i].children[0].style.position= "fixed";
            // elements[i].children[0].style.top= 0;
            // elements[i].children[0].style.bottom= 0;
            // elements[i].children[0].style.left= 0;
            // elements[i].children[0].style.right= 0;
            // elements[i].children[0].style.maxWidth= "100%";
            // elements[i].children[0].style.maxHeight= "100%";
            // elements[i].children[0].style.margin= "auto";
            // elements[i].children[0].style.overflow= "auto";


          }
        }
      // this.isZoomScreen = !this.isZoomScreen;
      btnSubmitTags[0].click();
    } else if (e.target.nodeName === 'VIDEO') {
      const fullscreenButton = document.getElementsByClassName(
        'image-gallery-fullscreen-button',
      );
      // if (fullscreenButton[0].classList.contains('active')) {
      //   this.setState({
      //     activeData: true,
      //   });
      // } else {
      //   this.setState({
      //     activeData: false,
      //   });
      // }
    }
    
  }

  renderZoomButtons = props => { 
    if (true) {
      return  <>
      <div className="cancelWrapper">
        <button onClick={this.handleClick.bind(this)} className="closeBtn" id='ali_ahmad'><img className="imgCross" src={Zoomin} alt="Zoomin"/></button>
      </div>
      <div className="zoominout" id="zoomdiv">
      <button className="zoom zoomin" onClick={this.zoomin}><img src={Zoomin} alt="Zoomin"/></button>
      <button className="zoom" onClick={this.zoomout}><img src={Zoomout} alt="Zoomout"/></button>
      </div></>;
    } else {
      return;
    }
  
  };

  _onSlide(currentIndex)
  {
      if(this.state.isZoomScreen && !isMobile())
      {
        const elements = document.getElementsByClassName("image-gallery-image");
        for (let i = 0; i < elements.length; i++) {
          
          // elements[i].children[0].style.position="absolute"
          // elements[i].children[0].style.margin="auto"
          // elements[i].children[0].style.left="-100%"
          // elements[i].children[0].style.right="-100%"
          // elements[i].children[0].style.top="-100%"
          // elements[i].children[0].style.bottom="-100%"

          // elements[i].children[0].style.position= "fixed";
          // elements[i].children[0].style.top= 0;
          // elements[i].children[0].style.bottom= 0;
          // elements[i].children[0].style.left= 0;
          // elements[i].children[0].style.right= 0;
          // elements[i].children[0].style.max_width= "100%";
          // elements[i].children[0].style.max_height= "100%";
          // elements[i].children[0].style.margin= "auto";
          // elements[i].children[0].style.overflow= "auto";
        }
      }
      else{
        const elements = document.getElementsByClassName("image-gallery-image");
        for (let i = 0; i < elements.length; i++) {
          elements[i].children[0].style=null;
        }
      }
  }

  _onScreenChange(fullScreenElement) {
    console.log('isFullScreen?', !!fullScreenElement);

    this.setState({
      activeData: !!fullScreenElement,
      isZoomScreen:!!fullScreenElement,
    });

    const thumbnailsContainer = document.getElementsByClassName(
      'image-gallery-thumbnails-container',
    );
    if (!!fullScreenElement === true) {
      this.isZoomScreen = true;
      thumbnailsContainer[0].classList.remove('active');
      thumbnailsContainer[0].classList.add('dataNotActive');

      if(!isMobile())
      {
        const elements = document.getElementsByClassName("image-gallery-image");
        for (let i = 0; i < elements.length; i++) {
          // elements[i].children[0].style.position="absolute"
          // elements[i].children[0].style.margin="auto"
          // elements[i].children[0].style.left="-100%"
          // elements[i].children[0].style.right="-100%"
          // elements[i].children[0].style.top="-100%"
          // elements[i].children[0].style.bottom="-100%"

          // elements[i].children[0].style.position= "fixed";
          // elements[i].children[0].style.top= 0;
          // elements[i].children[0].style.bottom= 0;
          // elements[i].children[0].style.left= 0;
          // elements[i].children[0].style.right= 0;
          // elements[i].children[0].style.maxWidth= "100%";
          // elements[i].children[0].style.maxHeight= "100%";
          // elements[i].children[0].style.margin= "auto";
          // elements[i].children[0].style.overflow= "auto";
        }
      }
    } else {
      this.isZoomScreen = false;
      thumbnailsContainer[0].classList.remove('dataNotActive');
      thumbnailsContainer[0].classList.add('active');

      const elements = document.getElementsByClassName("image-gallery-image");
      for (let i = 0; i < elements.length; i++) {
        elements[i].children[0].style=null;
      }
    

    }
  }

  render() {
    const isActive = (this.state.activeData && !isMobile());
	  this.filterImagesAndVideos(this.props.skuData.attachments, this.state.isZoomScreen);
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
          showNav={isActive}
          showPlayButton={false}
          onClick={this.handleClick.bind(this)}
          lazyLoad={false}
          renderCustomControls={this.renderZoomButtons}
          
          isRTL =  {this.state.isRTL}
          infinite = {this.state.infinite}
          onScreenChange={this._onScreenChange.bind(this)}
          onSlide = {this._onSlide.bind(this)}
          autoPlay ={this.state.autoPlay}
        />
      </div>
    );
  }
}


export default productImagesAndVideos;