import React from 'react';

const espot = props => {
  const espotData = props.espot.data;
  let renderData;

  if (espotData) {
    if (espotData.type === 'content') {
      renderData = (
        <div dangerouslySetInnerHTML={{ __html: espotData.content }} />
      );
    } else {
      renderData = <img href={espotData.content} alt='Banner Content' />;
    }
  }
  return <div>{renderData}</div>;
};

export default espot;
