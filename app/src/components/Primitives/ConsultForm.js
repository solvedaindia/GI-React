import React from 'react';
import { render } from 'react-dom';
// import Form from 'react-bootstrap-form';
import Input from '../Primitives/consultFormInput'
import '../../../public/styles/wardrobes/warobes.scss'
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  consultFormApi,
  userDataAPI,
  PinToCityAPI
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
     };
     this.state = this.initialState
  }
 
//  handleSubmit = e => {
//     e.preventDefault();
    
//     const data = new FormData(e.target.value);

//       this.callConsultApi();
//   };
handleChange  = e => {
  //e.preventDefault()
  const {name, value} = e.target; //gets info from Form
 
  this.setState({
    [name] : value
   })
//alert(value);
   //this.setState({'dropDownValue':value})
   //this.setState(selectValue:e.target.value});
//   if (e.target.id === 'name') {
//     this.setState({ name: e.target.value });
// } else if (e.target.id === 'email') {
//     this.setState({ email: e.target.value });
// } else if (e.target.id === 'mobileNumber') {
//     this.setState({ mobileNumber: e.target.value });
// } else if (e.target.id === 'dropDownValue') {
//     this.setState({ dropDownValue: e.target.value});
//     console.log(e.target.value);
// }else if (e.target.id === 'message') {
//   this.setState({ message: e.target.value});
//   console.log(e.target.value);
// }

console.log('check', this.state);
//this.callConsultApi()
}
 


submitForm = (e) => {
//console.log('target',)
  this.handleChange(e);
  this.setState(this.initialState);
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

    render() {
      const{name, email,mobileNumber,message, dropDownValue} = this.state
      console.log('test=>', this.state)
        return (
          <form>
            <div>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="name">Full Name</label>
                      <input  onChange={this.handleChange} className="form-control" value={name} id="name" name="name" type="text" required />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="email">Email</label>
                      <input  onChange={this.handleChange} className="form-control"  id="email" value={email} name="email" type="email" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="dropdown">What Would you Like to Do</label>
                      <select   name="dropDownValue" onChange={this.handleChange} className="form-control">
                      <option>Select an option</option>

                        <option>Selected option</option>
                       
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="number">Mobile Number</label>
                      <input className="form-control"  onChange={this.handleChange} value={mobileNumber} id="mobileNumber" name="mobileNumber" type="number" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="massage">Massage</label>
                      <input className="form-control"  onChange={this.handleChange} value={message}  id="message" name="message" type="text" required/>
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
