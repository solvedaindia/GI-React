import React from 'react';
import { Col } from 'react-bootstrap';

class productDefAttribute extends React.Component {

    constructor() {
        super();
        this.dataClass = '';
    }

    /* show feature images */
    showFeatureImage(divId) {
        let featureImages = document.getElementsByClassName('featureImages');
        let contentElement = document.getElementById('featureImage_'+divId);
        for (let i = 0; i < featureImages.length; i++) {
            featureImages[i].classList.remove('dataNotActive');
            featureImages[i].classList.add('dataNotActive');
        }
        contentElement.classList.remove('dataNotActive');
    }

    render() {
        return(
            <div>
            {
                this.props.defAttributes.map((data, i) => {
                    return(
                       <div key={i}><b>{data.name}</b>
                            <ul>
                           {
                               data.values.map((value, index) => {
                                   let colorType;
                                   if(value.colorCode) {
                                    colorType = 'colorType';
                                   } else if(value.facetImage) {
                                        colorType = 'facetImage'; 
                                   } else {
                                        colorType = value.name; 
                                   }
 
                                   return(
                                   <li className='attributeList' key={index}>
                                   <input type='radio' name={data.name} />{colorType}
                                   </li>
                                    
                                   );
                               })
                           }
                           </ul>
                           </div>
                    )
                })
            }
            </div>
        );
    }
}

export default productDefAttribute;