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

   handleSubmit()
   {
        this.props.close();
   }
   
    render() {
        return (
            <>
                <div className='paymet-type'>
                    <p className='msgText'>{MESSAGE_REFUND}</p>
                    <input type="radio" value="Online Payment Method" checked={true} id='online-payment'/>
                    <label className='label-text' htmlFor='online-payment'>{PAYMENT_MODE}</label>

                    
                 </div>
            </>
        )
    }
}

export default RefundMode;