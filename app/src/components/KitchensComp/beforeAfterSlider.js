import React, { Component } from 'react'
import ReactCompareImage from 'react-compare-image'; 
class BeforeAfter extends Component {
  render () {
    const before = 'https://chillikitchens.co.uk/wp-content/uploads/2018/01/chilli-kitchens-hero-banner.jpg'
    const after = 'http://focuskitchensandbathrooms.com.au/wp-content/uploads/2016/05/promotions-banner.jpg'
 
    return (
      <>

<ReactCompareImage leftImage={before} rightImage={after} />
      </>
     
    )
  }
}

export default BeforeAfter;