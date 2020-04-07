import React from 'react';
import { Button } from 'react-bootstrap';
import {CANCEL,SUBMIT } from '../../constants/app/checkoutConstants';
import {MESSAGE_REFUND,PAYMENT_MODE } from '../../constants/app/cancelConstants';



class RefundMode extends React.Component {
   constructor(props){
    super(props);
    this.handleCancel=this.handleCancel.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    

   }

   handleCancel(){
    this.props.close();
   }

   handleSubmit(){

   }
   
    render() {
        return (
            <>
                <br/>
                {MESSAGE_REFUND}
                 <br/>
                <label>
                 <input type="radio" value="Online Payment Method" checked={true} />
                    {PAYMENT_MODE}
                </label>
                <br/>
                <Button className="btn-cancel btn" onClick={this.handleCancel}>
                {CANCEL}
                </Button>
                <Button className="btn-save btn" onClick={this.handleSubmit}>
                {SUBMIT}
                </Button>
            </>
        )
    }
}

export default RefundMode;