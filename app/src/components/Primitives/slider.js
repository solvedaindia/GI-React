import React from 'react';
import apiManager from '../../utils/apiManager';
import Slider from 'react-slick';
import BannerData from '../../data/BannerData.json';
import '../../../public/styles/slider.scss';
import {heroSliderAPI, storeId, accessToken} from '../../../public/constants/constants';

class FullBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        heroSlider: null,
        isLoading: false,
        error: null,
        };
    }
    
    getSliderData() {
        apiManager.get(heroSliderAPI)
        .then(response => {
            this.setState({
                heroSlider: response.data.data.bannerList,
                isLoading: false
            });
            console.log('Slider Data', response.data.data.bannerList);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
            console.log('SLider Data Error');
        });
    }
    componentDidMount() {
        this.getSliderData();
    }

    render() {
        const {heroSlider} = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return(
            <div className='fsBanner'>
                <Slider {...settings}>
                    {!!heroSlider && (heroSlider.map((sliderData, index)=> {
                        return (
                            <a href={sliderData.onClickUrl} key={index}>
                                <img 
                                    src={sliderData.imageSrc}
                                    alt={sliderData.alt}
                                />
                            </a>
                        )
                    } ))}
                </Slider>
            </div>
        )
    }
}

export default FullBanner;
