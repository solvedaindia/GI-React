import React from 'react';
import {OUT_OF_STOCK} from '../../constants/app/primitivesConstants';

const OutOfStockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 49" {...props}>
        <title>Out Of Stock</title>
            <g fill="none" fill-rule="evenodd">
                <path fill="#FFF" fill-opacity=".8" fill-rule="nonzero" stroke="#EE4060" d="M.5 1h179v47H.5z"/>
                <text fill="#000" font-family="CeraGIMedium,sans-serif" font-size="16" font-weight="400" transform="translate(0 .5)">
                    <tspan x="43.5" y="30">{OUT_OF_STOCK}</tspan>
                </text>
            </g>
    </svg>

);

export default OutOfStockIcon;
