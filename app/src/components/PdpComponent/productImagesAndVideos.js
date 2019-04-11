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
            <div>
                {this.props.ribbonText}
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