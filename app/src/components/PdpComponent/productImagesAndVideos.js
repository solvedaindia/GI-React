import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Player } from 'video-react';
import './css/image-gallery.scss';
import './css/video-react.scss';

class productImagesAndVideos extends React.Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    componentDidMount = () => {
        this.renderImages(this.props.name.productImages);
        this.renderVideos(this.props.name.productVideos);
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
            <ImageGallery 
                showFullscreenButton={false}
                items={this.state.images}
                showNav={false}
                showPlayButton={false}
             />
        )
    }
} 

export default productImagesAndVideos;