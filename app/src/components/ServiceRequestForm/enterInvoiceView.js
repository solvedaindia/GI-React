import React from 'react';
import Input from '../Primitives/input';

class EnterInvoiceView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage:"",
      invoiceNumber:"",
      isUploadBtnDisabled:true,
    };
    this.handleInput=this.handleInput.bind(this)
  }

  onSelection = (value,index) => {
    
  }
  handleInput=(event)=>{
    if(event.target.value.length==12)
    {
      this.setState({
        invoiceNumber: event.target.value,
        isUploadBtnDisabled:false,
      });
      this.validateInvoice();
    }
    else{
      this.setState({
        invoiceNumber: event.target.value,
        isUploadBtnDisabled:true,
      });
    } 
  
  }
  validateInvoice=()=>
  {

  }

  onUploadInvoice=()=>{
   
   const uploadInvoice = document.getElementById("uploadInvoice");
    uploadInvoice.click();
    console.log("aaaaaaa-----",uploadInvoice);
  }

  render() {
   
    return (
      <div className="form-BgContainer addAddressContainer">
          <div className="row">
            <div className="col-md-6">
              <div className='form-div clearfix div-error'>
                <input  
                  onKeyPress={this.onKeyPress} 
                  inputType="text" 
                  title="Invoice Number" 
                  name="invoice" 
                  id="invoice" 
                  placeholder="Enter invoice number" 
                  value = {this.state.invoiceNumber }
                  onChange={this.handleInput} 
                  maxLength={12}
                  isAutoFocus={true} />
                {this.state.error ? <div className='error-msg'>{this.state.errorMessage}</div> : null}
              </div>
            </div>
            <div className="col-md-6">
            <button onClick={this.onUploadInvoice.bind(this)} disabled={this.state.isUploadBtnDisabled} className='btn-save btn'>Upload Invoice</button>
            <input type="file" id="uploadInvoice" accept="image/*,application/pdf" style={{display:'none'}} ></input>
            </div>
          </div>        
      </div>
    );
  }
}
export default EnterInvoiceView;
