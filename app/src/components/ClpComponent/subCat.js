/**
 *
 * CLP Sub Categories
 *
 */

import React from 'react';
import '../../../public/styles/plpContainer/plpContainer.scss';
import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import axios from 'axios';
import {
	subCatAPI,
	storeId,
	accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/plpContainer/plpContainer.scss';

const categoryId = '10001';
export class AppSubCat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subCatData: null,
			error: false,
			isLoading: false,
		};
	}
	componentDidMount() {
		this.fetchSubCategoryData();
	}

	fetchSubCategoryData() {
		axios
			.get(subCatAPI + categoryId, {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				this.setState({ subCatData: response.data.data });
			})
			.catch(error => {
				// console.log('PLPSUBError---', error);
			});
	}

	render() {
		const { error, isLoading, subCatData } = this.state;
		let subCategories;
		if (subCatData != null) {
			subCategories = (
				<SubCategories subCategoryData={this.state.subCatData} />
			);
		}

		return (
			<>
				{subCategories}
			</>
		);
	}
}

export default AppSubCat;