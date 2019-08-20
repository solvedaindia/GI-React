import React, { Component } from 'react';
import '../../../public/styles/static-pages/InspirationDetails.scss'
import Lookbook from '../../components/LookbookComponent/lookbbook'
import Recommended from '../../components/InspirationComp/recommended.js';

class InspirationDetails extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="inspirationDetails">
               <h1 className="title">Summer Spark</h1>
               <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna, ullamcorper sit amet arcu sed, viverra<br/> malesuada mi. Nam rutrum vulputate lectus vel tincidunt.  Curabitur turpis augue, accumsan ut turpis at, finibus<br/> vulputate augue. Suspendisse ultrices eget ipsum quis dapibus. Aliquam turpis erat, viverra quis est sed.</p>
                {/* <div className="container">
                < Lookbook/>
                <div className="text-blocker">
                    <div className="row">
                        <div className="col-md-6">
                        <img
                  className="stoolimg"
                  src="https://a.1stdibscdn.com/archivesE/upload/f_18533/1457751688542/DSC_0219_l.jpg"
                  alt="Rectangle"
                />
                        </div>
                        <div className="col-md-6"></div>
                        <h4 className="headerpart">Fantasia Slimline</h4><br/><h4 className="prices">₹23,000</h4><br/>
                <br />
                 <button className="butt">View Product</button>
                    </div>
                 </div>

               </div>
               <Recommended/> */}

                </div>

        )
    }

}






export default InspirationDetails;