import React from 'react'

const Error404 = (
    <img
      className="icon"
      src={require('../../../src/components/SVGs/error404.svg')}
    />
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