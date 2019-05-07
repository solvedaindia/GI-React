import React from 'react';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/clpContainer/clpContainer.scss';
import themeData from '../../../data/themeData.json';
// import {
// 	themeDataAPI,
//   	storeId,
//   	accessToken,
// } from '../../../../public/constants/constants';

class LivingTheme extends React.Component {
	state = {
		themeData: [],
		isLoading: true,
		errors: null,
	};
	contentShowDetails(){
		console.log('CLICKED');
	}
	
	// getThemeData() {
	// 	apiManager
	// 		.get(themeDataAPI)
	// 		.then(response => {
	// 			this.setState({
	// 			themeData: response.data.themeData,
	// 			isLoading: false,
	// 			});
	// 			console.log('#######&&&&&&&', themeData.data.ThemeData);
	// 		})
	// 		.catch(error => this.setState({ error, isLoading: false }));
	// }

	// componentDidMount() {
	// 	this.getThemeData();
	// }

	render() {
		return (
		<div className="clpTheme">
			<h3>{ themeData.data.themeData.title}</h3>
			<p>{ themeData.data.themeData.subTitle}</p>
			<div dangerouslySetInnerHTML={{ __html: themeData.data.themeData.content }} />
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
