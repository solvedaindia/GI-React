import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import {
  cartApplyPromoAPI,
  cartRemovePromoAPI,
} from '../../../public/constants/constants';
import {
  AVAILABLE_CODES,
  PROMO_CODE_NOT_VALID,
  VIEW_MORE,
  APPLY,
} from '../../constants/app/cartConstants';

class ViewAllPromo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      error: null,
      isApplyDisable: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async applyPromoCode(promoCode) {
    const data = {
      orderId: this.props.orderID,
      promoCode,
    };
    try {
      this.setState({
        isApplyDisable: true,
      });
      if (this.props.appliedPromoCode[0]) {
        await apiManager.post(
          cartRemovePromoAPI + this.props.appliedPromoCode[0],
        );
      }
      const response = await apiManager.post(cartApplyPromoAPI, data);
      this.setState({
        promoCode: response.data.data,
        error: null,
        isApplyDisable: false,
      });
      this.props.getCartDetails();
      this.handleClose();
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
        isApplyDisable: false,
      });
    }
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
              <div className="promoError">{PROMO_CODE_NOT_VALID}</div>
            )}
            <ul className="promoList viewAll">
              {!!promo &&
                promo.map((sellerItemData, index) => {
                  if (
                    this.props.appliedPromoCode &&
                    this.props.appliedPromoCode.length > 0 &&
                    this.props.appliedPromoCode[0] === sellerItemData.promocode
                  ) {
                    return null;
                  }
                  return (
                    <li className="promoListItem" key={index}>
                      <p className="promoCode">{sellerItemData.promocode}</p>
                      <p className="promoDesc">
                        {sellerItemData.shortDesc !== ''
                          ? sellerItemData.shortDesc
                          : sellerItemData.description}
                      </p>
                      <button
                        disabled={this.state.isApplyDisable}
                        className="applyPromo"
                        onClick={this.applyPromoCode.bind(
                          this,
                          sellerItemData.promocode,
                        )}
                      >
                        {APPLY}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ViewAllPromo;
