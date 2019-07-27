
import React from 'react';
import FullBanner from '../../components/Primitives/slider';
import LivingTheme from '../../components/ClpComponent/subComponents/livingInspiration';
import SubCategory from '../../components/GlobalComponents/subCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import ReadMore from '../../components/GlobalComponents/readMore';
import  '../../../public/styles/static-pages/inspiration.scss'
import InsCrousel from '../../components/Primitives/crousel'
import InspirationBanner from '../../components/InspirationComp/inspirationBanner'
import SummerData from '../../components/InspirationComp/InspEspot';
import { Link } from 'react-router-dom'

export class Inspiration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		clpData: {},
		isLoading: false,
		error: null,
    };
  }

  render() {
    return (
      <div className="Inspiration">
        <div className="inpspirationBanner">
          <InspirationBanner />
          <div className="container1">
            <div className="inspBannertext">
              <h2 className="heading"><strong>Lookbook </strong>of the<br /> year 2018</h2>
              <button className="btn-book">View</button>
            </div>
          </div>
        </div>
        <div className="lookcrouse">
          <InsCrousel />
        </div>
<SummerData/>
          <div className="uuscontainer">
          <div className="container">
            <img className="bigSofa" src={require('../../../public/images/inspi9.jpg')}
              alt="rectangle" />
            <div className="text-block">
              <img className="UUs-with-tagline-1" src={require('../../../public/images/u-us-with-tagline-1.jpg')}
                alt="rectangle" />
              <h4 className="Image-gallery-Copy-3 ">Godrej Interior Solutions</h4>
              <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br /> the
                home you've always wanted</p2> <br />
              <button className="seeMore">Know More</button>
            </div>
            </div>
          </div>
        
       
      </div>
    );
  }
}

export default Inspiration;;
