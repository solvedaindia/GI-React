import React from 'react';
import { Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';
import {
  newMachineUrl,
  store,
  catalog,
  imagePrefix,
} from '../../../../public/constants/constants';

class SubCatImage extends React.Component {
  render() {
    console.log('Subcatttt---', this.props);
    return (
      <Link className="link" to={`/plp/${this.props.uniqueIdPro}`}>
        <div className="Imgbox">
          {' '}
          <ImageLoader
            className="imgfullwidth"
            src={`${imagePrefix}/${this.props.imageData}`}
            alt="mattresses"
          />
        </div>
      </Link>
    );
  }
}

export default withRouter(SubCatImage);
