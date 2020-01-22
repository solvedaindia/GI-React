import React from 'react'
import ContentEspot from '../../components/Primitives/staticContent';

const Error404 = (
  <ContentEspot espotName = { 'GI_ERROR_404_IMG' } />
  );

const InternetError = () =>
  <div className="pageNotfound">
      <div className="innerContainer">
        <div className="ErrorIcon">
            {Error404}
        </div>
             
        <div className="ErrorText">
            <h3 className="heading">There is no internet connection</h3>
            <div className="errorDescription">Please check your network setting/internet connection and try again.</div>
        </div>
     
        </div>
  </div>

export default InternetError;