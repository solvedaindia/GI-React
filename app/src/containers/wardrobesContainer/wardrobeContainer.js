/**
 *
 * KitchenContainer
 *
 */

import React from 'react';
import  '../../../public/styles/static-pages/kitchen.scss';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import { imagePrefix } from '../../../public/constants/constants';
import ConsultationForm from '../../components/Primitives/ConsultForm'
import KitchenStore from '../../components/KitchensComp/kitchenStore';
import WardrobeBenefits from '../../components/wardrobesComponent/wardrobesBenefits';
import WHallOfFame from '../../components/wardrobesComponent/wardrobeHall';
import AboutWardrobe from '../../components/wardrobesComponent/aboutWardrobe';

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
            <WHallOfFame />
			<div className="formContainer">
				<img className="bgImg" src={`${imagePrefix}/staticImages/kitchens/whatgoesimg.png`} alt="Snow" />
				<div id='consultForm' className='formDetails'>
					<ConsultationForm />
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