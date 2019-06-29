import React from 'react';
import {
  espotPrefix
} from '../../../public/constants/constants';

const espot = props => {
  const espotData = props.espot.data;
  let renderData;

  if (espotData) {
    if (espotData.type === 'content') {
      renderData = (
        <div dangerouslySetInnerHTML={{ __html: espotData.content }} />
      );
    } else {
      renderData = <img href={espotPrefix+espotData.content} />;
    }
  }
  return <div>{renderData}</div>;
};

export default espot;
