import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import { cartApplyPromoAPI } from '../../../public/constants/constants';
import {AVAILABLE_CODES } from '../../constants/app/cartConstants';
import {COUPAN_CODE_NOT_VALID } from '../../constants/app/cartConstants';
import {VIEW_MORE } from '../../constants/app/cartConstants';
import {APPLY } from '../../constants/app/cartConstants';



class ViewAllPromo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      error: null,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  applyPromoCode(promoCode) {
    const data = {
      orderId: this.props.orderID,
      promoCode,
    };
    apiManager
      .post(cartApplyPromoAPI, data)
      .then(response => {
        this.setState({
          error: null,
        });
        this.props.getCartDetails();
        this.handleClose();
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  /* Handle Modal Close */
  handleClose() {
    this.setState({
      show: false,
      error: null,
    });
  }

  /* Handle Modal Show */
  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { promo } = this.props;
    const { error } = this.state;
    return (
      <>
        {!!promo &&
          promo.length > 3 && (
          <span className="viewAllPromo" onClick={this.handleShow}>
            {VIEW_MORE}
          </span>
        )}
        <Modal
          className="modal_emiInstallment viewAllPopUp"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Body>
            <Button className="close" onClick={this.handleClose} />
            <h4 className="heading">{AVAILABLE_CODES}</h4>
            {!!error && (
              <div className="promoError">{COUPAN_CODE_NOT_VALID}</div>
            )}
            <ul className="promoList viewAll">
              {!!promo &&
                promo.map((sellerItemData, index) => (
                  <li className="promoListItem" key={index}>
                    <p className="promoCode">{sellerItemData.promocode}</p>
                    <p className="promoDesc">{sellerItemData.description}</p>
                    <span
                      className="applyPromo"
                      onClick={this.applyPromoCode.bind(
                        this,
                        sellerItemData.promocode,
                      )}
                    >
                      {APPLY}
                    </span>
                  </li>
                ))}
            </ul>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ViewAllPromo;
