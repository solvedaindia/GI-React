import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Player, BigPlayButton } from 'video-react';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/image-gallery.scss';
import '../../../public/styles/pdpComponent/imagesAndVideoGallery/video-react.scss';
import {
  newMachineUrl,
  store,
  catalog,
} from '../../../public/constants/constants';
import { nbind } from 'q';

class productImagesAndVideos extends React.Component {
	constructor() {
		super();
		this.images = []
		this.state = {
			activeData: false
		}
	}

	componentDidMount() {
		let contentElement = document.getElementsByClassName('image-gallery-thumbnails-container');
		contentElement[0].classList.add('active');
		let leftNav = document.getElementsByClassName('image-gallery-left-nav');
		let rightNav = document.getElementsByClassName('image-gallery-right-nav');
		leftNav[0].classList.add('dataNotActive');
		rightNav[0].classList.add('dataNotActive');
	}

	componentWillReceiveProps() {
		const fullscreenButton = document.getElementsByClassName('image-gallery-fullscreen-button');
		
		this.hideThumnailsOnFullScreen(fullscreenButton[0].classList.contains('active'));
	}

	async hideThumnailsOnFullScreen(isFullScreen) { //alert();
		console.log(this.state.activeData, 'this.state.activeDatathis.state.activeData=='+isFullScreen);
		//alert(isFullScreen, 'isFullScreen')
		let thumbnailsContainer = document.getElementsByClassName('image-gallery-thumbnails-container');
		let leftNav = document.getElementsByClassName('image-gallery-left-nav');
		let rightNav = document.getElementsByClassName('image-gallery-right-nav');
		
		if (this.state.activeData === false && isFullScreen === true) {
			thumbnailsContainer[0].classList.remove('active');
			thumbnailsContainer[0].classList.add('dataNotActive');
			leftNav[0].classList.remove('dataNotActive');
			leftNav[0].classList.add('active');
			rightNav[0].classList.remove('dataNotActive');
			rightNav[0].classList.add('active');
		
			await this.setState({
				activeData: true
			});
		} else {
			thumbnailsContainer[0].classList.remove('dataNotActive');
			thumbnailsContainer[0].classList.add('active');
		
			leftNav[0].classList.remove('active');
			leftNav[0].classList.add('dataNotActive');
			rightNav[0].classList.remove('active');
			rightNav[0].classList.add('dataNotActive');
			await this.setState({
				activeData: false
			});
		}

	}

	/* render Images */
	renderImages = allImages => {
		allImages.map((images) => {
			//this.images.push({'original': images.imageSrc, 'thumbnail': images.thumbnail});
			const tt = images.imageSrc + '<a role="button">Hey</a>';
			this.images.push({'renderItem': tt, 'thumbnail': images.thumbnail});
		});
		
	};

	/* render Videos */
	renderVideos = allVideos => {
		allVideos.map((video) => {
			this.images.push({'renderItem': this.renderVideoPlayer.bind(this) , 'thumbnail': video.thumbnail, 'videourl': video.videoSrc});
		});
		
	};

	/* render Videos */
	filterImagesAndVideos = imagesAndVideos => { 
		imagesAndVideos.map((data, i) => {
		if (data.type === 'image') {
			if (i === 0) {
				const fullImagePath = `${newMachineUrl}/${store}/${catalog}/${data.fullImagePath}`;
				const thumbnailPath = `${newMachineUrl}/${store}/${catalog}/${data.thumbnailPath}`;
			// this.state.images.push({'original': '/dfa2d48071fbc8a710760e9590f6290d.png' , 'thumbnail': '/dfa2d48071fbc8a710760e9590f6290d.png' });
			this.images.push({'original': fullImagePath , 'thumbnail': fullImagePath });
			}
		} else {
			this.images.push({'renderItem': this.renderVideoPlayer.bind(this) , 'thumbnail': data.thumbnailPath, 'videourl': 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'});
			}
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

	 zoomin(){
		var slides = document.getElementsByClassName("image-gallery-slide");
		for(var i = 0; i < slides.length; i++)
		{
		   if(slides[i].classList.contains('center') && slides[i].children[0].classList.contains('image-gallery-image')) {
			let currWidth = slides[i].children[0].children[0].clientWidth;
			slides[i].children[0].children[0].style.width = (currWidth + 100) + "px";
		   }
		   
		}
    }
     zoomout(){
		var slides = document.getElementsByClassName("image-gallery-slide");
		for(var i = 0; i < slides.length; i++)
		{
		   if(slides[i].classList.contains('center') && slides[i].children[0].classList.contains('image-gallery-image')) {
			let currWidth = slides[i].children[0].children[0].clientWidth;
			if(currWidth == 100) return false;
			slides[i].children[0].children[0].style.width = (currWidth - 300) + "px";
		   }
		   //e.target.classList.contains('video-react-icon-fullscreen')
		}
	}

	async handleClick(e) {
		if (e.target.nodeName === 'IMG' || e.target.classList.contains('video-react-icon-fullscreen') === true) {
    		const btnSubmitTags = document.getElementsByClassName('image-gallery-fullscreen-button');
			btnSubmitTags[0].click();
		} else if (e.target.nodeName === 'VIDEO') {
			const fullscreenButton = document.getElementsByClassName('image-gallery-fullscreen-button');
			if (fullscreenButton[0].classList.contains('active')) {
				await this.setState({
					activeData: true
				});
			} else {
				await this.setState({
					activeData: false
				});
			}
		}
	}

	render() {
		this.images = [];
		this.filterImagesAndVideos(this.props.imagesAndVideos);
			// Create a new element
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
					showFullscreenButton={true}
					items={this.images}
					showNav={true}
					showPlayButton={false}
					onClick={this.handleClick.bind(this)}
				/>
				<button onClick={this.zoomin}>+</button>
				<button onClick={this.zoomout}>-</button>
			</div>
		)
		

	}
}

export default productImagesAndVideos;
