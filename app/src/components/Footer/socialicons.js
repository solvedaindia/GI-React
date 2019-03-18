import React from 'react';
import image from '../../../public/images/search.png';

const socialIcon = (props) => {
    const socialHtml = props.name.map((item, index) => {
    return (
        <li className='list' key={index}><a className='link' href={item.action} ><img src={item.src} alt={item.alt}/></a></li>
    );
    })
    return socialHtml;
};

export default socialIcon;