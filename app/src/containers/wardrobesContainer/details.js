import React, { Component } from 'react';
import { Row, Grid } from 'react-bootstrap';
import '../../../public/styles/staticPages/staticPages.scss';
import '../../../public/styles/static-pages/wardrobes.scss';
import '../../../public/styles/pdpComponent/pdpComponent.scss';
import ConsultationForm from '../../components/Primitives/ConsultForm';
import ContentEspot from '../../components/Primitives/staticContent';
import ModularComponent from '../../components/wardrobesComponent/modular';
import MakeSpaceComponent from '../../components/wardrobesComponent/makeSpace';
import ProductFeatures from '../../components/PdpComponent/productFeatures';
import MobileProductFeatures from '../../components/PdpComponent/mobileComponents/productFeaturesModular';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Pixels from '../../components/Primitives/pixels';
import apiManager from '../../utils/apiManager';
import { isMobile } from '../../utils/utilityManager';
import { espotAPI } from '../../../public/constants/constants';
import {
  BOOK_CONSULTATION,
  WARDROBE_CONSULT,
} from '../../constants/app/primitivesConstants';

class ModularWardrobeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.identifier,
      modularDetails: null,
      makeSpaceData: null,
      productFeatureData: null,
      isLoading: true,
    };
  }

  fetchModularDetails = () => {
    const espotName = `GI_MODULAR_DETAILS_${this.state.identifier
      .trim()
      .toUpperCase()}`;
    apiManager
      .get(espotAPI + espotName)
      .then(response => {
        const { data } = response.data;
        this.setState({
          modularDetails: data.content,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          modularDetails: null,
          isLoading: false,
        });
      });
  };

  fetchMakeSpaceESpot = () => {
    const espotName = `GI_MAKE_SPACE_${this.state.identifier
      .trim()
      .toUpperCase()}`;
    apiManager
      .get(espotAPI + espotName)
      .then(response => {
        const { data } = response.data;
        this.setState({
          makeSpaceData: data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          makeSpaceData: null,
          isLoading: false,
        });
      });
  };

  fetchProductFeaturesESpot = () => {
    const espotName = `GI_PDP_FEATURES_${this.state.identifier
      .trim()
      .toUpperCase()}`;
    apiManager
      .get(espotAPI + espotName)
      .then(response => {
        const { data } = response.data;
        this.setState({
          productFeatureData: data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          productFeatureData: null,
          isLoading: false,
        });
      });
  };

  componentDidMount() {
    if (this.state.identifier !== null || this.state.identifier !== '') {
      this.fetchModularDetails();
      this.fetchMakeSpaceESpot();
      this.fetchProductFeaturesESpot();
    }
  }

  render() {
    const {
      identifier,
      isLoading,
      productFeatureData,
      makeSpaceData,
      modularDetails,
    } = this.state;
    return (
      <div className="mainContainer">
        <Pixels
          espotName={`GI_PIXEL_WRDRBS_DTLS_META_${this.state.identifier
            .trim()
            .toUpperCase()}`}
        />
        {modularDetails && modularDetails.name ? (
          <Breadcrumb staticName={modularDetails.name} />
        ) : null}
        {identifier && identifier !== '' && !isLoading ? (
          <section className={`staticpage modular-wardrobe ${identifier}`}>
            <ModularComponent modularDetails={modularDetails} />
            {makeSpaceData && (
              <MakeSpaceComponent makeSpaceContent={makeSpaceData} />
            )}
            {productFeatureData && (
              <div className="galleryArea">
                <Grid>
                  <Row>
                    {!isMobile() ? (
                      <ProductFeatures
                        productFeatureData={productFeatureData}
                      />
                    ) : (
                      <MobileProductFeatures
                        productFeatureData={productFeatureData}
                      />
                    )}
                  </Row>
                </Grid>
              </div>
            )}
            <div className="formContainer">
              <ContentEspot espotName="GI_WARDROBES_FORMBACKGROUND_IMG" />
              <div id="consultForm" className="formDetails">
                <h2 className="title">{BOOK_CONSULTATION}</h2>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: WARDROBE_CONSULT }}
                />
                <ConsultationForm sourcePage="wardrobes" />
              </div>
            </div>
            <ContentEspot espotName="GI_Homepage_Our_Promises" />
          </section>
        ) : null}
      </div>
    );
  }
}

export default ModularWardrobeDetails;
