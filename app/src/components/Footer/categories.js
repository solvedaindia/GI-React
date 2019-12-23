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

import { Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

// const Categories = (props) => {
//     return(
//         <Col md={12} sm={12} className='categories_section'>
//             <div>
//                 <h3 className='heading'>
//                     {props.name.text}
//                 </h3>
//                 { props.name.children && props.name.children.length > 0 &&
//                     props.name.children.map((links, i) => {
//                     return (
//                         <h4 className='categoriestext list' key={i}>
//                             <Link className='link' to={links.action} /* onClick={() => console.log("Nav Link Footer -- ",link.action)} */>
//                                 {links.text}
//                             </Link>
//                         </h4>
//                     )})
//                 }
//             </div>
//         </Col>
//     );
// }

//export default Categories;


class Categories extends React.Component {
 
    onLinkNavigation = () => {
        this.props.plpReduxStateReset();
      }

   render() {
    return(
        <Col md={12} sm={12} className='categories_section'>
            <div>
                <h3 className='heading'>
                    {this.props.name.text}
                </h3>
                { this.props.name.children && this.props.name.children.length > 0 &&
                    this.props.name.children.map((links, i) => {
                    return (
                        <h4 className='categoriestext list' key={i}>
                            <Link className='link' to={links.action} onClick={this.onLinkNavigation}>
                                {links.text}
                            </Link>
                        </h4>
                    )})
                }
            </div>
        </Col>
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
  )(Categories);

// export default Categories;

