import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  footerApi,
} from '../../../public/constants/constants';
import Footer from '../../components/Footer/footer';
import '../../../public/styles/footerContainer/footerContainer.scss';
import FooterMobile from './FooterRWD/index';

class FooterContainer extends React.Component {
  constructor() {
    super();
    this.callFooterApi = this.callFooterApi.bind(this);
    this.state = {
      data: {},
      loading: true,
      error: false,
      isMobile: window.innerWidth <= 760,
    };
  }

  componentDidMount() {
    this.callFooterApi();
  }

  callFooterApi() {
    apiManager
      .get(footerApi)
      .then(response => {
        const { data } = response || {};
        this.setState({
          footer: data && data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }

  render() {
    if (this.state.isMobile) {
      return (
        <>
          {!this.state.loading &&
            <footer className="footer">
              {!this.state.error && this.state.footer.status === 'success' &&
                <FooterMobile
                  links={this.state.footer.data.Footer_Links}
                  newsletter={this.state.footer.data.Footer_Newsletter_Data}
                  socialicons={this.state.footer.data.Footer_Social_Data}
                  stores={this.state.footer.data.Footer_StoreLinks}
                  categories={this.state.footer.data.Footer_Categories}
                />
              }
            </footer>
          }
        </>
      );
    }
    else {
      return (
        <>
          {!this.state.loading &&
            <footer className="footer">
              {!this.state.error && this.state.footer.status === 'success' &&
                <Footer
                  links={this.state.footer.data.Footer_Links}
                  newsletter={this.state.footer.data.Footer_Newsletter_Data}
                  socialicons={this.state.footer.data.Footer_Social_Data}
                  stores={this.state.footer.data.Footer_StoreLinks}
                  categories={this.state.footer.data.Footer_Categories}
                />
              }
            </footer>
          }
        </>
      );
    }
  }
}

export default FooterContainer;
