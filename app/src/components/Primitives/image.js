import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const GetImage = ({ props }) => (
    <LazyLoadImage
        src={props.src}
        alt={props.alt}
    />
);
 
export default GetImage;