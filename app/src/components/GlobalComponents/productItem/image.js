import React from 'react';
import { Link } from 'react-router-dom';

const image = ({ data }) => (
    <Link to='/register'>
        <img className='img-fullwidth' src={data} alt='sofa' />
    </Link>
);

export default image;