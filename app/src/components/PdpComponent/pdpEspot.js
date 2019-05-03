import React from 'react';

const espot = props => {
  const espotData = props.espot;
  
  let renderData;
  if (espotData.type === 'content') {
    renderData = <div dangerouslySetInnerHTML={{ __html: espotData.content }} />;
  } else {
    renderData = <img href={espotData.content} />;
  }
  return <div>{renderData}</div>;
};

export default espot;
