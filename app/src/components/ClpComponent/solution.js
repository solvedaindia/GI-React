import React from 'react';
import {
	espotAPI
} from '../../../public/constants/constants';

class Solution extends React.Component {
  state = {
    solutionData: null,
    isLoading: true,
    errors: null,
  };

  getSolutionData() {
  	apiManager
  		.get(espotAPI+'GI_Homepage_Godrej_Solution')
  		.then(response => {
  			this.setState({
                solutionData: response.data.data,
  			    isLoading: false,
  			});
  		})
  		.catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
  	this.getSolutionData();
  }

  render() {
    const { isLoading, solutionData } = this.state;
    return (
        <div className="homePageStatic">
            {/* {!isLoading ? (
                <div dangerouslySetInnerHTML={{ __html: solutionData.description }} />
            ) : (
            <div>...</div>
            )} */}
        </div>
    );
  }
}

export default Solution;
