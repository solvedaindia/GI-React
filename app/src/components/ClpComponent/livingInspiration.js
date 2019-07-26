import React from 'react';
import apiManager from '../../utils/apiManager';

import '../../../public/styles/clpContainer/clpContainer.scss';
// import themeData from '../../data/themeData.json';
import {
	espotAPI
} from '../../../public/constants/constants';

class LivingTheme extends React.Component {
  state = {
    themeData: [],
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
  			console.log('#######&&&&&&&', themeData.data.data);
  		})
  		.catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
  	this.getThemeData();
  }

  render() {
    return (
      <div className="clpTheme">
        Theme Data
        {/* <h3>{themeData.data.themeData.title}</h3>
        <p>{themeData.data.themeData.subTitle}</p>
        <div
          dangerouslySetInnerHTML={{ __html: themeData.data.themeData.content }}
        />
        {/* {!isLoading ? (
			<div dangerouslySetInnerHTML={{ __html: homePageData.themeData.data.ThemeData.con }} />
			) : (
			<div>Something Went Wrong</div>
			)} */}
      </div>
    );
  }
}

export default LivingTheme;
