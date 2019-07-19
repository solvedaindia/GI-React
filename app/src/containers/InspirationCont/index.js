
import React from 'react';
import FullBanner from '../../components/Primitives/slider';
import LivingTheme from '../../components/ClpComponent/subComponents/livingInspiration';
import SubCategory from '../../components/GlobalComponents/subCategory';
import BestSeller from '../../components/BestSelling/bestSelling';
import ReadMore from '../../components/GlobalComponents/readMore';
import  '../../../public/styles/Inspiration/inspiration.scss'
import InsCrousel from '../../components/Primitives/crousel'
import InspirationBanner from '../../components/InspirationComp/inspirationBanner'


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
        <div className="summersparkcontainer">
          <div className="row">
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm1.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm2.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm1.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm2.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm1.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm2.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm1.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
            <div className="col-md-6">
              <img  className="RectImg" src={require('../../../public/images/sm2.jpg')} alt="rectangle" />
              <h4 className="Summer-Spark">Summer Spark</h4>
              <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna,
                ullamcorper sit amet arcu sed, viverra malesuada mi. Nam rutrum vulputate lectus vel tincidunt. </p>
            </div>
          </div>
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
      </div>
    );
  }
}

export default Inspiration;;
