import React from 'react';

const ribbonTag = ({ data }) => (
  <div className="featured-box">
    <span className="ribbon_star">
      <svg
        className="star_img"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
      >
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M7.021 11.073l4.339 2.282-.829-4.832L14.042 5.1l-4.851-.705L7.02 0l-2.17 4.396L0 5.1l3.51 3.422-.828 4.832z"
        />
      </svg>
    </span>
    <span className="featured-text">{data}</span>
  </div>
);

export default ribbonTag;
