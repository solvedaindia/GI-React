import React from "react";
import { Helmet } from "react-helmet";
import apiManager from "../../utils/apiManager";
import {
  pdpApi2,
  espotAPI,
  GI_PDP_Promocode_TandC,
  GI_PDP_Our_Promises
} from "../../../public/constants/constants";
import PdpComponent from "../../components/PdpComponent/PdpComponent";
import appCookie from "../../utils/cookie";
import LoadingIndicator from "../../utils/loadingIndicator";
import PDPMeta from "./pdpMeta";
import Pixels from "../../components/Primitives/pixels";

class PdpContainer extends React.Component {
  constructor() {
    super();
    this.callPdpApi = this.callPdpApi.bind(this);
    this.state = {
      pdpLoading: true,
      pdpError: false,
      espotLoading: true,
      espotError: false,
      espotTandCLoading: true,
      keywords: [],
      description: "",
      title: "",
      alt: "",
      image: ""
    };
  }

  componentDidMount() {
    this.callPdpApi();
    this.callPdpEspotApi();
    this.callPdpPromoTandC();
  }

  parseSeoTagData(pdp, partNumber) {
    if (pdp.data.type === "bundle") {
      this.setState({
        keywords:
          pdp.data.bundleData[0].keywords && pdp.data.bundleData[0].keywords,
        description: pdp.data.bundleData[0]
          ? pdp.data.bundleData[0].metaDescription
          : "",
        title: pdp.data.bundleData[0] ? pdp.data.bundleData[0].pageTitle : "",
        alt: pdp.data.bundleData[0] ? pdp.data.bundleData[0].imageAltText : "",
        image: pdp.data.bundleData[0] ? pdp.data.bundleData[0].thumbnail : ""
      });
    } else if (pdp.data.type === "kit") {
      this.setState({
        keywords: pdp.data.kitData[0].keywords && pdp.data.kitData[0].keywords,
        description: pdp.data.kitData[0]
          ? pdp.data.kitData[0].metaDescription
          : "",
        title: pdp.data.kitData[0] ? pdp.data.kitData[0].pageTitle : "",
        alt: pdp.data.kitData[0] ? pdp.data.kitData[0].imageAltText : "",
        image: pdp.data.kitData[0] ? pdp.data.kitData[0].thumbnail : ""
      });
    } else {
      this.setState({
        keywords: pdp.data.keywords && pdp.data.keywords,
        description: pdp.data.skuData
          ? pdp.data.skuData[0].metaDescription
          : "",
        alt: pdp.data.skuData ? pdp.data.skuData[0].imageAltText : "",
        title:
          pdp.data.skuData && pdp.data.skuData.length > 0
            ? pdp.data.skuData.filter(ele => ele.partNumber === partNumber)[0]
                .pageTitle
            : "",
        image: pdp.data.skuData ? pdp.data.skuData[0].thumbnail : ""
      });
    }
  }

  callPdpApi() {
    let splitedPathName = window.location.pathname.split("/");
    const partNumber = splitedPathName[splitedPathName.length - 1];
    const skuId = this.props.match.params.skuId;

    apiManager
      .get(pdpApi2 + skuId)
      .then(response => {
        this.setState({
          pdp: response.data,
          pdpLoading: false
        });
        let recentData = [];
        let dataArray = response.data.data.skuData;
        if (response.data.data.type === "kit") {
          dataArray = response.data.data.kitData;
        } else if (response.data.data.type === "bundle") {
          dataArray = response.data.data.bundleData;
        }
        if (
          appCookie.get("recentProduct") &&
          JSON.parse(appCookie.get("recentProduct").length > 0)
        ) {
          recentData = JSON.parse(appCookie.get("recentProduct"));
          const masterProduct = recentData.find(prd => prd.partNumber == skuId);
          if (masterProduct) {
            //no add already in the list
          } else {
            let index = 0;
            for (let i = 0; dataArray && i < dataArray.length; i++) {
              if (dataArray[i].partNumber === skuId) {
                index = i;
              }
            }
            const data = {
              uniqueID: dataArray[index].uniqueID,
              productName: dataArray[index].productName,
              partNumber: dataArray[index].partNumber,
              type: dataArray[index].type,
              actualPrice: dataArray[index].actualPrice,
              offerPrice: dataArray[index].offerPrice,
              thumbnail: dataArray[index].thumbnail,
              emiData: dataArray[index].emiData,
              shortDescription: dataArray[index].shortDescription,
              discount: dataArray[index].discount,
              pageTitle: dataArray[index].pageTitle
            };
            if (recentData.length > 3) {
              recentData = recentData.filter((prod, index) => index !== 0);
            }
            recentData.push(data);
          }
          appCookie.set(
            "recentProduct",
            JSON.stringify(recentData),
            365 * 24 * 60 * 60 * 1000
          );
        } else {
          let index = 0;
          for (let i = 0; dataArray && i < dataArray.length; i++) {
            if (dataArray[i].partNumber === skuId) {
              index = i;
            }
          }
          recentData[0] = {
            uniqueID: dataArray[index].uniqueID,
            productName: dataArray[index].productName,
            partNumber: dataArray[index].partNumber,
            type: dataArray[index].type,
            actualPrice: dataArray[index].actualPrice,
            offerPrice: dataArray[index].offerPrice,
            thumbnail: dataArray[index].thumbnail,
            emiData: dataArray[index].emiData,
            shortDescription: dataArray[index].shortDescription,
            discount: dataArray[index].discount,
            pageTitle: dataArray[index].pageTitle
          };

          appCookie.set(
            "recentProduct",
            JSON.stringify(recentData),
            365 * 24 * 60 * 60 * 1000
          );
        }

        this.parseSeoTagData(response.data, partNumber);
        if (appCookie.get("isPDPAddToCart") === null) {
          appCookie.set("isPDPAddToCart", "", 365 * 24 * 60 * 60 * 1000);
        }
      })
      .catch(error => {});
  }

  callPdpEspotApi() {
    const APIType = GI_PDP_Our_Promises;
    const espotPdpApi = espotAPI + APIType;
    apiManager
      .get(espotPdpApi)
      .then(response => {
        this.setState({
          pdpEspot: response.data,
          espotLoading: false
        });
      })
      .catch(error => {});
  }

  callPdpPromoTandC() {
    const APIType = GI_PDP_Promocode_TandC;
    const espotPdpApi = espotAPI + APIType;
    apiManager
      .get(espotPdpApi)
      .then(response => {
        this.setState({
          pdpEspotTandC: response.data,
          espotTandCLoading: false
        });
      })
      .catch(error => {});
  }

  handleTitle = title => {
    this.setState({ title });
  };

  render() {
    const { pdp } = this.state;
    return (
      <>
        {!!pdp && (
          <Pixels
            keywords={this.state.keywords}
            description={this.state.description}
            title={this.state.title}
            alt={this.state.alt}
            image={this.state.image}
          />
        )}
        <div>
          {!this.state.pdpLoading &&
          !this.state.espotLoading &&
          !this.state.espotTandCLoading ? (
            <>
              {this.state.pdp.data &&
              Object.keys(this.state.pdp.data).length > 0 ? (
                <PdpComponent
                  data={this.state.pdp.data}
                  matchParams={this.props.match.params}
                  espot={this.state.pdpEspot}
                  espotPromo={this.state.pdpEspotTandC}
                  historyData={this.props.history}
                  handleTitle={this.handleTitle}
                />
              ) : (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="notFound">Data Not Found</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="loadingIndicator">
                    <LoadingIndicator />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default PdpContainer;
