import React from 'react';
import Slider from 'react-slick';
// import GetImage from './image';
import BannerData from '../../data/BannerData.json';
class FullBanner extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
        <div>
            <Slider {...settings}>
                {BannerData.map((BannerlistData)=>{
                    return BannerlistData.bannerList.map((bannerData, index)=>{
                        return (
                            <div className='fsBanner'>
                                <a href={bannerData.onClickUrl} key={index}>
                                    <img 
                                        src={bannerData.src}
                                        alt={bannerData.alt}
                                    />
                                </a>
                            </div>
                        )
                    })
                })}
            </Slider>
        </div>
        );
    }
}

export default FullBanner;