import React from 'react';
const favicon = require('../../../public/images/favicon.png');
import { Modal, Button } from 'react-bootstrap';
// import {CANCEL } from '../../constants/app/checkoutConstants';
// import { isMobile } from '../../utils/utilityManager';
import {CANCEL_ORDER,CANCEL_ITEM } from '../../constants/app/cancelConstants';
import DropDownList from './dropDownList';
import RefundMode from './refundMode';

class CancelComponents extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showPopUp:'false',
            value: '',
            text: ''
        };

        this.handleDocClick = this.handleDocClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleParentStateFromChildState = this.handleParentStateFromChildState.bind(this);

    }

    componentDidMount() {
        document.body.addEventListener('dblclick', this.handleDocClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('dbclick', this.handleDocClick);
    }

    handleDocClick(){
        this.setState({showPopUp:'true'});
        console.log("clicked on doc bdy");
    }

    handleClose(){
        this.setState({showPopUp:'false'});

    }

    handleParentStateFromChildState(values,texts){
        this.setState =({value:values,text: texts});
    }

    render() {
        return(
            <>
                {this.state.showPopUp === 'true' ?
                <Modal align="center" style={{background:'rgba(0, 0, 0, 0.5)', zIndex:'2147483648'}}
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
                        <h1>{this.props.cancelOrderType === 'item' ? CANCEL_ITEM:CANCEL_ORDER }</h1><br/>
                        <img src={favicon}/>

                    </Modal.Header>
                    <Modal.Body>

                        <DropDownList handleParentState = {this.handleParentStateFromChildState} cancelOrderType={this.props.cancelOrderType}/>
                        <RefundMode value= "" text = "" close={this.handleClose}/>
                    </Modal.Body>
                </Modal>:
                 <></>}
            </>
        )
    }
    
}
export default CancelComponents;