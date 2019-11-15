import React from 'react';
const CartLogo = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-labelledby="title" {...props}>
            <title>Cart Logo</title>
            <g fill="none" fillRule="evenodd">
                <path stroke="#000" strokeWidth="1.2" d="M23 5.052l-2.456 8.41H10.406L7.95 5.052 1 5"/>
                <path fill="#000" d="M10.308 18.346c0 .85.65 1.5 1.5 1.5s1.5-.65 1.5-1.5-.65-1.5-1.5-1.5-1.5.65-1.5 1.5M18.177 18.346c0 .85.65 1.5 1.5 1.5s1.5-.65 1.5-1.5-.65-1.5-1.5-1.5-1.5.65-1.5 1.5"/>
            </g>
        </svg>
    );
}

export default CartLogo;