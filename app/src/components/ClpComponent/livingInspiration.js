import React from 'react';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/clpContainer/clpContainer.scss';
// import themeData from '../../data/themeData.json';
import {
	espotAPI,
	imagePrefix
} from '../../../public/constants/constants';

class LivingTheme extends React.Component {
  state = {
    themeData: null,
    isLoading: true,
    errors: null,
  };

  contentShowDetails() {
    console.log('CLICKED');
  }

  getThemeData() {
  	apiManager
  		.get(espotAPI+'GI_CLP_THEME_living')
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
  	this.getThemeData();
  }

  render() {
	  const { themeData } = this.state;
    return (
		!!themeData && 
		<div className="clpTheme">
			<h2>{themeData.title}</h2>
			<p className='desc'>{themeData.description}</p>
			{themeData.recoImgArray.map((themeItem) => {
				return(
					<div class='content-childTheme'>
						<figure>
							<img src={`${imagePrefix}${themeItem.fullImage}`} alt='img' className='img'/>
						</figure>
						{themeItem.recoIconArray.map((itemDetail) => {
							return (
								itemDetail.coords.map((cordVal, i) => {
									const x = cordVal.x+'%';
									const y = cordVal.y+'%';
									return(
										<span
											className='content-icons'
											style={{top:x, left:y}}
										>
											<img
												src={`${imagePrefix}${itemDetail.iconOpen}`}
												alt= 'open-icon'
											/>
										</span>
									)									
								})
							)
						})}
					</div>
				)
			})
		}
		</div>
    );
  }
}

export default LivingTheme;
