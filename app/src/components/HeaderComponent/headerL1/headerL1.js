import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/headerContainer/headerL1.scss';
import {
  headerStatic,
  storeId,
  accessToken,
} from '../../../../public/constants/constants';


class HeaderL1 extends React.Component {
  state = {
    layer1Data: [],
    isLoading: true,
    errors: null,
  };

  getHeaderLayer1() {
    apiManager
      .get(headerStatic)
      .then(response => {
        this.setState({
          layer1Data: response.data.data.Header_Static_Links,
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
  }

  render() {
    const { isLoading, layer1Data } = this.state;
    return (
      <ul className="layer1">
        {!isLoading ? (
          layer1Data.map((linkData, index) => (
            <li className="listItems" key={index}>
              {linkData.text === 'TRACK ORDER' ? <Link to='/guestTrackOrder'><a className="action" href={linkData.action}>{linkData.text}</a></Link> : <a className="action" href={linkData.action}>{linkData.text}</a>}
            </li>
          ))
        ) : (
            <div>Something Went Wrong</div>
          )}
      </ul>
    );
  }
}

export default HeaderL1;
