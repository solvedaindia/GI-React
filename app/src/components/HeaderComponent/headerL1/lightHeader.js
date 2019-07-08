import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WhiteLogo from '../../SVGs/whiteLogo';
import '../../../../public/styles/headerContainer/headerLight.scss';
const LightHeader = () => {
    return (
        <div className='lighHeader'>
            <figure className='logo'>
                <a href='/'><WhiteLogo width="171" height="33" /></a>
            </figure>
        </div>
    )
}

export default LightHeader;