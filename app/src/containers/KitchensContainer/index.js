import React, { Component } from 'react'



export default class Kitchens extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="Kitchen-1">
               <div className="container">
        <img
                      className="Rectangle"
                      src={require('../../../public/images/kitch1.jpg')}
                      alt="rectangle"
                    />
                   <div class="text-block">
                   
                    <h4 className="header">Interio Kitchens</h4>
   <p2 className="A-one-stop-shop-inte">A one-stop-shop interior design service to help you create<br /> the home you've always wanted</p2> <br />
   <button className="butt">Book A Consultation</button>
  </div>

        </div>
        <div className="container">
        <h1 className="Types-of-Modular-Kit">Types of Modular Kitchens</h1>

        <div className="row">
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup.png')}
                      alt="rectangle"
                    />
                      <h4 className="Steel-Chef">Steel Chef</h4>
                    <p1 className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>
                   <br /><div><button className="buttonExp">Explore</button></div>
            </div>
            <div className="col-md-6">
            <img
                      className="types-kitchens"
                      src={require('../../../public/images/cup2.jpg')}
                      alt="rectangle"
                    /> <h4 className="Steel-Chef">Willow Wok</h4>
                    <p1 className="Paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.</p1>
                    <br /><div><button className="buttonExp">Explore</button></div>

                </div>
        </div>
        </div>
            </div>
        )
    }
}

