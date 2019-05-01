import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';

class Image extends React.Component {
  render() {
    let imageItem;
    if (this.props.data === '') {
      imageItem = (
        <ImageLoader
          className="imgfullwidth"
          src={require('../../../../public/images/plpAssests/placeholder-image.png')}
          alt="sofa"
        />
      );
    } else {
      imageItem = (
        <ImageLoader
          className="imgfullwidth"
          src={`https://192.168.0.36:8443${this.props.data}`}
          alt="sofa"
        />
      );
    }

    return (
      <Link className="link" to="/pdp/22452">
        <LazyLoad debounce={false}>{imageItem}</LazyLoad>
      </Link>
    );
  }
}

export default Image;
