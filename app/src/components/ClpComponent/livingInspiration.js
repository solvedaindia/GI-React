import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/clpContainer/clpContainer.scss';
import ThemeData from './themeData';
import { isMobile } from '../../utils/utilityManager';
import {
	clpThemeAPI,
	imagePrefix
} from '../../../public/constants/constants';
import ThemeListData from './themeList';

class LivingTheme extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themeData: null,
			isLoading: true,
			errors: null,
			showPopup: false
		};
	  }

  getThemeData(id) {
  	apiManager
  		.get(clpThemeAPI+`GI_CLP_ROOMS_THEME_${id.toUpperCase().replace(' ', '')}`)
  		.then(response => {
  			this.setState({
				themeData: response.data.data,
				isLoading: false,
  			});
  		})
  		.catch(error => this.setState({ error, isLoading: false }));
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.id !== nextProps.id){
      this.getThemeData(nextProps.id);
    }
  }

  componentDidMount() {
  	this.getThemeData(this.props.id);
  }

  render() {
		const { themeData } = this.state;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
    return (
		!!themeData && 
		<div className="clpTheme">
			<div className='clp-short-desc'>
				<h2 className='title'>{themeData.title}</h2>
				<p className='desc'>{themeData.description}</p>
			</div>
			{!isMobile() ?
				themeData.recoImgArray && themeData.recoImgArray.map((themeItem, index) => {
					return(
						<div className='content-childTheme' key={index}>
							<figure>
								<img src={`${imagePrefix}${themeItem.fullImage}`} alt={themeItem.altText} className='img'/>
								<ThemeListData themeItem = { themeItem } key={`${index}-livingTheme`}/>
							</figure>
						</div>
					)
				})
				:
				<Slider {...settings}>
					{themeData.recoImgArray && themeData.recoImgArray.map((themeItem, index) => {
						return(
							<div className='content-childTheme'>
								<figure>
									<img src={`${imagePrefix}${themeItem.fullImage}`} alt={themeItem.altText} className='img'/>
								</figure>
								<ThemeListData themeItem = { themeItem } key={`${index}-livingTheme`}/>
							</div>
						)
					})}
				</Slider>
			}
		</div>
    );
  }
}

export default LivingTheme;
