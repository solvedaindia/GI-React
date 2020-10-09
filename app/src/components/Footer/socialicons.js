import React from 'react';
import {
    imagePrefix,
  } from '../../../public/constants/constants'; 

const socialIcon = (props) => {
    let socialHtml = '';
    if (props.name && props.name.length > 0) {
    socialHtml = props.name.map((item, index) => {
    return (
        <li className='list' key={index}><a className='link' href={item.action} target="_blank"><img src={imagePrefix+item.src} alt={item.alt}/></a></li>
    );
    })
    }
    return socialHtml;
};

export default socialIcon;