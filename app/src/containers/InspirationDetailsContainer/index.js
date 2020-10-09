import React, { Component } from 'react';
import '../../../public/styles/static-pages/inspirationDetails.scss'
import Lookbook from '../../components/LookbookComponent/lookbbook'
import Recommended from '../../components/InspirationComp/recommended';
import ContentEspot from '../../components/Primitives/staticContent';
import  '../../../public/styles/staticPages/staticPages.scss';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {Helmet} from "react-helmet";
import Pixels from '../../components/Primitives/pixels';

class InspirationDetails extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <>
       {/* <ContentEspot espotName={ 'GI_PIXEL_LOOKBOOK_BODY_START' } /> */}
 <div className="staticpage inspirationDetails">
            
					<Pixels espotName= {'GI_PIXEL_LOOKBOOK_META'}/>
				
            <Breadcrumb {...this.props.match.params} staticName = {'Inspiration Lookbook'}/>    
             < Lookbook/>
                <Recommended/> 
                <ContentEspot espotName={ 'GI_LOOKBOOK_3' } />
               <ContentEspot espotName={ 'GI_LOOKBOOK_4' } />
               </div>
         {/* <ContentEspot espotName={ 'GI_PIXEL_LOOKBOOK_BODY_END' } /> */}
</>
        )
    }

}






export default InspirationDetails;