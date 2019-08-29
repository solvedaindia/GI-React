import React, { Component } from 'react';
import '../../../public/styles/static-pages/inspirationDetails.scss'
import Lookbook from '../../components/LookbookComponent/lookbbook'
import Recommended from '../../components/InspirationComp/recommended';
import ContentEspot from '../../components/Primitives/staticContent';

import LookbooksocialShare from '../../components/InspirationComp/lookbooksocialShare';

class InspirationDetails extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="staticpages inspirationDetails">
             < Lookbook/>
                <Recommended/>
                <ContentEspot espotName={ 'GI_LOOKBOOK_3' } />
               <ContentEspot espotName={ 'GI_LOOKBOOK_4' } />
               </div>

        )
    }

}






export default InspirationDetails;