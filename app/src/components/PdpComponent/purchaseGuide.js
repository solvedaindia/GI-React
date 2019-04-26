import React from 'react';

const espot = props => {
  const espot = '';
  let renderData;
  if (espot.type === 'content') {
    renderData = <div dangerouslySetInnerHTML={{ __html: espot }} />;
  } else {
    renderData = <img href={espot} />;
  }
  return <div>{renderData}</div>;
};

export default espot;
