import React from 'react';
import { Link } from 'react-router-dom';

const image = ({ data }) => (
  <Link className="link" to="/register">
    <img className="imgfullwidth" src={data} alt="sofa" />
  </Link>
);

export default image;
