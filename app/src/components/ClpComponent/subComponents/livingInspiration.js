import React from 'react';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/clpContainer/clpContainer.scss';
import {
	espotAPI
} from '../../../../public/constants/constants';
import {THEME_DATA} from '../../../constants/app/clpConstants';

class LivingTheme extends React.Component {
  state = {
    themeData: [],
    isLoading: true,
    errors: null,
  };

  getThemeData() {
  	apiManager
  		.get(espotAPI+'GI_CLP_THEME_living')
  		.then(response => {
  			this.setState({
  			themeData: response.data.data,
  			isLoading: false,
  			});
  			console.log('#######&&&&&&&', themeData.data.ThemeData);
  		})
  		.catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
  	this.getThemeData();
  }

  render() {
    return (
      <div className="clpTheme testCLP">
       {THEME_DATA}
      </div>
    );
  }
}

export default LivingTheme;
