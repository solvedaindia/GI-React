import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { getCookie } from '../../../utils/utilityManager';
import '../../../../public/styles/headerContainer/headerL1.scss';
import { headerStatic } from '../../../../public/constants/constants';

class HeaderL1 extends React.Component {
  state = {
    layer1Data: [],
    isLoading: true,
    errors: null,
    getDefaultPincode: '',
  };

  getHeaderLayer1() {
    apiManager
      .get(headerStatic)
      .then(response => {
        const {data} = response || {};
        this.setState({
          layer1Data: data && data.data.Header_Static_Links,
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
      getDefaultPincode: getCookie('pincode'),
    });
  }

  componentWillReceiveProps() {
    this.setState({
      getDefaultPincode: getCookie('pincode'),
    });
  }

  render() {
    const { isLoading, layer1Data, getDefaultPincode } = this.state;
    return (
      <>
        <ul className="nav nav-tabs d-none d-lg-flex" role="tablist">
          <li className="nav-item">
            <Link className="nav-link personal" to="/" title="Personal">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="javascript:void(0);"
              onClick={() => window.location.assign('/business/')}
              title="Business"
            >
              BUSINESS
            </a>
          </li>
        </ul>
        <div className="header-link">
          {!isLoading && layer1Data && layer1Data.length > 0 ? (
            layer1Data.map((linkData, index) => {
              if (linkData.text === 'TRACK ORDER') {
                return getCookie('isLoggedIn') === 'true' ? (
                  <Link
                    className="action"
                    to={{
                      pathname: '/myAccount',
                      state: { from: 'myorder' },
                    }}
                    key={index}
                  >
                    {linkData.text}
                  </Link>
                ) : (
                  <Link className="action" to="/guestTrackOrder" key={index}>
                    {linkData.text}
                  </Link>
                );
              }
              return (
                <>
                  {linkData.text === 'LOCATE STORES' ? (
                    <Link
                      className="action"
                      to={{
                        pathname: '/storelocator',
                        state: { pincode: getDefaultPincode },
                      }}
                      key={index}
                    >
                      {linkData.text}
                    </Link>
                  ) : (
                    <Link className="action" to="/support" key={index}>
                      {linkData.text}
                    </Link>
                  )}
                </>
              );
            })
          ) : (
            <div>...</div>
          )}
        </div>
      </>
    );
  }
}

export default HeaderL1;
