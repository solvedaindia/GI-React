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

let catID;
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
  contentShowDetails() {
    console.log('CLICKED');
  }

  getThemeData() {
  	apiManager
  		.get(clpThemeAPI+`GI_CLP_ROOMS_THEME_${catID}`)
  		.then(response => {
  			this.setState({
  			themeData: response.data.data,
  			isLoading: false,
  			});
  			console.log('#######&&&&&&&', response.data.data);
  		})
  		.catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
	const path = String(window.location.pathname);
    const idStr = path.split('/')[2];
    const categoryName = idStr;
    if (idStr != undefined && idStr !== catID) {
      catID = categoryName;
    }
  	this.getThemeData();
  }

  render() {
		const { themeData } = this.state;
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
    return (
		!!themeData && 
		<div className="clpTheme">
			<div class='clp-short-desc'>
				<h2 className='title'>{themeData.title}</h2>
				<p className='desc'>{themeData.description}</p>
			</div>
			{!isMobile() ?
				themeData.recoImgArray.map((themeItem) => {
					return(
						<div className='content-childTheme'>
							<figure>
								<img src={`${imagePrefix}${themeItem.fullImage}`} alt='img' className='img'/>
							</figure>
							{themeItem.recoIconArray.map((itemDetail) => {
								return (
									<ThemeData itemDetail={itemDetail} />
								)
							})}
						</div>
					)
				})
				:
				<Slider {...settings}>
					{themeData.recoImgArray.map((themeItem) => {
						return(
							<div className='content-childTheme'>
								<figure>
									<img src={`${imagePrefix}${themeItem.fullImage}`} alt='img' className='img'/>
								</figure>
								{themeItem.recoIconArray.map((itemDetail) => {
									return (
										<ThemeData itemDetail={itemDetail} />
									)
								})}
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
