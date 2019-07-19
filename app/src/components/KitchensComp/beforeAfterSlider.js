import React, { Component } from 'react'
import BeforeAfterSlider from 'react-before-after-slider'
 
class BeforeAfter extends Component {
  render () {
    const before = require('../../../public/images/sl11.png')
    const after = require('../../../public/images/whatgoes.png')
 
    return (
      <BeforeAfterSlider
        before={before}
        after={after}
        width={1140}
        height={410}
      />
    )
  }
}

export default BeforeAfter;