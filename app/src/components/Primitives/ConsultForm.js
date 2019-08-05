import React from 'react';
import { render } from 'react-dom';
// import Form from 'react-bootstrap-form';
import Input from '../Primitives/consultFormInput'
import '../../../public/styles/static-pages/warobes.scss'
import {
  consultFormApi,consultGetApi
} from '../../../public/constants/constants';
import axios from 'axios';
import apiManager from '../../utils/apiManager';





class ConsultForm extends React.Component {
  constructor() {
    super();
    this.initialState = {
      name: "",
      email:"",
      mobileNumber:"",
      dropDownValue: "",
      message: "",
      dropDownArr: [],
      index: 0
     };
     this.state = this.initialState
  }
 

handleChange  = e => {
  const {name, value} = e.target; //gets info from Form
  console.log('data', e.target)
 
  this.setState({
    
    [name] : value
   })
   console.log("name checks", [name])

}
 
successMassage = () => {
if(error !== null){
  alert('Thank you for the feed back')

}
  
}

submitForm = (e) => {
  e.preventDefault()
  this.handleChange(e);
  this.setState(this.initialState);
  this.callConsultApi();
  this.successMassage()
}

 
  callConsultApi = () => {
    
		
      const data = {
        name:this.state.name,
        mobileNumber:this.state.mobileNumber,
        email:this.state.email,
        dropDownValue:this.state.dropDownValue,
        message:this.state.message,
       
        }
		apiManager.post(consultFormApi, data).then((res) => {
			console.log('aaaaa', res);
			this.setState({
        name: res.data.name,
        mobileNumber: res.data.mobileNumber,
        email: res.data.email,
        dropDownValue: res.data.dropDownValue,
        message:res.data.message
        
			});
		}).catch(error => {
			this.setState({
       error: error
			});
			console.log('Notify API Error---', error.response.data.error.error_message);
		});
  }
  getConsultDropDownApi = ()=> {
    apiManager
      .get(consultGetApi)
      .then(response => {
        console.log("ressss", response)
        const {data} = response || {};
        this.setState({
          dropDownArr: data.data.consultationData
        // layer1Data: data && data.data.Header_Static_Links,
        // isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
        error,
        isLoading: false,
        });
      });
    }
  componentDidMount(){
    this.getConsultDropDownApi();
  }

  createSelectItems =() => {
    let items = [];         
items = this.state.dropDownArr.map((item, index) => {
  return(
    <option value={item}>{item}</option>
   
  )
})
  
console.log('myarr', items)
return items;

  }

onDropdownSelected = (e) => {
  if (e.target.value !== 'null' && this.state.dropDownValue !== e.target.value) {
    console.log("THE VAL", e.target.value);
    this.setState({
      dropDownValue : e.target.value
     })
  }
}


    render() {
      const{name, email,mobileNumber,message, dropDownValue} = this.state
      console.log('test=>', this.state)
        return (
          <form>
            <div>
            <h2 className="Book-a-consultation">Book a consultation</h2>
                  <p className="FormPAra">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor. </p>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="name">Full Name</label>
                      <input  onChange={this.handleChange} onClick={this.handleChange} className="form-control" value={name} id="name" name="name" type="text" required />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="email">Email</label>
                      <input  onChange={this.handleChange} onClick={this.handleChange} className="form-control"  id="email" value={email} name="email" type="email" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="dropdown">What Would you Like to Do</label>
                      <select name="dropDownValue" onClick={this.onDropdownSelected.bind(this)} className="form-control" required>
                        <option value='null'>Select an option</option>
                         {this.createSelectItems()}
                        
                       
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="number">Mobile Number</label>
                      <input className="form-control"  onChange={this.handleChange} value={mobileNumber} id="mobileNumber" type="number" name="mobileNumber" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="massage">Massage</label>
                      <input className="form-control"  onChange={this.handleChange} onClick={this.handleChange} value={message}  id="message" name="message" type="text" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-12">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <button type="button" onClick={this.submitForm} className="btn btn-primary send-div">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
    }
}  

export default ConsultForm;
