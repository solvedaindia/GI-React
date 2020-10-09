import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import { isMobile } from '../../utils/utilityManager';
import { espotAPI } from '../../../public/constants/constants';

class WardrobeTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_WARDROBES_TYPES',
      modularTypes: null,
      isLoading: true,
    }
  }

  getModularTypesData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        const { data } = response;
        this.setState({
          modularTypes: data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          modularTypes: null,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getModularTypesData();
  }

  render() {
    const { isLoading, modularTypes } = this.state;
    const settings = {
      dots: isMobile(),
      arrows: !isMobile(),
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: isMobile() ? 1 : 2,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };
    if (!isLoading && modularTypes) {
      return (
        <div className="container">
          <div className="typesofkitchen">
            <h1 className="typesOfModularKit">{modularTypes.title}</h1>
            <div className="row">
              {modularTypes.variations &&
                modularTypes.variations.length > 0 && (
                <Slider {...settings}>
                  {modularTypes.variations.map(type => (
                    <div className="col-sm-6">
                      <div className="steelKitchenfmodal">
                        <a href={type.onClickUrl} style={{ color: 'black' }}>
                          <img
                            className="img"
                            src={type.imageSrc}
                            alt={type.imageAlt}
                          />
                        </a>
                        <h4 className="heading">
                          <a href={type.onClickUrl} style={{ color: 'black' }}>
                            {type.name}
                          </a>
                        </h4>
                        <p className="subText">{type.description}</p>
                        <a href={type.onClickUrl} className="link-btn">
                          <button className="buttonExp">
                            {type.buttonText}
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default WardrobeTypes;
