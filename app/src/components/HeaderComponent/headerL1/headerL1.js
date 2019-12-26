import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { getCookie } from '../../../utils/utilityManager';
import '../../../../public/styles/headerContainer/headerL1.scss';
import {
  headerStatic
} from '../../../../public/constants/constants';

class HeaderL1 extends React.Component {
  state = {
    //layer1Data: [],
    isLoading: true,
    errors: null,
    getDefaultPincode: ''
  };

	getHeaderLayer1() {
	apiManager
		.get(headerStatic)
		.then(response => {
			const {data} = response || {};
			this.setState({
			//layer1Data: data && data.data.Header_Static_Links,
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
    this.getHeaderLayer1();
    this.setState({
      getDefaultPincode: getCookie('pincode')
    })
  }

  componentWillReceiveProps() {
    this.setState({
      getDefaultPincode: getCookie('pincode')
    })
  }

  render() {
  const { isLoading, layer1Data, getDefaultPincode } = this.state;
    return (
      <>
      </>
    );
  }
}

export default HeaderL1;
