import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../../../utils/imageLoader';

const image = ({ data }) => (
  <Link className="link" to="/register">
    <LazyLoad debounce={false}>
      <ImageLoader className="imgfullwidth" src={'https://192.168.0.36:8443' + data} alt="sofa" />
    </LazyLoad>
  </Link>
);

export default image;
