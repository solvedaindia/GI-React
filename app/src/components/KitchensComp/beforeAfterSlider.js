import React, { Component } from 'react'
 
import BeforeAfterSlider from 'react-before-after-slider'
 
class BeforeAfter extends Component {
  render () {
    const before = 'https://www.janelockhart.com/portfolio/images/001_J_L_Suz_Kitchen.jpg'
    const after = 'https://webassets.inman.com/wp-content/uploads/2018/01/Untitled-design-56-1984x880.png'
 
    return (
      <BeforeAfterSlider
        before={before}
        after={after}
        width={1440}
        height={600}
      />
    )
  }
}

export default BeforeAfter;