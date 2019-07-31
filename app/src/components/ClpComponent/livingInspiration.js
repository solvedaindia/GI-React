import React from 'react';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/clpContainer/clpContainer.scss';
import ThemeData from './themeData';
import {
	clpThemeAPI,
	imagePrefix
} from '../../../public/constants/constants';

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
  		.get(clpThemeAPI+'GI_CLP_THEME_living')
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
		}
		</div>
    );
  }
}

export default LivingTheme;
