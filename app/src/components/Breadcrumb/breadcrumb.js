import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../../public/styles/breadcrumb.scss';

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbData: null,
            isLoading: true,
            errors: null
        };
        console.log('Breadcrumb Data Params', this.props);
    }
  

  getBreadcrumbData() {
    
  }

  componentDidMount() {
    this.getBreadcrumbData();
  }

  render() {
    
    return (
        this.props.match.path === '/rooms-:category/:id' ?
        (<div className='breadCrumb'>
            <span className='links'> <Link to='/'>Home ></Link></span>
            <span className='links'> {this.props.match.params.category.replace(/-/g, " ")}</span> 
        </div>)
        :
        <div className='breadCrumb'>
            <span className='links'> <Link to='/'>Home ></Link></span>
            <span className='links'> {this.props.staticName}</span> 
        </div>
    );
  }
}

export default withRouter(Breadcrumb);
