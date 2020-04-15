import React from 'react';
const favicon = require('../../../public/images/favicon.png');
import { Modal, Button } from 'react-bootstrap';
// import {CANCEL } from '../../constants/app/checkoutConstants';
// import { isMobile } from '../../utils/utilityManager';
import { cancelOrderAPI,espotReasonOrderItemCancel,espotReasonOrderCancel } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import {CANCEL_ORDER,CANCEL_ITEM,MESSAGE_REFUND ,ERROR_MESSAGE_REASON,MESSAGE_REFUND_METHOD} from '../../constants/app/cancelConstants';
import {CANCEL,SUBMIT } from '../../constants/app/checkoutConstants';
import DropDownList from './dropDownList';
import RefundMode from './refundMode';

class CancelComponents extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showPopUp:'false',
            value: '',
            text: '',
            reasons:[],
            error:false,
            orderItem:undefined,
            orderData:undefined
        };

        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleParentStateFromChildState = this.handleParentStateFromChildState.bind(this);

    }

    // componentDidMount() {
    //     document.body.addEventListener('dblclick', this.handleDocClick);
    // }

    // componentWillUnmount() {
    //     document.body.removeEventListener('dbclick', this.handleDocClick);
    // }

    showModal(orderItem,orderData)
    {
        console.log("AAAAAAA",orderData)
       // console.log("AAAAAAAITEM",orderItem)
        this.setState({
            showPopUp:'true',
            orderData:orderData,
            orderItem:orderItem,
            value: '',
            text: '',
            reasons:[],
            error:false,
        });
        if(orderItem===undefined)
        {
            this.fetchReasonArray(false)
        }
        else{
            this.fetchReasonArray(true);
        }
    }

    fetchReasonArray(forItem)
    {
        apiManager
        .get(forItem?espotReasonOrderItemCancel:espotReasonOrderCancel)
        .then(response => {
          this.setState({
              reasons:response.data.data,
          })
        })
        .catch(error => {
      
        });
    }

    handleClose(){
        this.setState({showPopUp:'false'});
    }

    handleSubmit(){
       // this.setState({showPopUp:'false'});
       if(this.state.value==='')
       {
           this.setState({
               error:true,
           })
       }
       else{
        //this.setState({showPopUp:'false'});
       this.cancelOrder()
       }
    }

    cancelOrder() {
        let data = {
            orderid:this.state.orderData.orderID,
            refundmethod:this.state.orderData.paymentMethod===''?"COD":this.state.orderData.paymentMethod,
            cancelreason:this.state.value==='Other'?this.state.text:this.state.value
        };
        if(this.state.orderItem!==undefined)
        {
            data = {
                orderid:this.state.orderData.orderID,
                refundmethod:this.state.orderData.paymentMethod===''?"COD":this.state.orderData.paymentMethod,
                cancelreason:this.state.value==='Other'?this.state.text:this.state.value,
                partnumber:this.state.orderItem.partNumber,
            };
        }
        apiManager
          .post(cancelOrderAPI, data)
          .then(response => {
            this.setState({
                showPopUp:'false',
            });
            alert("Order cancelled successfully");
          })
          .catch(error => {
        
          });
      }

    handleParentStateFromChildState(values,texts){
       // alert(values)
        //this.setState =({value:values,text: texts});
        console.log(values,texts)
        this.setState({
            value:values,
            text:texts,
            error:false,
        })
    }

    render() {
        return(
            <>
                {this.state.showPopUp === 'true' ?
                <Modal className='cancel-order-model' style={{background:'rgba(0, 0, 0, 0.5)', zIndex:'2147483648'}}
                // ref={this.windowModelRef}
                // className="cancelOrder"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered          
                animation={false}
                show={this.state.showPopUp}
                onHide={this.handleClose}
                backdrop = {false}
                >
                    <Modal.Header  >
                        <h3>{this.state.orderItem != undefined ? CANCEL_ITEM :CANCEL_ORDER }</h3>
                        <div className='logo-img'><img src={favicon}/></div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='cancel-order-box'>
                            <DropDownList 
                                handleParentState = {this.handleParentStateFromChildState} 
                                reasons={this.state.reasons}
                                cancelOrderType={this.state.orderItem != undefined?'item':'order'}/>
                            {this.state.error && <p className='error-text'>{ERROR_MESSAGE_REASON}</p>}
                            {/* <RefundMode value= "" text = "" close={this.handleClose} submit={this.handleSubmit}/> */}
                            <div className='paymet-type'>
                            <p className='msgText'><strong>{MESSAGE_REFUND_METHOD}</strong>{this.state.orderData.paymentMethod}</p>
                            </div>
                            <div className='btn-wrapper'>
                                <Button className="btn-cancel btn" onClick={this.handleClose}>{CANCEL}</Button>
                                <Button className="btn-save btn" onClick={this.handleSubmit}>{SUBMIT}</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>:
                 null}
            </>
        )
    }
    
}
export default CancelComponents;