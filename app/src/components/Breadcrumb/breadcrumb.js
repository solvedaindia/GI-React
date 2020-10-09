import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../../public/styles/breadcrumb.scss';
import { createCategoryPlpURL } from '../../utils/utilityManager';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import GSchemas from '../GSchemas';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbData: null,
      isLoading: true,
      errors: null
    };
  }


  getBreadcrumbData() {

  }

  componentDidMount() {
    this.getBreadcrumbData();
  }

  onLinkNavigation = () => {
    this.props.plpReduxStateReset();
  }

  render() {
    if (this.props.catBreadCrumb) {
      return (
        <>
          <GSchemas
            schemas={[
              {
                type: 'breadcrumb',
                breadcrumbItems: [
                  { name: 'Home', url: '/' },
                  {
                    name: this.props.catBreadCrumb,
                    url: window.location.pathname,
                  },
                ],
              },
            ]}
          />
          <div className='breadCrumb'>
            <span className='links'> <Link to='/'>Home ></Link></span>
            <span className='links'>{this.props.catBreadCrumb}</span>
          </div>
        </>
      );
    }
    // ---- PLP Breadcrumb ----
    if (this.props.plpBreadcrumbPro) {
      const plpBreadCrumb = [];
      this.props.plpBreadcrumbPro.forEach((data, index) => {
        let breadLabel = data.label;
        let breadRoute = '/';

        if (index === 0) {
          breadLabel = 'Home';
          breadRoute = '/';
        } else if (
          this.props.plpBreadcrumbPro[0].label.toLowerCase() === 'rooms' &&
          index === 1
        ) {
          if (data.categoryIdentifier) {
            breadRoute = `/online-furniture-${data.categoryIdentifier.toLowerCase()}`;
          }
        } else if (
          this.props.plpBreadcrumbPro[0].label.toLowerCase() === 'products' &&
          index === 1
        ) {
          breadRoute = createCategoryPlpURL(data.categoryIdentifier);
        } else {
          breadRoute = createCategoryPlpURL(data.categoryIdentifier);
        }

        plpBreadCrumb.push({
          name: breadLabel,
          url: breadRoute,
        });
      });
      return (
        <>
          <GSchemas
            schemas={[{ type: 'breadcrumb', breadcrumbItems: plpBreadCrumb }]}
          />
          <div className='breadCrumb'>
            {plpBreadCrumb.map((data, index) => (
              <span className="links">
                {plpBreadCrumb.length === index + 1 ? (
                  `${data.name}`
                ) : (
                  <Link to={data.url} onClick={this.onLinkNavigation}>{`${
                    data.name
                  } >`}</Link>
                )}
              </span>
            ))}
          </div>
        </>
      );
    } else if (this.props.isFromSearchPro) {
      return (
        <>
          <GSchemas
            schemas={[
              {
                type: 'breadcrumb',
                breadcrumbItems: [
                  { name: 'Home', url: '/' },
                  {
                    name: 'Search Result',
                    url: window.location.pathname,
                  },
                ],
              },
            ]}
          />
          <div className='breadCrumb'>
            <span className='links'> <Link to='/'>Home ></Link></span>
            <span className='links'>Search Result</span>
          </div>
        </>
      );
    }

    // ---- PDP Breadcrumb ----
    if (this.props.pdpBreadcrumbPro) {
      const pdpBreadCrumb = [];
      this.props.pdpBreadcrumbPro.forEach((data, index) => {
        let breadLabel = data.label;
        let breadRoute = '/';

        if (index === 0) {
          breadLabel = 'Home';
          breadRoute = '/';
        } else if (this.props.pdpBreadcrumbPro[0].label.toLowerCase() === 'rooms' && index === 1 && data.categoryIdentifier) {
          breadRoute = `/online-furniture-${data.categoryIdentifier.toLowerCase()}`;
        } else if (this.props.pdpBreadcrumbPro[0].label.toLowerCase() === 'products' && index === 1) {
          breadRoute = createCategoryPlpURL(data.categoryIdentifier);
        } else {
          breadRoute = createCategoryPlpURL(data.categoryIdentifier);
        }

        pdpBreadCrumb.push({
          name: breadLabel,
          url: breadRoute,
        });
      });
      pdpBreadCrumb.push({
        name: this.props.productNamePro,
        url: window.location.pathname,
      });
      return (
        <>
          <GSchemas
            schemas={[{ type: 'breadcrumb', breadcrumbItems: pdpBreadCrumb }]}
          />
          <div className='breadCrumb'>
            {pdpBreadCrumb.map((data, index) => (
              <span className="links">
                {pdpBreadCrumb.length === index + 1 ? (
                  `${data.name}`
                ) : (
                  <Link onClick={this.onLinkNavigation} to={data.url}>{`${data.name} >`}</Link>
                )}
              </span>
            ))}
          </div>
        </>
      )
    }

    return this.props.match.path === '/online-furniture-:id' ? (
      <>
        <GSchemas
          schemas={[
            {
              type: 'breadcrumb',
              breadcrumbItems: [
                { name: 'Home', url: '/' },
                {
                  name: this.props.match.params.id.replace(/-/g, ' '),
                  url: window.location.pathname,
                },
              ],
            },
          ]}
        />
        <div className="breadCrumb">
          <span className="links">
            {' '}
            <Link to="/">Home ></Link>
          </span>
          <span className="links">
            {' '}
            {this.props.match.params.id.replace(/-/g, ' ')}
          </span>
        </div>
      </>
    ) : (
      <>
        <GSchemas
          schemas={[
            {
              type: 'breadcrumb',
              breadcrumbItems: [
                { name: 'Home', url: '/' },
                {
                  name: this.props.staticName,
                  url: window.location.pathname,
                },
              ],
            },
          ]}
        />
        <div className='breadCrumb'>
          <span className="links">
            {' '}
            <Link to="/">Home ></Link>
          </span>
          <span className='links'> {this.props.staticName}</span>
        </div>
      </>
    );
  }
}

// export default withRouter(Breadcrumb);
/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  }
};

const mapStateToProps = state => {
  // const stateObj = getReleventReduxState(state, 'plpContainer');
  return {

  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Breadcrumb);
