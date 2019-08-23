import React, { Component } from 'react'
import '../../../public/styles/static-pages/chefkitchen.scss'

import DreamKitchens from '../../components/KitchensComp/DreamKitchens'
import InsCrousel from '../../components/Primitives/crousel'
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import WardrobesHAll from '../../components/wardrobesComponent/wardrobeHall.js';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import KitchenBanner from '../../components/KitchensComp/kitchenBanner';
import WardrobesTypes from '../../components/wardrobesComponent/wadrobesTypes';
import WhatGoesward from '../../components/wardrobesComponent/whatgoesWard.js'
import ConsultationForm from '../../components/Primitives/ConsultForm'


export default class ChefKitchenContainer extends React.Component {
constructor(props){
super(props);


this.state = {
imgList: [scatchImg1,scatchImg2,scatchImg3],
index: 0
}
}

onHandleClickFirst= () => {
if (this.state.index === 0 || this.state.index === 2){
this.setState({index:1})
}
};
onHandleClickSecond(){
if (this.state.index === 0 || this.state.index === 1){
this.setState({index:2})
}
}
onHandleClickThird(){
if (this.state.index === 1 || this.state.index === 2){
this.setState({index:0})
}
}
componentDidMount(){
  
}

render(){
return (
<div className="chefKitchen">
  <div className="container">
    <KitchenBanner />
  
  </div>
  <div className="container">
    <h1 className="Benefits-of-Modular">Benefits of Steel Kitchens</h1>
    <div className="container">
      <div className="row">
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>
        </div>
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>

        </div>
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>

        </div>
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>

        </div>
      </div>
      <div className="row">
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>
        </div>
        <div className="col-sm-2">
          <img className="Combined-Shape" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
          <h3 className="titlesss">modular</h3>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <div className="crouselBAckgrounding"><br />
    <h1 className="Types-of-Modular-War">Configuration</h1>
    <WardrobesTypes />
  </div><br /><br />

<div className="container">
  <h1 className="Types-of-Modular-Ward">Your Kitchen, your way</h1>
  <p className="This-project-requirement">Choose from a vast range of acessories. Consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim veniam, quis nostrud exercitation
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <div className="row">
    <div className="col-md-2">
      <h3 className="faqhead">Types of Shutters</h3>
      <ul>
        <li><a className="uldiver">Steel Shutters</a></li>
         <li className="uldiver"><a className="uldiver">MDF Shutters</a></li>
        <li><a className="uldiver">PU Shutters</a></li>
        <li ><a className="uldiver">Marine Ply Shutters</a></li>

      </ul>
    </div>
    <div className="col-md-10">
      <div className="row colFive">
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#664857'  }}></div>
         <h4 className="namingconv">Mystic Purple</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#a92631'  }}></div>
         <h4 className="namingconv">Valentia Red</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#f8faf0'  }}></div>
         <h4 className="namingconv">Shell White</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#592a2a'  }}></div>
         <h4 className="namingconv">Russet</h4>
      </div>     
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#ef7f2e'  }}></div>
         <h4 className="namingconv">Plain Orange</h4>
      </div>
      <div className="col-md-10">
      <div className="row colFive">
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#664857'  }}></div>
         <h4 className="namingconv">Mystic Purple</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#a92631'  }}></div>
         <h4 className="namingconv">Valentia Red</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#f8faf0'  }}></div>
         <h4 className="namingconv">Shell White</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#592a2a'  }}></div>
         <h4 className="namingconv">Russet</h4>
      </div>     
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#ef7f2e'  }}></div>
         <h4 className="namingconv">Plain Orange</h4>
      </div>
  
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="container" >
  <div className="row">
    <div className="col-md-2">
    </div>
    <div className="col-md-10">
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#e77467'  }}></div>
         <h4 className="namingconv">Adventure Range</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#fbef59'  }}></div>
         <h4 className="namingconv">Lemon Yellow</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#b7d76c'  }}></div>
         <h4 className="namingconv">Tender Leaf</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#b7d76c'  }}></div>
         <h4 className="namingconv">Midnite Blue</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#a8a8a7'  }}></div>
         <h4 className="namingconv">Silicon Silver</h4>
      </div>

      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#a92631'  }}></div>
         <h4 className="namingconv">Red Floral</h4>
      </div>
      <div className="col-sm-2">
         <div className="colorsKitchen" style={{background:'#a92631'  }}></div>
         <h4 className="namingconv">Dark Wood</h4>
      </div>

  
    </div>
   
  </div>
  </div>
    

   
  
 </div>

<div className="container">
  <div className="row">
    <div className="col-md-2">
      <h3 className="faqhead">Accessories</h3>
      <ul>
        <li><a className="uldiver">Cabinets</a></li>
         <li className="uldiver"><a className="uldiver">DADO Accessories</a></li>
        <li><a className="uldiver">Lights, Handles & Hardware</a></li>
       </ul>
    </div>
    <div className="col-md-10">
    <div className="row colFive">
    <div  className="col-sm-2 colorsKitchen">
    <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
    <h4 className="namingconv" >Cooking Kit</h4>

    </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Dark Wood</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Dish Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Multi-Utility Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Bottle Pull Out Kit</h4>

      </div>
    </div>
  </div>
  </div>
 </div>
  
  <div className="row">
    <div className="col-md-2">
    </div>
    <div className="col-md-10">
      <div  className="col-sm-2 colorsKitchen" >
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>

    </div><br/>
   
  </div><br/><br/><br/>
  <div className="row">
    <div className="col-md-2">
    </div>
    <div className="col-md-10">
      <div  className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>

    </div><br/>
   
  </div><br/><br/><br/>
  <div className="row">
    <div className="col-md-2">
     
    </div>
    <div className="col-md-10">
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
      <h4 className="namingconv" >Cooking Kit</h4>

      </div>
      <div className="col-sm-2 colorsKitchen">
      <img className="colorsKitchen" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
         <h4 className="namingconv" >Cooking Kit</h4>
      </div>
      
    </div><br/>
   
  </div><br/><br/><br/>
  
  <div className="container">
    <img className="reactang" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="Snow" />
    <div className="Form-bakground">
      <h2 className="Book-a-consultation">Book a consultation</h2>
      <p4 className="Answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor. </p4>
      <br />
      <br />
      <br />
      <ConsultationForm />
    </div>
  </div>
  <div className="frequesntly">
    <h className="Frequently-Asked-Que">Frequently asked questions</h><br /><br /><br />
    <div className="panel-group" id="accordion">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
              href="#collapseTwo">What do I need to start my project?</a>
          </h4>
        </div>
        <div id="collapseTwo" className="panel-collapse collapse">
          <div className="panel-body">
            Any registed user, who presents a work, which is genuine and appealing, can post it on
            <strong>PrepBootstrap</strong>.
          </div>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
              href="#collapseThree">What warranty does Godrej Interio have for its products?</a>
          </h4>
        </div>
        <div id="collapseThree" className="panel-collapse collapse">
          <div className="panel-body">
            I want to customize one of your products, can I do that?:
            <ul>
              <li>Register an account</li>
              <li>Activate your account</li>
              <li>Go to the <strong>Themes</strong> section and upload your theme</li>
              <li>The next step is the approval step, which usually takes about 72 hours.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
              href="#collapseFive">Want to customize one of your products, can I do that?</a>
          </h4>
        </div>
        <div id="collapseFive" className="panel-collapse collapse">
          <div className="panel-body">
            Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller, regardless of any
            restrictions, such as volume, date of entry, etc.
            <br />
          </div>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
              href="#collapseSix">Are there any delivery charges or installation charges?</a>
          </h4>
          <br></br>
        </div>
        <div id="collapseSix" className="panel-collapse collapse">
          <div className="panel-body">
            There are a number of reasons why you should join us:
            <ul>
              <li>A great 70% flat rate for your items.</li>
              <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if it gets
                rejected, there is another iteration. We have aliminated this, and made the process very fast. It only
                takes up to 72 hours for a template/theme to get reviewed.</li>
              <li>We are not an exclusive marketplace. This means that you can sell your items on
                <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your earning
                potential.</li>
              <li>A great 70% flat rate for your items.</li>
              <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if it gets
                rejected, there is another iteration. We have aliminated this, and made the process very fast. It only
                takes up to 72 hours for a template/theme to get reviewed.</li>
              <li>We are not an exclusive marketplace. This means that you can sell your items on
                <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your earning
                potential.</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  </div>
  <div className="container">
    <img className="bigSofa" src='https://203.110.85.50/imagestore/B2C/56101502SD00616/56101502SD00616_01_1440x810.png' alt="rectangle" />
    <div className="text-blocks">
      <h1 className="image-gallery-Copy-3">Our store</h1>
      <h4 className="image-gallery-Copy-3 ">Experience our store facilities</h4>
      <p className="A-one-stop-shop-inte">Experience our wardrobe at <span className="spanish">Vikroli Godrej Store
          (1.6 km away)</span><br />
        You can find more stores around you.<br />
        the home you've always wanted</p> <br />
      <button className="seeMored">Find More Stores</button>
    </div>

  </div>
  <div className="aboutgodrej">
    <h className="About-Godrej-Interio ">Modular Wardrobes</h><br /><br />
    <p className="Godrej-Interio-is-In">Godrej Interio is India’s largest furniture brand. From
      manufacturing the humble Storwel cupboard 80 years back to being a vibrant, innovative brand with a
      diverse portfolio<br /> – it’s been a brilliant, exciting journey for us.<br />

      We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering well
      designed, fun and functional furniture solutions to you.<br />

      True to the Godrej mission to conserve the environment, we design products, set up processes and use
      raw materials that are eco-friendly to do our bit to preserve natural<br /> resources.<br />

      We offer our customers home and office furniture, along with solutions for laboratories, hospitals
      and healthcare establishments, education and training institutes, shipyards<br /> and navy,
      auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18 cities
      and through 800 dealer outlets.<br />

      Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group, one of
      India’s largest engineering and consumer product groups.</p>
    
    <button className="Read-More">Read More</button>
  </div>
</div>
)
}
}