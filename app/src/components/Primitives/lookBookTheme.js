import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/static-pages/inspiration.scss';
import '../../../public/styles/slider.scss';
import {espotAPI,imagePrefix,} from '../../../public/constants/constants';

  

class LookbookThemeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_LOOKBOOK_THEME',
      lookbookThemeSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
      
    };
  }

  getkitchensHallData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        console.log('response of kitchen hall', response)
        const {data} = response || {}
        this.setState({
          lookbookThemeSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description:data && data.data.desc,
          isLoading: false,
        });
        console.log('hall Data', data.data.desc);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('SLider Data Error');
      });
    console.log('SLider Data Error');
  }

  componentDidMount() {
    this.getkitchensHallData();
  }
render() {
    const { lookbookThemeSlider } = this.state;
    const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
                       
            variableWidth: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  dots: false,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  dots: false,
                },
              },
            ],
          };
    return (
      <div className="container">
      <h1 className="title">{this.state.title}</h1>
          <p className="Paragraphhall">{this.state.description}</p>
          <div className="inspirationSlider">
          <Slider {...settings}>
            {!!lookbookThemeSlider &&
              lookbookThemeSlider.map((sliderData, index) => (
                <a href={sliderData.onClickUrl} key={index}>
                  <img className='sliderImageSize' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
                </a>
              ))}
          </Slider>
          </div>
      </div>
    );
  }
}

export default LookbookThemeCarousel;



