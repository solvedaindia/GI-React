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
      menuHidden:false
    };
    this.compLeft = {};
    this.setRef = this.setRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    return this.props.isOpen!=nextProps.isOpen;
  }
  

  setRef(ref) {
    this.ref = ref;
  }


  onLinkNavigation = () => {
    this.props.plpReduxStateReset();
    this.props.onCloseMenu();
    // this.setState({menuHidden:false});
    // setTimeout(function() { 
    //   this.setState({menuHidden:true}) 
    // }.bind(this), 500)
  }
  onMenuMouseOut(event)
  {
  //  if(event.relatedTarget.cl)
    if(!(event.relatedTarget.className=="subCatList" ||
        event.relatedTarget.className=="links" ||
        event.relatedTarget.className=="listItems" ||
        event.relatedTarget.className=="catLongList"))
        {
          this.props.onCloseMenu();
        }
   // console.log("related",event.relatedTarget.className)
  }

  render() {
    const { subCatImg } = this.state;
    const catClass =
      this.props.subCategoryArray.length > 6 ? 'catLongList' : 'catList';
    return (
      //onMouseOut={(event)=>{this.onMenuMouseOut(event)}}
      <div className={this.props.isOpen?'catNav':'catNavToggle'} ref={this.props.reference} >
        {!!subCatImg && <div className='subCatImage' style={this.compLeft}>
          <img src={`${imagePrefix}${subCatImg}`} className='subCatImg' alt='Sub Cat Img' />
        </div>}
        <ul className={catClass}>
          {this.props.subCategoryArray.map((subCategoryData, index) => {
            var routePath;
			      var subcatName = String(subCategoryData.categoryName).toLowerCase();
			
            if (this.props.categoryNamePro.toLowerCase().indexOf('rooms') > -1 ) {
              routePath = `/online-furniture-${subCategoryData.categoryIdentifier.toLowerCase()}`;
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