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
  }


  getBreadcrumbData() {

  }

  componentDidMount() {
    this.getBreadcrumbData();
  }

  render() {

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
              breadRoute = `/rooms-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
            }
            else if (this.props.plpBreadcrumbPro[0].label.toLowerCase() === 'products' && index === 1) {
              breadRoute = `/furniture-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
            }
            else {
              breadRoute = `/furniture-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
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
            else if (pdpBreadcrumb[0].label.toLowerCase() === 'rooms' && index === 1) {
              breadRoute = `/rooms-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
            }
            else if (pdpBreadcrumb[0].label.toLowerCase() === 'products' && index === 1) {
              breadRoute = `/furniture-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
            }
            else {
              breadRoute = `/furniture-${breadLabel.split(' ').join('-').toLowerCase()}/${data.value}`;
            }

            return (
              <>
                <span className='links'><Link to={breadRoute}>{`${breadLabel} >`}</Link></span>
                {pdpBreadcrumb.length === index + 1 ? <span className='links'>{`${this.props.productNamePro}`}</span> : null}
              </>
            )

          })}
        </div>
      )
    }

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
