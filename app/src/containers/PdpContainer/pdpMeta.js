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
                <meta name="twitter:title" content="Display Units and Display Cabinets - Godrej Interio" />
                <meta name="twitter:description" content=" Godrej Interio services, office furniture, modern office furniture, latest design office furniture, interior office furniture, Desking Furnitures, chairs, comfortable seating chairs, modern storage furniture, latest design workstations, lab solutions, marine solutions, Godrej Interio, lab solution products, marine solutions products, innovative home furniture, latest design furniture, living room furniture, bedroom furniture and kids room furniture, aesthetic design furniture, durable furniture" />
                <meta name="twitter:image" content="http://www.godrejinterio.com/GodrejInterio/ProductImages/Fab_Fiesta_Media_Unit_1.jpg" />
                <meta name="twitter:image:alt" content="FAB FIESTA MEDIA UNIT" />
                <meta property="og:url" content="http://www.godrejinterio.com/GodrejInterio/products.aspx?id=29&amp;menuid=310&amp;catid=41&amp;subcatid=43&amp;sec=det&amp;prodid=4305" />
                <meta property="og:type" content="Website" />
                <meta property="og:title" content="Place Page Meta Title" />
                <meta property="og:description"content="Place Meta Description" />
                <meta property="og:image" content="Add Image URL" />
                <meta name="keywords" content={!!
                    this.props.keywords.map((keywordsData)=> {
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
