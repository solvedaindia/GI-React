import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss'


import {
  kitchenBannerAPI,
  imagePrefix,
} from '../../../public/constants/constants';



export default class YourKitchenYourWay extends React.Component {
    constructor(props){
        super(props);
        
        
        this.state = {
        
        }
    }
    
    
    render() {
    return (
        <div className='yourKitchenContainer'>
        <div className="container">
          <h1 className="heading">Your Kitchen, your way</h1>
          <p className="topParagraph">Choose from a vast range of acessories. Consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim veniam, quis nostrud exercitation
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="row" >
             <div className='shutterContainer'>
            <div className="col-md-2">
              <h3 className="typesOfShut">Types of Shutters</h3>
              <ul className='listItems'>
                <li  className="uldiver"><a>Steel Shutters</a></li>
                 <li className="notSelected"><a className='anchorColor'>MDF Shutters</a></li>
                <li  className="notSelected"><a className='anchorColor'>PU Shutters</a></li>
                <li  className="notSelected"><a className='anchorColor'>Marine Ply Shutters</a></li>
        
              </ul>
            </div>
            </div>
            <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2">
                 <div className="colorsKitchenone" ></div>
                 <h4 className="namingconv">Mystic Purple</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchentwo" ></div>
                 <h4 className="namingconv">Valentia Red</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchenthree" ></div>
                 <h4 className="namingconv">Shell White</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchenfour"></div>
                 <h4 className="namingconv">Russet</h4>
              </div>     
              <div className="col-sm-2">
                 <div className="colorsKitchenfive"></div>
                 <h4 className="namingconv">Plain Orange</h4>
              </div>
              </div>
              
            
        
          </div>
          </div>
          <div className="row" >
            <div className="col-md-2">
             
            </div>
            <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2">
                 <div className="colorsKitchenone" ></div>
                 <h4 className="namingconv">Mystic Purple</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchentwo" ></div>
                 <h4 className="namingconv">Valentia Red</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchenthree" ></div>
                 <h4 className="namingconv">Shell White</h4>
              </div>
              <div className="col-sm-2">
                 <div className="colorsKitchenfour"></div>
                 <h4 className="namingconv">Russet</h4>
              </div>     
              <div className="col-sm-2">
                 <div className="colorsKitchenfive"></div>
                 <h4 className="namingconv">Plain Orange</h4>
              </div>
              </div>
              
            
        
          </div>
          </div>
          <div className="row" >
            <div className="col-md-2">
             
            </div>
            <div className="col-md-10">
              <div className="row colFive">
              <h4 className='imageTitle'>Fantasia Range</h4>

              <div className="col-sm-2">
              <img className="imageBackGround" src={`${imagePrefix}/staticImages/kitchens/fantone.png`} alt="" />
                 <h4 className="namingconv">Mystic Purple</h4>
              </div>
              <div className="col-sm-2">
              <img className="imageBackGround" src={`${imagePrefix}/staticImages/kitchens/fanttwo.png`} alt="" />
                 <h4 className="namingconv">Valentia Red</h4>
              </div>
             
              </div>
              
            
        
          </div>
          </div>
          <div className="row" >
             <div className='shutterContainer'>
            <div className="col-md-2">
              <h3 className="typesOfShut">Accessories</h3>
              <ul className='listItems'>
                <li  className="uldiver"><a>Cabinets</a></li>
                 <li className="notSelected"><a className='anchorColor'>DADO Accessories</a></li>
                <li  className="notSelected"><a className='anchorColor'>PU Shutters</a></li>
                <li  className="notSelected"><a className='anchorColor'>Lights, Handles &
Hardware</a></li>
        
              </ul>
            </div>
            </div>
            <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2 ">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Cooking Kit</h4>

          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dark Wood</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dish Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Multi-Utility Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Bottle Pull Out Kit</h4>
          </div>
              </div>
            
        
          </div>
         
          <div className='row'> 
          <div className='col-md-2'></div>
          <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2 ">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Cooking Kit</h4>

          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dark Wood</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dish Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Multi-Utility Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Bottle Pull Out Kit</h4>
          </div>
              </div>
              </div>
        
          </div>
          <div className='row'> 
          <div className='col-md-2'></div>
          <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2 ">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Cooking Kit</h4>

          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dark Wood</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dish Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Multi-Utility Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Bottle Pull Out Kit</h4>
          </div>
              </div>
              </div>
        
          </div>
          <div className='row'> 
          <div className='col-md-2'></div>
          <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2 ">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Cooking Kit</h4>

          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dark Wood</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dish Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Multi-Utility Kit</h4>
          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Bottle Pull Out Kit</h4>
          </div>
              </div>
              </div>
        
          </div>
          <div className='row'> 
          <div className='col-md-2'></div>
          <div className="col-md-10">
              <div className="row colFive">
              <div className="col-sm-2 ">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Cooking Kit</h4>

          </div>
          <div className="col-sm-2">
            <img className="colorsKitchenone" src={`${imagePrefix}/staticImages/kitchens/cabone.jpg`} alt="" />
            <h4 className="namingconv">Dark Wood</h4>
          </div>
         
              </div>
              </div>
        
          </div>
          
          </div>
         
         
            
        
          </div>
          
         </div>
    )
}
}