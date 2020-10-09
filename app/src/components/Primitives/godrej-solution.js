import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import { espotAPI } from '../../../public/constants/constants';
import '../../../public/styles/slider.scss';

class GodrejSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: 'GI_Homepage_Godrej_Solution',
      espotContent: null,
      error: null,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.getESpotData();
  }

  getESpotData = () => {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        const { data } = response || {};
        this.setState({
          espotContent: data && data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  };

  render() {
    const { isLoading, espotContent } = this.state;
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return !isLoading ? (
      <div className="espotContent">
        <section className="oursolutions">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="ourstoreImgbox">
                  <Slider {...sliderSettings}>
                    {espotContent &&
                      espotContent.length !== 0 &&
                      espotContent.map((slide, index) => {
                        if (slide.type === 'content') {
                          return (
                            <div
                              key={index}
                              dangerouslySetInnerHTML={{ __html: slide.content }}
                            />
                          );
                        }
                        return null;
                      })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <span>...</span>
    );
  }
}

export default GodrejSolution;
