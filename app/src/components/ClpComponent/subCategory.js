import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import {
  plpSubCatAPI,
  imagePrefix
} from '../../../public/constants/constants';
import '../../../public/styles/subCat/subCat.scss';

let categoryId;
export class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatData: null,
      isLoading: false,
      error: null
    };
  }

  getSubCategories() {
    apiManager
      .get(plpSubCatAPI + categoryId)
      .then(response => {
        const { data } = response || {};
        this.setState({
          subCatData: data && data.data,
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
    const path = String(window.location.pathname);
    const idStr = path.split('/')[2];
    if (idStr != undefined && idStr !== categoryId) {
      categoryId = idStr;
    }
    this.getSubCategories();
  }

  render() {
    const { subCatData } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
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
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };
    return (
      <div className="subCat">
        <h1 className="title">Featured Category</h1>
        <Slider {...settings}>
          {!!subCatData &&
            subCatData.map((subCatListData, index) => {
              var routePath = `/furniture-${subCatListData.categoryName.split(' ').join('-')}/${subCatListData.uniqueID}`;
              return (
                <figure className="subCatSlider">
                  <a href={subCatListData.onClickUrl} key={index}>
                    <Link to={routePath}>
                    <img className="subCatImg" src={`${imagePrefix}${subCatListData.thumbnail}`} // src={subCatListData.thumbnail} alt={subCatListData.categoryName}
                    />
                    </Link>
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
              )
            })}
        </Slider>
      </div>
    );
  }
}

export default SubCategory;
