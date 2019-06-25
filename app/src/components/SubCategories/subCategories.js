import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import { getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../utils/utilityManager';


import { Route, NavLink, Link, withRouter } from 'react-router-dom';
import { imagePrefix } from '../../../public/constants/constants';
class SubCategoriesArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatImg: null,
    };
    this.compLeft = {};
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref) {
    this.ref = ref;
  }

  handleMouseOver(subCategoryData) {
    this.setState({
      subCatImg: subCategoryData.fullImage,
    });
  }

  handleMouseOut() {
    this.setState({
      subCatImg: null,
    });
  }

  componentDidMount() {
    const rect = this.ref.getBoundingClientRect();
    this.compLeft = { left: -1 * rect.left };
  }

  onLinkNavigation = () => {
    this.props.plpReduxStateReset();
  }

  render() {
    const { subCatImg } = this.state;
    const catClass =
      this.props.subCategoryArray.length > 6 ? 'catLongList' : 'catList';
    return (
      <div className='catNav' ref={this.setRef} >
        {!!subCatImg && <div className='subCatImage' style={this.compLeft}>
          <img src={`${imagePrefix}${subCatImg}`} className='subCatImg' alt='Sub Cat Img' />
        </div>}

        <ul className={catClass}>
          {this.props.subCategoryArray.map((subCategoryData, index) => {
            var routePath;
            if (this.props.categoryNamePro === 'Rooms') {
              routePath = `/clp/${subCategoryData.uniqueID}`;
            }
            else {
              routePath = `/furniture-${subCategoryData.categoryName.split(' ').join('-')}/${subCategoryData.uniqueID}`;
            }
            return (
              <li
                className="subCatList"
                key={`subCat-${index}`}
                onMouseOver={this.handleMouseOver.bind(this, subCategoryData)}
                onMouseOut={this.handleMouseOut.bind(this)}
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

//export default SubCategoriesArray;


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