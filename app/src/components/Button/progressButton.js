import React from "react";
import { Button } from "react-bootstrap";

const ProgressButton = props => {
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClickEvent}
      className={props.styleClassName}
    >
      {props.isProcessing ? (
        <ul className="loadingdots-on-button-container">
          <li>{props.title}</li>
          <li>
            {" "}
            <div className="loadingdots-on-button">
              <div className="loadingdots-on-button--dot" />
              <div className="loadingdots-on-button--dot" />
              <div className="loadingdots-on-button--dot" />
            </div>
          </li>
        </ul>
      ) : (
        props.title
      )}
    </Button>
  );
};

export default ProgressButton;
