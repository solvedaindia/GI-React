import React from 'react';
import Dropdown from 'react-dropdown';
import { cartUpdateAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import { isMobile } from '../../utils/utilityManager';
import {QUANTITY } from '../../constants/app/cartConstants';
import {MOBILE_QUANTITY } from '../../constants/app/cartConstants';
import { triggerAddToCartGTEvent, triggerRemoveFromCartGTEvent } from '../../utils/gtm';


class CartUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      orderItemId: props.orderItemId,
      size: 1,
      cartQty: this.returnQtyValues(props.quantity)
    };
    this.handleChange = this.handleChange.bind(this);
    this.isQtyChange = this.isQtyChange.bind(this);
  }



  handleChange(event) {
    //   this.setState({quantity: event.target.value});
    //this.handleCartUpdate(event.target.value);
    
  }
  isQtyChange(eVal){
    this.handleCartUpdate(eVal.value);
  }
  
  handleCartUpdate(qty) {
    if(parseInt(qty) > parseInt(this.props.quantity)) {
      triggerAddToCartGTEvent(this.props.itemData, parseInt(qty) - parseInt(this.props.quantity));
    } else if (parseInt(qty) < parseInt(this.props.quantity)) {
      triggerRemoveFromCartGTEvent(this.props.itemData, parseInt(this.props.quantity) - parseInt(qty));
    }
    const data = {
      orderItem: [
        {
          quantity: qty,
          orderItemId: this.props.orderItemId,
          //cartQty:this.returnQtyValues(qty),
        },
      ],
    };

    apiManager
      .post(cartUpdateAPI, data)
      .then(response => {
        this.setState({
          quantity: qty,
          cartQty:this.returnQtyValues(qty),
          isLoading: false,
        });
        this.props.getCartDetails();

      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.quantity !== nextProps.quantity){
      this.setState({
        quantity: nextProps.quantity,
        cartQty:this.returnQtyValues(nextProps.quantity)
      })
    }
  }

  returnSelectValues = shiftsList => {
    const list=[]
      shiftsList.forEach((prop,j) => {
            const temp={}
            temp['label']=j+1;
            temp['value']=(j+1).toString();
            list.push(temp)

          })
      return list;

  }
  returnQtyValues = qtyVal => {
    const qtyEval={}
    qtyEval['value'] = qtyVal;
    qtyEval['label'] = qtyVal;
    return qtyEval;
  }

  

  render() {
    return (
      <form className="cartQty">
        <label className="qytLabel">{!isMobile() ? QUANTITY  : MOBILE_QUANTITY}</label>
        {/*<select
          className="qytList"
          value={this.state.quantity}
          onChange={this.handleChange}
          >
          {[...Array(100)].map((e, key) => {
            if (key > 0) {
              return <option key={key} value={key}>{key}</option>;
            }
          })}
        </select> */}
      <div className='qty-dropdown'> <Dropdown 
        options={this.returnSelectValues([...Array(99)])}
        value={this.state.cartQty}
        onChange={this.isQtyChange}
        controlClassName='cart-qty'
      /></div>
        {!!isMobile() && <span className='caretDown' />}
      </form>
    );
  }
}

export default CartUpdate;
