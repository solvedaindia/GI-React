import React, { Component } from 'react';
import  '../../../public/styles/Inspiration/inspiration.scss'
import Lookbook from '../../components/LookbookComponent/lookbbook'

class InspirationDetails extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="Inspiration-details">
               <h1 className="Summer-Spark-Text">Summer Spark</h1>
               <p className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam urna, ullamcorper sit amet arcu sed, viverra<br/> malesuada mi. Nam rutrum vulputate lectus vel tincidunt.  Curabitur turpis augue, accumsan ut turpis at, finibus<br/> vulputate augue. Suspendisse ultrices eget ipsum quis dapibus. Aliquam turpis erat, viverra quis est sed.</p>
                < Lookbook/>
                </div>

        )
    }

}






export default InspirationDetails;