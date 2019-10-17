import React from 'react';
import '../../../public/styles/static-pages/consultForm.scss';
import {
  consultFormApi,consultGetApi
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import {BOOK_CONSULTATION,KITCHEN_CONSULT,WARDROBE_CONSULT, SEND,WHAT_YOU_LIKE,FULL_NAME,SELECT_OPTION, EMAIL,MESSEGE,MOBILE_NUMBER} from '../../constants/app/primitivesConstants';

import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
  validateFullName,
  regexName
} from '../../utils/validationManager';





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
      index: 0,
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessageDropOption: null,
      errorMessageMobile: null,
      errorMessageDescription: null
     };
     this.state = this.initialState
  }
 

handleChange  = e => {
  const {name, value} = e.target; //gets info from Form
  if(e.target.name =="name")
  {
    this.setState({
      errorMessageName : ""
     })
  }
  else if(e.target.name =="email")
  {
    this.setState({
      errorMessageEmail : ""
     })
  }
  else if(e.target.name =="mobileNumber")
  {
    //Check for number input only
    if(e.target.validity.valid ==false && e.target.value!='')
    {
      e.target.value =this.state.mobileNumber;
      const {name, value} = e.target
      this.setState({
        [name] : value
       })
       return;
    }
    this.setState({
      errorMessageMobile : ""
     })
  }
  this.setState({
    
    [name] : value
   })

}

clearData=()=>{
  //blank data
  this.setState({
    name: "",
    email:"",
    mobileNumber:"",
    dropDownValue: "Select an option",
    message: "",
    index: 0,
    errorMessageName: null,
    errorMessageEmail: null,
    errorMessageDropOption: null,
    errorMessageMobile: null,
    errorMessageDescription: null
  });
}
 
successMassage = () => {
  if(error !== null){
    alert('Thank you for the feed back')

  }
  
}

submitForm = (e) => {

    e.preventDefault()
    const isValidate = this.handleValidation(this.state, true);
    if (isValidate === false) {
      return false;
    }
    this.handleChange(e);
    this.callConsultApi();
}

//For Error Block
getErrorMessageBlock=(message)=>{
  return (<p className="error-msg">{message}</p>);
}

/* Handle Validation */
handleValidation=(obj, errorType)=>{
  let isValidate = errorType;
  let isEmailEntered=validateEmptyObject(obj.email);
  let isMobileEntered=validateEmptyObject(obj.mobileNumber);
  this.setState({
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessageDropOption: null,
      errorMessageMobile: null,
      errorMessageDescription: null
  });

  // For name validation
  if (!validateEmptyObject(obj.name)) {
      this.setState({
        errorMessageName: 'Please enter your full name',
      });
      isValidate = false;
  }
  else if (!validateFullName(obj.name) || !(regexName.test(obj.name))) {
		this.setState({
		  errorMessageName: 'Please enter a valid Name. It should not exceed 100 characters',
		});
		isValidate = false;
  }
  
  // For email validation
  if (!validateEmptyObject(obj.email) && !isMobileEntered) {
    this.setState({
      errorMessageEmail: 'Please enter valid Email Id',
    });
    isValidate = false;
  }
  else if (isEmailEntered && !regexEmail.test(obj.email)) {
    this.setState({
      errorMessageEmail: 'Please enter valid Email Id',
    });
    isValidate = false;

  }

  // For drop option validation
  if (obj.index==0) {
    this.setState({
      errorMessageDropOption: 'Please select an option',
    });
    isValidate = false;
  }


  // For mobile validation
  if (!validateEmptyObject(obj.mobileNumber) && !isEmailEntered) {
    this.setState({
      errorMessageMobile: 'Please enter valid Mobile Number',
    });
    isValidate = false;
  }
  else if (isMobileEntered && !regexMobileNo.test(obj.mobileNumber)) {
    this.setState({
      errorMessageMobile: 'Please enter valid Mobile Number',
    });
    isValidate = false;
  }

  // For mobile validation

  return isValidate;
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
      alert('Thank you for the feed back')
      this.clearData();
		}).catch(error => {
			this.setState({
       error: error
      });
      alert('Somthing went wrong')
		});
  }
  getConsultDropDownApi = ()=> {
    apiManager
      .get(consultGetApi)
      .then(response => {
        const {data} = response || {};
        this.setState({
          dropDownArr: data.data.consultationData
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
    let currentIndex=this.state.index;    
items = this.state.dropDownArr.map((item, index) => {
  if(currentIndex==0){
    return(
      <option value={item}>{item}</option>
    )
  }
  else{
    return(
      <option value={item} selected='false'>{item}</option>
    )
  }
  
})
  
return items;
}

onDropdownSelected = (e) => {
  if (e.target.value !== 'null' && this.state.dropDownValue !== e.target.value) {

    this.setState({
      dropDownValue : e.target.value,
      index : e.target.selectedIndex
     })
  }
}





    render() {
      const{name, email,mobileNumber,message, dropDownValue,index} = this.state
      let errorMessageName = null;
      let errorMessageEmail = null;
      let errorMessageOption = null;
      let errorMessageMobile = null;
      let errorMessageDescription = null;
      if (this.state.errorMessageName) {
        errorMessageName =this.getErrorMessageBlock(this.state.errorMessageName);
      }
      if (this.state.errorMessageEmail) {
        errorMessageEmail =this.getErrorMessageBlock(this.state.errorMessageEmail);
      }
      if (this.state.errorMessageDropOption) {
        errorMessageOption =this.getErrorMessageBlock(this.state.errorMessageDropOption);
      }
      if (this.state.errorMessageMobile) {
        errorMessageMobile =this.getErrorMessageBlock(this.state.errorMessageMobile);
      }
      if (this.state.errorMessageDescription) {
        errorMessageDescription =this.getErrorMessageBlock(this.state.errorMessageDescription);
      }
      

        return (
          <form className='consultForm'>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="name">{FULL_NAME}</label>
                      <input  onChange={this.handleChange} onClick={this.handleChange} className="form-control" value={name} id="name" name="name" type="text" required  />
                      {errorMessageName}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="email">{EMAIL}</label>
                      <input  onChange={this.handleChange} onClick={this.handleChange} className="form-control"  id="email" value={email} name="email" type="email" required/>
                      {errorMessageEmail}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="dropdown">{WHAT_YOU_LIKE}</label>
                      <select  name="dropDownValue" onChange={this.onDropdownSelected} onClick={this.onDropdownSelected.bind(this)} className="form-control" required>
                        <option value='Select an option' selected='true'>{SELECT_OPTION}</option>
                         {this.createSelectItems()}
                      </select>
                      {errorMessageOption}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="number">{MOBILE_NUMBER}</label>
                      <input className="form-control"  onChange={this.handleChange}  pattern="[0-9]*" value={mobileNumber} id="mobileNumber" type="mobile" name="mobileNumber" maxlength="10" required/>
                      {errorMessageMobile}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <label className="form-labeled" htmlFor="massage">{MESSEGE}</label>
                      <input className="form-control"  onChange={this.handleChange} onClick={this.handleChange} value={message}  id="message" name="message" type="text" required/>
                      {errorMessageDescription}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-12">
                  <div className="form-div clearfix div-error">
                    <div className="form-group">
                      <button type="button" onClick={this.submitForm} className="btn btn-primary btn-submit">{SEND}</button>
                    </div>
                  </div>
                </div>
              </div>
          </form>
        );
    }
}  

export default ConsultForm;
