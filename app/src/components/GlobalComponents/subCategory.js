import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import { formatPrice } from  '../../utils/utilityManager';
import {
  featuredCatAPI,
  imagePrefix,
  accessToken,
  catID,
} from '../../../public/constants/constants';
import '../../../public/styles/featuredCat/featuredCat.scss';

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
      centerPadding: '40px',
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
      <div className="featuredCat">
        <h2 className="title">In the Spotlight</h2>
        <Slider {...settings}>
          {!!subCatData &&
            subCatData.map((subCatListData, index) => {
              var routePath = `/furniture-${subCatListData.categoryName.split(' ').join('-')}/${subCatListData.uniqueID}`;
              return (
                <figure className="subCatSlider" key={`${index}-img`}>
                    <Link to={routePath}>
                    <img className="subCatImg"  alt={subCatListData.categoryName}  src={`${imagePrefix}${subCatListData.thumbnail}`} // src={subCatListData.thumbnail} alt={subCatListData.categoryName}
                    />
                    </Link>
                  <figcaption className="catDetails">
                    <h2 className="catItem">{subCatListData.categoryName}</h2>
                    <span className="itemCount">
                      {subCatListData.productCount} Products
                  </span>
                    <p className="starting">
                      Starting From
                    <span className="startPrice">
                      ₹{formatPrice(subCatListData.startPrice)}
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
