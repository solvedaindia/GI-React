import React from 'react';
import apiManager from '../../utils/apiManager';
import WidgetList from './widgetList';
import {
  homePageLayoutAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
export class HomapegeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageLayout: {},
      isLoading: false,
      error: null,
    };
  }

  getPageLayout() {
    apiManager
      .get(homePageLayoutAPI)
      .then(response => {
        this.setState({
          homepageLayout: response.data.data.GI_Homepage_Layout_Content,
          isLoading: false,
        });
        console.log(
          'HomepageData',
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
      !!homePageLayout &&
      homepageLayout.map((widget, i) => {
        <WidgetList
          {...widget}
          key={`${widget.title}_widget_${i}`}
          index={`${widget.title}_widget_${i}`}
        />;
      })
    );
  }
}

export default HomapegeLayout;
