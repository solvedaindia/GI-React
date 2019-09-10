import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import SubCatItem from './subCatItem';
import '../../../../public/styles/plpContainer/plpContainer.scss';

const prevArrowImg = (
  <img src={require('../../SVGs/carousel__arrowLeft.svg')} />
);
const nextArrowImg = (
  <img src={require('../../SVGs/carousel__arrowRight.svg')} />
);
class SubCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatItem: null,
    };

    this.settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: true,
            prevArrow: false,
            nextArrow: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false,
            nextArrow: false,
          },
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchSubCategoryData(nextProps.subCategoryData);
  }

  componentDidMount() {
    this.fetchSubCategoryData(this.props.subCategoryData);
  }

  fetchSubCategoryData(subCatData) {
    const data = subCatData;
    if (data) {
      const itemsArr = data.map((item, index) => (
        <SubCatItem key={index} itemData={item} />
      ));
      this.setState({
        subCatItem: itemsArr,
      });
    }
  }

  render() {
    console.log('dkdkddk -- ', this.state.subCatItem);
    return (
      <section className="tablecarousel">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="headingText">
              </div>
            </div>
          </div>
          <Slider {...this.settings}>{this.state.subCatItem}</Slider>
        </div>
      </section>
    );
  }
}

export default withRouter(SubCategories);
