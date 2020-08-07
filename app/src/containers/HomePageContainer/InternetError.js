import React from "react";
import history from "../../utils/history";
import ContentEspot from "../../components/Primitives/staticContent";

class InternetError extends React.Component {
  constructor(props) {
    super(props);
    this.Error404 = <ContentEspot espotName={"GI_ERROR_404_IMG"} />;
  }

  onlineIndicator() {
    // Show a different icon based on offline/online
    if (window.location.pathname === "/internet-error") {
      history.goBack();
    }
  }

  componentDidMount() {}
  componentWillUnmount() {
    window.removeEventListener("online", this.onlineIndicator.bind(this));
  }
  render() {
    return (
      <div className="pageNotfound">
        <div className="innerContainer">
          <div className="ErrorIcon">{this.Error404}</div>

          <div className="ErrorText">
            <h3 className="heading">There is no internet connection</h3>
            <div className="errorDescription">
              Please check your network setting/internet connection and try
              again.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const InternetError = () =>
//   <div className="pageNotfound">
//       <div className="innerContainer">
//         <div className="ErrorIcon">
//             {Error404}
//         </div>

//         <div className="ErrorText">
//             <h3 className="heading">There is no internet connection</h3>
//             <div className="errorDescription">Please check your network setting/internet connection and try again.</div>
//         </div>

//         </div>
//   </div>

export default InternetError;
