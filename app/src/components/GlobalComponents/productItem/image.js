import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';
import {
  newMachineUrl,
  store,
  catalog,
  imagePrefix,
} from '../../../../public/constants/constants';

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
          src={`${imagePrefix}${this.props.data}`}
          // src={`https://192.168.0.36:8443${this.props.data}`}
          alt="sofa"
        />
      );
    }
    const routePath = `/pdp/${this.props.parentUniqueId}/${
      this.props.uniqueId
    }`;
    return (
      <LazyLoad className="imgBox" debounce={false}>
        <Link className="link" to={routePath}>
          {imageItem}
        </Link>
      </LazyLoad>
    );
  }
}

export default Image;
