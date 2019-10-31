import React from 'react';
import {Helmet} from "react-helmet";
import { imagePrefix } from '../../../public/constants/constants';

class PDPMeta extends React.Component {
    constructor() {
      super();
    }
    render () {
        
        const fullImagePath = `${imagePrefix}${this.props.image}`;
        console.log('PDP meta --- ',fullImagePath);
        return (
            <Helmet>
			
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@godrejinterio" />
                <meta name="twitter:title" content={this.props.title} />
                <meta name="twitter:description" content={this.props.description}/>
                <meta name="twitter:image" content={fullImagePath} />
                <meta name="twitter:image:alt" content={this.props.alt} />
	<meta property="og:url" content={window.location.href}/>
                <meta property="og:type" content="PDP" />
                <meta property="og:title" content={this.props.title} />
                <meta property="og:description"content={this.props.description} />
                <meta property="og:image" content={fullImagePath} />
                
                <title>{this.props.title}</title>
                <meta property="description" content={this.props.description} />
                <meta name="keywords" content={
                    !!this.props.keywords && this.props.keywords.map((keywordsData)=> {
                        return (
                            keywordsData
                        )
                    })
                }>
                </meta>
            </Helmet>
        )
    }
}

export default PDPMeta;
