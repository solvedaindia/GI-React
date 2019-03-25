import React from 'react';

const socialIcon = (props) => {
    const socialHtml = props.name.map((item, index) => {
    return (
        <li className='list' key={index}><a className='link' href={item.action} ><img src={item.src} alt={item.alt}/></a></li>
    );
    })
    return socialHtml;
};

export default socialIcon;