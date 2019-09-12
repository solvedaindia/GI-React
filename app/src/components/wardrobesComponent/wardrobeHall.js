import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';

import {espotAPI,imagePrefix,} from '../../../public/constants/constants';

class WHallOfFame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_WARDROBES_HALL_OF_FAME',
      hallSlider: null,
      isLoading: false,
      error: null,
      title: '',
      description:'',
      
    };
  }

  getWardrobesHallData() {
    apiManager
    .get(espotAPI + this.state.espotName)
      .then(response => {
        const {data} = response || {}
        this.setState({
          hallSlider: data && data.data.bannerList,
          title: data && data.data.title,
          description:data && data.data.desc,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getWardrobesHallData();
  }

  render() {
    const { hallSlider } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll:2,
    };
    return (
      	<div className="hallOfFame">
         	<h2 className="title">{this.state.title}</h2>
          	<p className="desc">{this.state.description}</p>
			<Slider {...settings}>
			{!!hallSlider &&
				hallSlider.map((sliderData, index) => (
				<a href={sliderData.onClickUrl} key={index}>
					<img className='img' src={imagePrefix + sliderData.imageSrc} alt={sliderData.alt} />
					<p className='info'>{sliderData.desc}</p>
				</a>
				))}
			</Slider>
      	</div>
    );
  }
}

export default WHallOfFame;
