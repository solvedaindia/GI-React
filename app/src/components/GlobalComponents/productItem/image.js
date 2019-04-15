import React from 'react';
import { Link } from 'react-router-dom';

const image = ({ data }) => (
  <Link className="link" to="/register">
    <img className="imgfullwidth" src={'https://192.168.0.36:8443'+data} alt="sofa" />
  </Link>
);

export default image;
