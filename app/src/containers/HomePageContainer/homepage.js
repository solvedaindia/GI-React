import React from 'react';
import axios from 'axios';
import WidgetList from '../../components/HomePageStatic/widgetList';
import {
  homePageLayoutAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
export class HomapegeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageLayout: null,
      isLoading: false,
      error: null,
    };
  }

  getPageLayout() {
    axios
      .get(homePageLayoutAPI, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        this.setState({
          homepageLayout: response.data.data.GI_Homepage_Layout_Content,
          isLoading: false,
        });
        console.log(
          'HomepageData Layout',
          response.data.data.GI_Homepage_Layout_Content,
        );
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getPageLayout();
  }

  render() {
    const { homepageLayout } = this.state;
    return (
      !!homepageLayout &&
      homepageLayout.map((widget, i) => (
        <WidgetList
          {...widget}
          key={`${widget.title}_widget_${i}`}
          index={`${widget.title}_widget_${i}`}
        />
      ))
    );
  }
}

export default HomapegeLayout;
