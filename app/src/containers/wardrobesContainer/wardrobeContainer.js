/**
 *
 * WardrobesContainer
 *
 */

import React from 'react';
import  '../../../public/styles/static-pages/warobes.scss';

import  '../../../public/styles/static-pages/kitchen.scss';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import { imagePrefix } from '../../../public/constants/constants';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import WardrobeBenefits from '../../components/wardrobesComponent/wardrobesBenefits';
import WHallOfFame from '../../components/wardrobesComponent/wardrobeHall';
import AboutWardrobe from '../../components/wardrobesComponent/aboutWardrobe';
import WhatGoesward  from '../../components/wardrobesComponent/whatgoesWard';
import {BOOK_CONSULTATION,KITCHEN_CONSULT,WARDROBE_CONSULT} from '../../constants/app/primitivesConstants';

export class WardrobeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
        <section className="kitchenContainer">
            <WardrobeBanner />
            <WardrobeBenefits />
			<div className='whatGoesContainer'>
                <div className="container">
                  <div className="row">
                    <h1 className="What-goes-into-a-Mod ">What goes into a Modular wardrobe</h1>
                    <p className="whatgoessubhead">Choose from a vast range of acessories. Consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim
                      veniam,
                      quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div className="col-md-6">
                      <h1 className="AccessoriesText">Accessories</h1>
                      <p className="whatGoesPara">Choose from a vast range of acessories. Consectetur
                        adipisicing elit,<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliquat<br />
                        enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor<br /> sit amet, consectetur
                        adipisicing elit.<br /> </p>
                      <ul className="moved">
                        <li> <a className="Materials-and-Finish">Materials and Finishes</a>
                        </li>
                        <li> <a className="Materials-and-Finish">Element</a>
                        </li>
                        <li> <a className="Materials-and-Finish">Add-ones</a>
                        </li>

                      </ul>
                    </div>
                    <div className="col-md-6">
                      <WhatGoesward />

                    </div>
                  </div>
                </div>
              </div>
            <WHallOfFame />
			<div className="formContainer">
				<div className='containerSetForm'>
				<img className="bgImg" src={`${imagePrefix}/staticImages/kitchens/whatgoesimg.png`} alt="Snow" />
				 <div id='consultForm' className="formDetails">
					<h2 className="title">{BOOK_CONSULTATION}</h2>
					<p className="desc">{WARDROBE_CONSULT} </p>
					<ConsultationForm />
				  </div>
				</div>
            </div>
            <div className="faqContainer">
              <h1 className="title">Frequently asked questions</h1>
                <div className="container">
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
							Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller,
							regardless
							of any restrictions, such as volume, date of entry, etc.
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
						</div>
						<div id="collapseSix" className="panel-collapse collapse">
							<div className="panel-body">
							There are a number of reasons why you should join us:
							<ul>
								<li>A great 70% flat rate for your items.</li>
								<li>Fast response/approval times. Many sites take weeks to process a theme or template. And
								if
								it gets rejected, there is another iteration. We have aliminated this, and made the
								process
								very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
								<li>We are not an exclusive marketplace. This means that you can sell your items on
								<strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase
								your
								earning potential.</li>
								<li>A great 70% flat rate for your items.</li>
								<li>Fast response/approval times. Many sites take weeks to process a theme or template. And
								if
								it gets rejected, there is another iteration. We have aliminated this, and made the
								process
								very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
								<li>We are not an exclusive marketplace. This means that you can sell your items on
								<strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase
								your
								earning potential.</li>
							</ul>
							</div>
						</div>
                    </div>
                  </div>
                </div>
            </div>
            <KitchenStore />
			<AboutWardrobe />
        </section>
    );
  }
}

export default WardrobeContainer;
