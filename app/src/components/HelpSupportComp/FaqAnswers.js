import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
import  '../../../public/styles/static-pages/HelpSupport.scss'



class FaqAnswers extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
           
        }
    }

render() {
    return (
        <>
          <div className="panel-group" id="accordion">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseOne">How do I become a registered member of Godrej Interio ?</a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse collapse">
                <div className="panel-body">
                Click on the 'Register' link on the top right-hand side of every page on Godrej Interio . This will open a window where you need to: fill in your basic details, choose a password for your account, and click on the 'Sign Up' button to complete your registration!
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseTen">What are the benefits to registering with Godrej Interio ?</a>
                </h4>
              </div>
              <div id="collapseTen" className="panel-collapse collapse">
                <div className="panel-body">
                Discount coupns details if any
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseTen">How do I change my account password?</a>
                </h4>
              </div>
              <div id="collapseTen" className="panel-collapse collapse">
                <div className="panel-body">
                To change your password, login and choose the My Profile options under your Account name. Here you can change your password by entering your current password and the new password.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseEleven">My password is not working, how do I Sign- In?</a>
                </h4>
              </div>
              <div id="collapseEleven" className="panel-collapse collapse">
                <div className="panel-body">
                If you are not able to login using your password, try resetting your password.
                </div>
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseTwo">I have forgotten my password. How do I login to my account?</a>
                </h4>
              </div>
              <div id="collapseTwo" className="panel-collapse collapse">
                <div className="panel-body">
                Click on 'Login' link on the top right hand side of the page. This will open a window where you will see a 'Forgot Password?' link. Provide your registered email address and we will email you instructions for getting a new password.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseThree">I am not able to find the Godrej Interio newsletter or emails in my inbox.</a>
                </h4>
              </div>
              <div id="collapseThree" className="panel-collapse collapse">
                <div className="panel-body">
                Sometimes, our newsletter may go in the junk or spam box of your email. If you find the newsletters from Godrej Interio  in junk/spam box, please mark them as 'not spam' and add the sender to your contact. If you are using Gmail, our emails may also be under the Promotions or Updates tab. In such a case, just drag the email to the Primary tab.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseFive">How do I track the progress of an order?
                    </a>
                </h4>
              </div>
              <div id="collapseFive" className="panel-collapse collapse">
                <div className="panel-body">
                Once your order has been shipped, you will receive an email and an SMS notification with details of the order. You can track the shipment by clicking on the link provided in the email.

You can also track your order by visiting www.Godrej Interio .com and clicking on the Track Your Order link located in the upper right-hand corner of the website. From there, you can either login, or type in your order information to get tracking.
                  
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseSix">What is the meaning of the different tracking status flags?</a>
                </h4>
              </div>
              <div id="collapseSix" className="panel-collapse collapse">
                <div className="panel-body">
                In Transit: Your package is on the way to the destination.

Delivered: Your item has been delivered.

Returned to Origin (RTO): Your item has been returned to the Godrej Interio  warehouse.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseEight">How do I track the progress of an order??</a>
                </h4>
              </div>
              <div id="collapseEight" className="panel-collapse collapse">
                <div className="panel-body">
                Once your order has been shipped, you will receive an email and an SMS notification with details of the order. You can track the shipment by clicking on the link provided in the email.

You can also track your order by visiting www.Godrej Interio .com and clicking on the Track Your Order link located in the upper right-hand corner of the website. From there, you can either login, or type in your order information to get tracking.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseNine">What happens after the order gets shipped? Does it directly get delivered?</a>
                </h4>
              </div>
              <div id="collapseNine" className="panel-collapse collapse">
                <div className="panel-body">
                Often items are procured from various vendors across the country and sometimes have to be transported from far-flung parts of your own city or neighbouring areas. In such cases, the item gets shipped from the vendor to our warehouse and then to you. We send regular email updates about the whereabouts of your order to keep you informed of where your item is in the shipping process.
                </div>
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseFour">What does it mean when my item has reached my state or city?</a>
                </h4>
              </div>
              <div id="collapseFour" className="panel-collapse collapse">
                <div className="panel-body">
                If you receive an email telling you that your item has reached your state or city, it is because it was shipped from a distant location and has one more step to go before it reaches you. Before you know it, it will be out to get delivered.
                  
                  Once the transaction is complete, you gain full access to the purchased product.
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseSeven">I am unable to track my order after receiving the tracking number (AWB)?</a>
                </h4>
              </div>
              <div id="collapseSeven" className="panel-collapse collapse">
                <div className="panel-body">
                Godrej Interio  generates and sends the tracking number (AWB Number) as soon as our courier partners collect the package from the warehouse. However, the courier partners may take between 24 to 48 hours to update the tracking details on their website and hence, your order may not be tracked during this period. If your package was recently shipped, try using the AWB number after 24 hours.
                </div>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default FaqAnswers;















