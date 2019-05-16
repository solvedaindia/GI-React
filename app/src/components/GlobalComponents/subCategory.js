import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import {
  featuredCatAPI,
  storeId,
  accessToken,
  catID,
} from '../../../public/constants/constants';
import '../../../public/styles/subCat/subCat.scss';

export class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatData: null,
      isLoading: false,
      error: null,
    };
  }

  getSubCategories() {
    apiManager
      .get(featuredCatAPI)
      .then(response => {
        this.setState({
          subCatData: response.data.data,
          isLoading: false,
        });
        console.log('Featured Category Data', response.data.data);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getSubCategories();
  }

  render() {
    const { subCatData } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
    };
    return (
      <div className="subCat">
        <h1 className="title">Featured Category</h1>
        <Slider {...settings}>
          {!!subCatData &&
            subCatData.map((subCatListData, index) => (
              <figure className="subCatSlider">
                <a href={subCatListData.onClickUrl} key={index}>
                  <img
                    className="subCatImg"
                    src="https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/product-2.png"
                    alt={subCatListData.categoryName}
                  />
                  {/* <img src='https://192.168.0.36:8443/wcsstore/SolvedaCommerceCatalogAssetStore//images/catalog/apparel/women/wcl000_dresses/200x310/wcl000_0028_a_red.jpg' /> */}
                </a>
                <figcaption className="catDetails">
                  <span className="catItem">{subCatListData.categoryName}</span>
                  <span className="itemCount">
                    {subCatListData.productCount} Products
                  </span>
                  <p className="starting">
                    Starting From
                    <span className="startPrice">
                      {subCatListData.startPrice}
                    </span>
                  </p>
                </figcaption>
              </figure>
            ))}
        </Slider>
      </div>
    );
  }
}

export default SubCategory;
