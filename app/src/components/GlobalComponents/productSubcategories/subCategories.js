import React from 'react';
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
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      prevArrow: prevArrowImg,
      nextArrow: nextArrowImg,
      // prevArrow,
      // nextArrow,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchSubCategoryData(nextProps.subCategoryData);
  }

  componentDidMount() {
    this.fetchSubCategoryData(this.props.subCategoryData);
  }

  fetchSubCategoryData(subCatData) {
    const data = subCatData
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
    
    return (
      <section className="tablecarousel">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="headingText">
                {/* <h3 className="heading">Table</h3> */}
                {/* <p className="total-products">(38 Product)</p> */}
              </div>
            </div>
          </div>
          <Slider {...this.settings}>{this.state.subCatItem}</Slider>
        </div>
      </section>
    );
  }
}

export default SubCategories;
