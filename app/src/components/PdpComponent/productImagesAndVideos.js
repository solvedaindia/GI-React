import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Player } from 'video-react';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';

class productImagesAndVideos extends React.Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    componentDidMount = () => {
        this.renderImages(this.props.imagesAndVideos.productImages);
        this.renderVideos(this.props.imagesAndVideos.productVideos);
    }

    /* render Images */
    renderImages = (allImages) => {
        allImages.map((images) => {
            this.state.images.push({'original': images.imageSrc, 'thumbnail': images.thumbnail});
        });
    }

    /* render Videos */
    renderVideos = (allVideos) => {
        allVideos.map((video) => {
            this.state.images.push({'renderItem': this.renderVideoPlayer.bind(this) , 'thumbnail': video.thumbnail, 'videourl': video.videoSrc});
        });
    }

    /* render video player */
    renderVideoPlayer(event) {
        return (
            <div className='video-wrapper'>
                <Player
                    autoPlay
                    poster={event.thumbnail}
                    src={event.videourl}
                />
            </div>
          );
    }

    render() {
        return(
            <div className='gallaryWrapper'>
                <div className='featured-box'>
                <span className="ribbon_star">
                    <svg className="star_img" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <path fill="#FFF" fillRule="evenodd" d="M7.021 11.073l4.339 2.282-.829-4.832L14.042 5.1l-4.851-.705L7.02 0l-2.17 4.396L0 5.1l3.51 3.422-.828 4.832z">
                    </path>
                    </svg>
                 </span>
                 <span className='featured-text'>{this.props.ribbonText}</span>
                 
                 </div>
                <ImageGallery 
                    showFullscreenButton={false}
                    items={this.state.images}
                    showNav={false}
                    showPlayButton={false}
                />
             </div>
        )
    }
} 

export default productImagesAndVideos;