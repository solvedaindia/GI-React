import React from "react";
import ContentEspot from "../../components/Primitives/staticContent";
import apiManager from "../../utils/apiManager";

const Error404 = <ContentEspot espotName={"GI_ERROR_404_IMG"} />;

export class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const currentRoute = window.location.href.toString();
    // if (currentRoute.includes(".pdf")) {
    //   navigator.serviceWorker.getRegistrations().then(function(registrations) {
    //     for (let registration of registrations) {
    //       registration.unregister();
    //     }
    //   });

    //   apiManager
    //     .get("/B2B_Redirection")
    //     .then(response => {
    //       window.location.reload();
    //     })
    //     .catch(error => {
    //       window.location.reload();
    //     });

    //   return <></>;
    // }

    return (
      <div className="pageNotfound">
        <div className="innerContainer">
          <div className="ErrorIcon">{Error404}</div>

          <div className="ErrorText">
            <h3 className="heading">404 Page Not Found</h3>
            <div className="errorDescription">
              We are sorry but the page you are looking for does not exist.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
