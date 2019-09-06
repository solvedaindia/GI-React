import React from 'react'
import ContentEspot from '../../components/Primitives/staticContent';

const Error404 = (
  <ContentEspot espotName = { 'GI_ERROR_404_IMG' } />
  );

const NotFound = () =>
  <div className="pageNotfound">
      <div className="innerContainer">
        <div className="ErrorIcon">
            {Error404}
        </div>
             
        <div className="ErrorText">
            <h3 className="heading">404 Page Not Found</h3>
            <div className="errorDescription">We are sorry but the page you are looking for does not exist.</div>
        </div>
     
        </div>
  </div>

export default NotFound;