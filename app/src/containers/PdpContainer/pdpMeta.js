import React from 'react';
import {Helmet} from "react-helmet";

class PDPMeta extends React.Component {
    constructor() {
      super();
    }
    render () {
        return (
            <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@godrejinterio" />
                <meta name="twitter:title" content={this.props.title} />
                <meta name="twitter:description" content={this.props.description}/>
                <meta name="twitter:image" content="http://www.godrejinterio.com/GodrejInterio/ProductImages/Fab_Fiesta_Media_Unit_1.jpg" />
                <meta name="twitter:image:alt" content={this.props.alt} />
                <meta property="og:url" content="http://www.godrejinterio.com/GodrejInterio/products.aspx?id=29&amp;menuid=310&amp;catid=41&amp;subcatid=43&amp;sec=det&amp;prodid=4305" />
                <meta property="og:type" content="Website" />
                <meta property="og:title" content={this.props.title} />
                <meta property="og:description"content={this.props.description} />
                <meta property="og:image" content="http://www.godrejinterio.com/GodrejInterio/ProductImages/Fab_Fiesta_Media_Unit_1.jpg" />
                
                <title>{this.props.title}</title>
                
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
