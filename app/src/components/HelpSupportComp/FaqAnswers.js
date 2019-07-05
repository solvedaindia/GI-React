import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
import  '../../../public/styles/about-us/aboutUs.scss'



class FaqAnswers extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            // imgList: [scatchImg1,scatchImg2,scatchImg3],
// index: 0
        }
    }

  
        
        
     
      
    
  

  render() {
    return (
        <div className="container">
<br />
<br />
<br />
<br />
<h3 className="MyOd">My Orders</h3>
<div className="panel-group" id="accordion">
    <div className="faqHeader">General questions</div>
    {/* <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Do you ship to my city and location?</a>
            </h4>
        </div>
        <div id="collapseOne" className="panel-collapse collapse in">
            <div className="panel-body">
            We deliver in the following place currently<br/><h3  className="panel-body">Tamil Nadu</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Andhra Pradesh</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Karnataka</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Andhra Pradesh</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Tamil Nadu</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            </div>
        </div>
    </div> */}
        <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Do you ship to my city and location?</a>
            </h4>
        </div>
        <div id="collapseOne" className="panel-collapse collapse in">
            <div className="panel-body">
            We deliver in the following place currently<br/><h3  className="panel-body">Tamil Nadu</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Andhra Pradesh</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Karnataka</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Andhra Pradesh</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            <br/><h3  className="panel-body">Tamil Nadu</h3><br/><p className="panel-body">Aanamalai, Agra, Ahmedabad, Alappuzha, Aler, Alibaug, Alwar, Ambarnath, Amtala, Anand, Anikorai, Ankleshwar, Arnala, Asansol, Athikunna, Athipalli, Aurangabad, Avanshi, Badlapur, Bahadurgarh, Bangalore, Bangarpet, Bawal, Bellevue, Bharuch, Bhiwadi, Bhongir,</p>
            </div>
        </div>
</div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen">What is the estimated delivery time?</a>
            </h4>
        </div>
        <div id="collapseTen" className="panel-collapse collapse">
            <div className="panel-body">
               Two to five working days. 
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen">What is the estimated delivery time?</a>
            </h4>
        </div>
        <div id="collapseTen" className="panel-collapse collapse">
            <div className="panel-body">
               Two to five working days. 
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEleven">How do I track my order status?</a>
            </h4>
        </div>
        <div id="collapseEleven" className="panel-collapse collapse">
            <div className="panel-body">
                All prices for themes, templates and other items, including each seller's or buyer's account balance are in <strong>USD</strong>
            </div>
        </div>
    </div>

    <div className="faqHeader">Sellers</div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Is there a first time customer discount?</a>
            </h4>
        </div>
        <div id="collapseTwo" className="panel-collapse collapse">
            <div className="panel-body">
                Any registed user, who presents a work, which is genuine and appealing, can post it on <strong>PrepBootstrap</strong>.
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">What warranty does Godrej Interio have for its products?</a>
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
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">Want to customize one of your products, can I do that?</a>
            </h4>
        </div>
        <div id="collapseFive" className="panel-collapse collapse">
            <div className="panel-body">
                Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller, regardless of any restrictions, such as volume, date of entry, etc.
                <br />
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix">Are there any delivery charges or installation charges?</a>
            </h4>
        </div>
        <div id="collapseSix" className="panel-collapse collapse">
            <div className="panel-body">
                There are a number of reasons why you should join us:
                <ul>
                    <li>A great 70% flat rate for your items.</li>
                    <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if it gets rejected, there is another iteration. We have aliminated this, and made the process very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                    <li>We are not an exclusive marketplace. This means that you can sell your items on <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your earning potential.</li>
                </ul>
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEight">What are the payment options?</a>
            </h4>
        </div>
        <div id="collapseEight" className="panel-collapse collapse">
            <div className="panel-body">
                The best way to transfer funds is via Paypal. This secure platform ensures timely payments and a secure environment. 
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseNine">When do I get paid?</a>
            </h4>
        </div>
        <div id="collapseNine" className="panel-collapse collapse">
            <div className="panel-body">
                Our standard payment plan provides for monthly payments. At the end of each month, all accumulated funds are transfered to your account. 
                The minimum amount of your balance should be at least 70 USD. 
            </div>
        </div>
    </div>

    <div className="faqHeader">Buyers</div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">I want to buy a theme - what are the steps?</a>
            </h4>
        </div>
        <div id="collapseFour" className="panel-collapse collapse">
            <div className="panel-body">
                Buying a theme on <strong>PrepBootstrap</strong> is really simple. Each theme has a live preview. 
                Once you have selected a theme or template, which is to your liking, you can quickly and securely pay via Paypal.
                <br />
                Once the transaction is complete, you gain full access to the purchased product. 
            </div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">Is this the latest version of an item</a>
            </h4>
        </div>
        <div id="collapseSeven" className="panel-collapse collapse">
            <div className="panel-body">
                Each item in <strong>PrepBootstrap</strong> is maintained to its latest version. This ensures its smooth operation.
            </div>
        </div>
    </div>
</div>
</div>
    );
  }
}

export default FaqAnswers;















