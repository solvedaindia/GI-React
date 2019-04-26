import React from 'react';

const espot = props => {
  const espot = props.espot.GI_PDP_Sample_Content;
  let renderData;
  if (espot.type === 'content') {
    renderData = <div dangerouslySetInnerHTML={{ __html: espot.content }} />;
  } else {
    renderData = <img href={espot.content} />;
  }
  return <div>{renderData}</div>;
};

export default espot;
