import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';
import {
  imagePrefix,
} from '../../../../public/constants/constants';
import {createPdpURL, createSEOPdpURL} from '../../../utils/utilityManager';

class Image extends React.Component {
  render() {
    let imageItem;
    if (this.props.data === '') {
      imageItem = (
        <ImageLoader
          className="imgfullwidth"
          src={require('../../../../public/images/plpAssests/placeholder-image.png')}
          alt="product"
        />
      );
    } else {
      imageItem = (
        <ImageLoader
          className="imgfullwidth"
          src={`${imagePrefix}${this.props.data}`}
          alt={this.props.productName}
        />
      );
    }

    var routePath = createSEOPdpURL(this.props.productName,this.props.shortDescription, this.props.partNumber);
    return (
      <LazyLoad className="imgBox" debounce={false}>
        <Link className="link" to={{ pathname: routePath, state: { breadcrumbData: this.props.breadcrumbDataPro} }}>
          {imageItem}
        </Link>
      </LazyLoad>
    );
  }
}

export default Image;
