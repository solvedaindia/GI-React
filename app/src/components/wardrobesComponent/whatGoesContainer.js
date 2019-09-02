import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/warobes.scss';
import WhatGoesward  from '../../components/wardrobesComponent/whatgoesWard';



class WhatGoesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     

    };
  }

  render() {
   
    return (
        <div className='whatGoesContainer'>
          <div className="container">
            <div className="row">
              <h1 className="What-goes-into-a-Mod ">What goes into a Modular wardrobe</h1>
              <p className="whatgoessubhead">Choose from a vast range of acessories. Consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim
                veniam,
                quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <div className="col-md-6">

                <ul className="moved">
                  <div className='faqContainer'>
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4>
                            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                              href="#collapseTwo">Accessories</a>
                          </h4>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse">
                          <div className="panel-body">
                            Choose from a vast range of acessories. Consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliquat
                            enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit.
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4>
                            <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                              href="#collapseThree">Materials and Finishes</a>
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
                            <a className="" data-toggle="collapse" data-parent="#accordion"
                              href="#collapseFive">Elements</a>
                          </h4>
                        </div>
                        <div id="collapseFive" className="panel-collapse collapse">
                          <div className="panel-body">
                            Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller,
                            regardless
                            of any restrictions, such as volume, date of entry, etc.
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </ul>
              </div>
              <WhatGoesward />

            </div>
          </div>
        </div>
    );
  }
}

export default WhatGoesContainer;
