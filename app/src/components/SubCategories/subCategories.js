import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import {createCategoryPlpURL, getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../utils/utilityManager';


import { Route, NavLink, Link, withRouter } from 'react-router-dom';
import { imagePrefix } from '../../../public/constants/constants';
class SubCategoriesArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatImg: null,
      menuHidden:true
    };
    this.compLeft = {};
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref) {
    this.ref = ref;
  }


  onLinkNavigation = () => { 
    this.props.plpReduxStateReset();
    this.setState({menuHidden:false});
    setTimeout(function() { 
      this.setState({menuHidden:true}) 
    }.bind(this), 500)
  }

  render() {
    const { subCatImg } = this.state;
    const catClass =
      this.props.subCategoryArray.length > 6 ? 'catLongList' : 'catList';
    return (
      <div className={this.state.menuHidden?'catNav':'catNavToggle'} ref={this.setRef} >
        {!!subCatImg && <div className='subCatImage' style={this.compLeft}>
          <img src={`${imagePrefix}${subCatImg}`} className='subCatImg' alt='Sub Cat Img' />
        </div>}
        <ul className={catClass}>
          {this.props.subCategoryArray.map((subCategoryData, index) => {
            var routePath;
			      var subcatName = String(subCategoryData.categoryName).toLowerCase();
			
            if (this.props.categoryNamePro.toLowerCase().indexOf('rooms') > -1 ) {
              routePath = `/rooms-${subCategoryData.categoryIdentifier.toLowerCase()}`;
            }
            else if (this.props.categoryNamePro.indexOf('Inspiration') > -1 ) {
              routePath = '/inspiration';
            }
            else {
			  routePath = createCategoryPlpURL(subCategoryData.categoryIdentifier);
            }
            return (
              <li
                className="subCatList"
                key={`subCat-${index}`}
           
              >
                <Link to={{ pathname: routePath, state: { categoryId: subCategoryData.uniqueID }, }} className="links" onClick={this.onLinkNavigation} >
                  {subCategoryData.categoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}



/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
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
)(SubCategoriesArray);