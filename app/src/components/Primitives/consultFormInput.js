import React from 'react';

const Input = props => (
  <div className="form-group">   
    {props.hideAnimation ? 
      <label htmlFor="name" className="form-label">
      {props.title}
    </label> : null}     
    <input
      className="form-control"
      id="name"
      name="name"
      type="text"
      placeholder="name"
    />
   <label htmlFor="name"className="form-label">
     
    </label>} 
  </div>
);

export default Input;
