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

	if(this.props.catBreadCrumb)
	{
	  return (
        <div className='breadCrumb'>
          <span className='links'> <Link to='/'>Home ></Link></span>
          <span className='links'>{this.props.catBreadCrumb}</span>
        </div>
      )
	}
  // ---- PLP Breadcrumb ----
    if (this.props.plpBreadcrumbPro) {
      return (
        <div className='breadCrumb'>
          {this.props.plpBreadcrumbPro.map((data, index) => {
            var breadLabel = data.label;
            var breadRoute = '/';

            if (index === 0) {
              breadLabel = 'Home';
              breadRoute = '/';
            }
            else if (this.props.plpBreadcrumbPro[0].label.toLowerCase() === 'rooms' && index === 1) {
              if(data.categoryIdentifier) {
                breadRoute = `/rooms-${data.categoryIdentifier.toLowerCase()}`;
              }
            }
            else if (this.props.plpBreadcrumbPro[0].label.toLowerCase() === 'products' && index === 1) {
              breadRoute = createCategoryPlpURL(data.categoryIdentifier);
            }
            else {
              breadRoute = createCategoryPlpURL(data.categoryIdentifier);
            }

            return (
              <span className='links'>{this.props.plpBreadcrumbPro.length === index + 1 ? `${breadLabel}` : <Link to={breadRoute}>{`${breadLabel} >`}</Link>}</span>
            )

          })}
        </div>
      )
    }
    else if (this.props.isFromSearchPro) {
      return (
        <div className='breadCrumb'>
          <span className='links'> <Link to='/'>Home ></Link></span>
          <span className='links'>Search Result</span>
        </div>
      )
    }

    // ---- PDP Breadcrumb ----
    if (this.props.pdpBreadcrumbPro) {
      var pdpBreadcrumb = this.props.pdpBreadcrumbPro;
      return (
        <div className='breadCrumb'>
          {pdpBreadcrumb.map((data, index) => {
            var breadLabel = data.label;
            var breadRoute = '/';

            if (index === 0) {
              breadLabel = 'Home';
              breadRoute = '/';
            }
            else if (pdpBreadcrumb[0].label.toLowerCase() === 'rooms' && index === 1 && data.categoryIdentifier) {
              breadRoute = `/rooms-${data.categoryIdentifier.toLowerCase()}`;
            }
            else if (pdpBreadcrumb[0].label.toLowerCase() === 'products' && index === 1) {
              breadRoute = createCategoryPlpURL(data.categoryIdentifier);
            }
            else {
              breadRoute = createCategoryPlpURL(data.categoryIdentifier);
            }

            return (
              <>
                <span className='links'><Link onClick={this.onLinkNavigation} to={breadRoute}>{`${breadLabel} >`}</Link></span>
                {pdpBreadcrumb.length === index + 1 ? <span className='links'>{`${this.props.productNamePro}`}</span> : null}
              </>
            )

          })}
        </div>
      )
    }

    return (
      this.props.match.path === '/rooms-:id' ?
        (<div className='breadCrumb'>
          <span className='links'> <Link to='/'>Home ></Link></span>
          <span className='links'> {this.props.match.params.id.replace(/-/g, " ")}</span>
        </div>)
        :
        <div className='breadCrumb'>
          <span className='links'> <Link to='/'>Home ></Link></span>
          <span className='links'> {this.props.staticName}</span>
        </div>
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