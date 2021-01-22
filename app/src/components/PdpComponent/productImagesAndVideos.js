import React from "react";
import Slider from "react-slick";
import ImageGallery from "react-image-gallery";
import { Player, BigPlayButton } from "video-react";
import "../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss";
import "../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss";
import { imagePrefix } from "../../../public/constants/constants";
import { isMobile } from "../../utils/utilityManager";
import Zoomin from "../../components/SVGs/magnifying-glass-zoom-in-plus.svg";
import Zoomout from "../../components/SVGs/magnifying-glass-zoom-out.svg";
import closeIcon from "../../components/SVGs/outlined_close.svg";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

class productImagesAndVideos extends React.Component {
  constructor() {
    super();
    this.images = [];
    this.state = {
      activeData: false,
      gallery: null,
      infinite: true,
      autoPlay: false,
      isRTL: false,
      isZoomScreen: false,
      fullScreen:'',
    };
    
    //this.mainImgSlider = React.createRef();
    this.isZoomScreen = false;
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.refArray = [];
    
    let test = 10;
    console.log('test = ',test);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this)
  }

  componentDidMount() {
    const contentElement = document.getElementsByClassName(
      "image-gallery-thumbnails-container"
    );
    contentElement[0].classList.add("active");
  }

  async hideThumnailsOnFullScreen(isFullScreen) {
    const thumbnailsContainer = document.getElementsByClassName(
      "image-gallery-thumbnails-container"
    );

    if (/*this.state.activeData === false &&*/ isFullScreen === true) {
      this.isZoomScreen = true;

      thumbnailsContainer[0].classList.remove("active");
      thumbnailsContainer[0].classList.add("dataNotActive");
      // this.setState({
      //   activeData: true,
      // });
    } else {
      this.isZoomScreen = false;
      thumbnailsContainer[0].classList.remove("dataNotActive");
      thumbnailsContainer[0].classList.add("active");

      // this.setState({
      //   activeData: false,
      // });
    }
  }

  /* render Videos */
  filterImagesAndVideos = (imagesAndVideos, screenType) => {
    let imagePath = "";
    this.images = [];
    let imageArray = [];
    if (
      imagesAndVideos.thumbnailImages.length >=
      imagesAndVideos.mainImages.length
    ) {
      imageArray = imagesAndVideos.thumbnailImages;
    } else {
      imageArray = imagesAndVideos.mainImages;
    }

    imageArray.map((data, index) => {
      let thumbnailPath = "";
      if (screenType && imagesAndVideos.zoomImages[index]) {
        imagePath = imagesAndVideos.zoomImages[index].imagePath;
        //imagePath = '/B2C/EspotImages/Images/Kitchen/Kitchen_Hero_Banner1.png'//imagesAndVideos.zoomImages[index].imagePath;
      } else if (imagesAndVideos.mainImages[index]) {
        imagePath = imagesAndVideos.mainImages[index].imagePath;
      }

      if (imagesAndVideos.thumbnailImages[index]) {
        thumbnailPath = `${imagePrefix}${
          imagesAndVideos.thumbnailImages[index].imagePath
        }`;
      }

      if (data.type === "video") {
        const videoUrl = `${imagePrefix}${data.videoPath}`;
        this.images.push({
          renderItem: this.renderVideoPlayer.bind(this),
          thumbnail: thumbnailPath,
          originalAlt: this.props.skuData.productName,
          thumbnailAlt: this.props.skuData.productName,
          videourl: videoUrl
        });
      } else {
        const fullImagePath = `${imagePrefix}${imagePath}`;
        this.images.push({
          original: fullImagePath,
          originalAlt: this.props.skuData.imageAltText,
          thumbnailAlt: this.props.skuData.imageAltText,
          thumbnail: thumbnailPath
        });
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
    const slides = document.getElementsByClassName("image-gallery-slide");
    for (let i = 0; i < slides.length; i++) {
      if (
        slides[i].classList.contains("center") &&
        slides[i].children[0].classList.contains("image-gallery-image")
      ) {
        const currWidth = slides[i].children[0].children[0].clientWidth;
        slides[i].children[0].children[0].style.width = `${currWidth + 100}px`;
      }
    }
  }

  /* View in fullscreen */
  openFullscreen() {
    var elem = document.getElementById("product-full-screen");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    this.mainImgSlider.slickGoTo(document.getElementById('img-index-count').innerHTML-1);
    this.setState({
      fullScreen:'active-fs',
    })
  }

  /* Close fullscreen */
  closeFullscreen() {
    var elem = document.getElementById("product-full-screen");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    document.getElementById('img-index-count').innerHTML =1;
    this.setState({
      fullScreen:'',
    })
  }

  onZoomIn(event) {
    let mainImgIndex = document.getElementById('img-index-count').innerHTML - 1
      if (this.refArray[mainImgIndex].current) {
        this.refArray[mainImgIndex].current.context.dispatch.zoomIn(event);
      }
     
  }
  onZoomOut(event) {
    let mainImgIndex = document.getElementById('img-index-count').innerHTML - 1
    if (this.refArray[mainImgIndex].current) {
      this.refArray[mainImgIndex].current.context.dispatch.zoomOut(event);
    }
  }

  zoomout() {
    const slides = document.getElementsByClassName("image-gallery-slide");
    for (let i = 0; i < slides.length; i++) {
      if (
        slides[i].classList.contains("center") &&
        slides[i].children[0].classList.contains("image-gallery-image")
      ) {
        const currWidth = slides[i].children[0].children[0].clientWidth;
        if (currWidth == 100) return false;
        slides[i].children[0].children[0].style.width = `${currWidth - 100}px`;
      }
    }
  }

  resetwidth(e) {
    let imgGallery = document.getElementsByClassName("image-gallery-image");
    for (let i = 0; i < imgGallery.length; i++) {
      if (imgGallery[i] === undefined) {
        imgGallery[i].children[0].style.width = "";
      } else {
        imgGallery[i].children[0].style.width = "";
      }
    }
  }

  async handleClick(e) {
    if (
      e.target.nodeName === "IMG" ||
      e.target.classList.contains("video-react-icon-fullscreen") === true
    ) {
      this.resetwidth();
      const btnSubmitTags = document.getElementsByClassName(
        "image-gallery-fullscreen-button"
      );
      if (this.state.isZoomScreen === false) {
        const divElement = document.getElementsByClassName("image-gallery ");
        if (divElement[0].requestFullscreen) {
        } else if (divElement[0].msRequestFullscreen) {
        } else if (divElement[0].mozRequestFullScreen) {
        } else if (divElement[0].webkitRequestFullscreen) {
        } else {
          divElement[0].style.zIndex = 2147483001;
        }

        this.setState({ isZoomScreen: true });
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
    } else if (e.target.nodeName === "VIDEO") {
      const fullscreenButton = document.getElementsByClassName(
        "image-gallery-fullscreen-button"
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
      return (
        <>
          <div className="cancelWrapper">
            <button
              onClick={this.handleClick.bind(this)}
              className="closeBtn"
              id="ali_ahmad"
            >
              <img className="imgCross" src={Zoomin} alt="Zoomin" />
            </button>
          </div>
          <div className="zoominout" id="zoomdiv">
            <button className="zoom zoomin" onClick={this.zoomin}>
              <img src={Zoomin} alt="Zoomin" />
            </button>
            <button className="zoom" onClick={this.zoomout}>
              <img src={Zoomout} alt="Zoomout" />
            </button>
          </div>
        </>
      );
    } else {
      return;
    }
  };

  _onSlide(currentIndex) {
    if (this.state.isZoomScreen && !isMobile()) {
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
    } else {
      const elements = document.getElementsByClassName("image-gallery-image");
      for (let i = 0; i < elements.length; i++) {
        elements[i].children[0].style = null;
      }
    }
  }

  _onScreenChange(fullScreenElement) {
    this.setState({
      activeData: !!fullScreenElement,
      isZoomScreen: !!fullScreenElement
    });

    const thumbnailsContainer = document.getElementsByClassName(
      "image-gallery-thumbnails-container"
    );
    if (!!fullScreenElement === true) {
      this.isZoomScreen = true;
      thumbnailsContainer[0].classList.remove("active");
      thumbnailsContainer[0].classList.add("dataNotActive");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";

      if (!isMobile()) {
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
      thumbnailsContainer[0].classList.remove("dataNotActive");
      thumbnailsContainer[0].classList.add("active");

      const elements = document.getElementsByClassName("image-gallery-image");
      for (let i = 0; i < elements.length; i++) {
        elements[i].children[0].style = null;
      }

      document.body.style.overflow = "";
      document.body.style.position = "";
    }
  }

  render() {
    this.refArray = [];
    const isActive = this.state.activeData && !isMobile();
    this.filterImagesAndVideos(
      this.props.skuData.attachments,
      this.state.isZoomScreen
    );
    let featuredClass = "hide";
    if (this.props.skuData.ribbonText) {
      featuredClass = "featured-box";
    }
    
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    return (
      <div className="gallaryWrapper">
        <div className={featuredClass}>
          <span className="ribbon_star">
            <svg
              className="star_img"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M7.021 11.073l4.339 2.282-.829-4.832L14.042 5.1l-4.851-.705L7.02 0l-2.17 4.396L0 5.1l3.51 3.422-.828 4.832z"
              />
            </svg>
          </span>
          {this.props.skuData.ribbonText && (
            <span className="featured-text">
              {this.props.skuData.ribbonText}
            </span>
          )}
        </div>

        <ImageGallery
          items={this.images}
          showNav={isActive}
          showPlayButton={false}
          onClick={this.openFullscreen}
          lazyLoad={false}
          renderCustomControls={this.renderZoomButtons}
          isRTL={this.state.isRTL}
          infinite={this.state.infinite}
          onScreenChange={this._onScreenChange.bind(this)}
          onSlide={this._onSlide.bind(this)}
          autoPlay={this.state.autoPlay}
          useBrowserFullscreen={true}
          onSlide={(current) => {document.getElementById('img-index-count').innerHTML = current+1}}
          ref={slider => {this.imageGalleryRef = slider}}
        />
        <div
          className={"product-full-screen "+this.state.fullScreen}
          id="product-full-screen"> 
          <div className='action-items'>
                  <button onClick={this.closeFullscreen} className="btn btn-sm btn-close">
                  <img src={closeIcon} alt="close" />
                  </button>
                  <div className="index-counter">
                    <span id="img-index-count">1</span> / {this.props.skuData.attachments.zoomImages.length}
                  </div>

                  <div class="zoom-action-item">
                    <button onClick={this.onZoomIn} className="btn btn-sm btn-zoomin">
                      <img src={Zoomin} alt="Zoomin" /></button>
                    <button onClick={this.onZoomOut} className="btn btn-sm btn-zoomout">
                      <img src={Zoomout} alt="Zoomout" /></button>
                  </div>
                  </div>
                  <Slider ref={slider => {this.mainImgSlider = slider}} {...settings} afterChange={(current) => {console.log('test index',current);
                  document.getElementById('img-index-count').innerHTML = current+1}}>
                    {this.props.skuData.attachments.zoomImages.map((data, i) => {
                      let videoUrl = data.imagePath;
                      let imageSrc = imagePrefix + data.imagePath;
                      if (this.state.fullScareen === true) {
                        imageSrc = imagePrefix + this.props.skuData.attachments.zoomImages[i].imagePath;
                      }
                      if (data.shortdesc === 'VIDEO') {
                        let tubeUrl = data.imagePath;
                        if (tubeUrl.includes('watch?v=')) {
                          videoUrl = tubeUrl.replace('watch?v=', 'embed/');
                        }
                      }
                      const zoomImgrefs = React.createRef();
                      this.refArray.push(zoomImgrefs);
                      console.log('zoomImage src = ', imageSrc);
                      return (<div className="product-zoom-items">
                       
                          <TransformWrapper>
                            <TransformComponent ref={zoomImgrefs}>
                              <img
                                className="img-fluid"
                                src={imageSrc}
                                alt=""
                              />
                            </TransformComponent>
                          </TransformWrapper>
                        
                      </div>)
                      
                    })}
                  </Slider>
        </div>
      </div>
    );
  }
}

export default productImagesAndVideos;
