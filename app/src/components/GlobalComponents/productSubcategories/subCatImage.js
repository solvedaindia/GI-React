import React from 'react';
import { Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';

class SubCatImage extends React.Component {
  render() {
    // console.log('Subcatttt---',this.props.uniqueIdPro);
    return (
      <Link className='link' to={'/plp/'+this.props.uniqueIdPro}>
        <div className="Imgbox"> <ImageLoader className="imgfullwidth" src={'https://192.168.0.36:8443' + this.props.imageData} alt="mattresses" /></div>
      </Link>
    );
  }
}

export default withRouter(SubCatImage);
