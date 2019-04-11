import React from 'react';
import { Row, Col } from 'react-bootstrap';

class productDetail extends React.Component {
	constructor() {
		super();
		this.openCity = this.openCity.bind(this);

	}

    openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }

	render () {
        return(
            <div>
                <Row>
                    <Col md={2} sm={12} xs={12}>
                        <h3 className='heading'>
                            Product Detail
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} sm={12} xs={12}>
                        <img src={this.props.productDetail}/>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                    <div className="tab">
      <button className="tablinks" onClick={() => this.openCity(this, 'London')}>London</button>
      <button className="tablinks" onClick={() => this.openCity(this, 'Paris')}>Paris</button>
      <button className="tablinks" onClick={() => this.openCity(this, 'Tokyo')}>Tokyo</button>
    </div>
    
    <div id="London" className="tabcontent active">
      <h3>London</h3>
      <p>London is the capital city of England.</p>
    </div>
    
    <div id="Paris" className="tabcontent" display="none">
      <h3>Paris</h3>
      <p>Paris is the capital of France.</p> 
    </div>
    
    <div id="Tokyo" className="tabcontent">
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
    </div>
                    </Col>
                </Row>
            </div>
        );
	}
}

export default productDetail;