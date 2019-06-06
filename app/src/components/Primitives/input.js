import React from "react";

const Input = props => {
  return (
    <div className="form-group">        
        <input
            className="form-control"
            id={props.name}
            name={props.name}
            type={props.inputType}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            onBlur={props.focusOut}
            onFocus={props.focusIn}
            {...props}
        />
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
    </div>
  );
};

export default Input;
