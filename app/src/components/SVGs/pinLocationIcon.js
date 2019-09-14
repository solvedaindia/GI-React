import React from 'react';
const PinLocationLogo = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M12 2.265c-3.87 0-7 3.13-7 7 0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0 1.81-2.19 6.23-7.94 6.23-12.11 0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </defs>
    <title>Edit Your Pin Code</title>
    <g fill="none" fillRule="evenodd">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <g fill="#442B2D" fillOpacity=".54" mask="url(#b)">
        <path d="M0 0h24v24H0z" />
      </g>
    </g>
  </svg>
);

export default PinLocationLogo;
