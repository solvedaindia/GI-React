import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss'


import {
  imagePrefix,
} from '../../../public/constants/constants';



export default class SteelKitchenBenefits extends React.Component {
    constructor(props){
        super(props);
        
        
        this.state = {
        
        }
    }
    
    
    render() {
    return (
        <div class='Benefitedsteel'>
                <div class='container'>
                  <h1 class='heading'>Benefits of Steel Kitchens</h1>
                  <div class='row' className='topSpacing'>
                    <div class='col-md-12'>
                      <div class='steelBefits clearfix'>
                        <div class='col-sm-3'>
                          <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchone.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>Resistant to oil and water</h3>
                        </div>
                        <div class='col-sm-3'>
                          <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchtwo.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>Suitable for Indian cooking conditions</h3>
                        </div>
                        <div class='col-sm-3'>
                          <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchthree.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>Termite-proof</h3>
                        </div>
                        <div class='col-sm-3'>
                          <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchfour.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>Sturdy, functional and long-lasting</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-md-12'>
                      <div class='WardrowsBefits column2 clearfix'>
                        <div class='col-sm-6'> <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchfive.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>Perfect balance between aesthetics and functionality</h3>
                        </div>
                        <div class='col-sm-6'> <img class='Combined-Shape'
                            src={`${imagePrefix}/staticImages/kitchens/steelscratchsix.svg`}
                            alt='rectangle' />
                          <h3 class='steelTitle'>High precision manufacturing for a clean, top quality finish</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}
}