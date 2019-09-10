import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import { formatPrice } from '../../utils/utilityManager';
import {
  plpSubCatAPI,
  imagePrefix
} from '../../../public/constants/constants';
import '../../../public/styles/subCat/subCat.scss';
import {STARTING_FROM, PRODUCTS } from '../../constants/app/clpConstants';

export class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCatData: null,
      isLoading: false,
      error: null
    };
  }

  getSubCategories(id) {
    apiManager
      .get(plpSubCatAPI + id)
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

  componentWillReceiveProps(nextProps) {
    if(this.props.id !== nextProps.id){
      console.log('Next Props ID', nextProps);
      this.getSubCategories(nextProps.id);
    }
  }
  componentDidMount() {
    this.getSubCategories(this.props.id);
  }

  render() {
    const { subCatData } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      
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
                  </a>
                  <figcaption className="catDetails">
                    <h2 className="catItem">{subCatListData.categoryName}</h2>
                    <span className="itemCount">
                      {subCatListData.productCount} {PRODUCTS}
                  </span>
                    <p className="starting">
                      {STARTING_FROM}
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
