import {
  currencyINR,
  purchaseGTagEvent,
  productDetailsGTagEvent,
  checkoutGTagEvent,
  addToCartGTagEvent,
  removeFromCartGTagEvent,
  brandParamGTag,
  affiliationParamGTag,
  productClickGTagEvent,
  impressionsGTagEvent,
  formSubmissionGTagEvent,
} from '../constants/app/gtmConstants';

export function triggerOrderConfirmationGTEvent(orderData) {
  if (orderData && !window.purchaseGTag) {
    const purchaseGTag = {
      event: purchaseGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        purchase: {
          actionField: {
            id: orderData.orderID,
            affiliation: affiliationParamGTag,
            revenue: orderData.orderSummary.netAmount,
            shipping: orderData.orderSummary.shippingCharges,
          },
          products: orderData.orderItems.map(orderItem => ({
            name: orderItem.productName,
            id: orderItem.partNumber,
            price: orderItem.offerPrice,
            brand: brandParamGTag,
            variant: orderItem.shortDescription,
            quantity: orderItem.quantity,
          })),
        }
      }
    }
    window.purchaseGTag = purchaseGTag;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(purchaseGTag);
  }
}

export function unmountOrderConfirmationGTEvent() {
  if (window.purchaseGTag) {
    delete window.purchaseGTag;
  }
}

export function triggerProductDetailGTEvent(skuData) {
  if (
    skuData &&
    skuData.partNumber &&
    (!window.pdpEntries || !window.pdpEntries[skuData.partNumber])
  ) {
    const pdpGTag = {
      event: productDetailsGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        detail: {
          actionField: {},
          products: [
            {
              name: skuData.productName,
              id: skuData.partNumber,
              price: skuData.offerPrice,
              brand: brandParamGTag,
              variant: skuData.shortDescription,
            },
          ],
        },
      },
    };
    window.pdpEntries = window.pdpEntries || {};
    window.pdpEntries[skuData.partNumber] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(pdpGTag);
  }
}

export function unmountProductDetailGTEvent() {
  if (window.pdpEntries) {
    delete window.pdpEntries;
  }
}

export function triggerAddToCartGTEvent(skuData, quantity) {
  if (skuData && skuData.partNumber) {
    const addToCartGTag = {
      event: addToCartGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        add: {
          products: [
            {
              name: skuData.productName,
              id: skuData.partNumber,
              price: skuData.offerPrice,
              brand: brandParamGTag,
              variant: skuData.shortDescription,
              quantity,
            }
          ]
        }
      }
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(addToCartGTag);
  }
}

export function triggerRemoveFromCartGTEvent(skuData, quantity) {
  if (skuData && skuData.partNumber) {
    const removeFromCartGTag = {
      event: removeFromCartGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        remove: {
          products: [
            {
              name: skuData.productName,
              id: skuData.partNumber,
              price: skuData.offerPrice,
              brand: brandParamGTag,
              variant: skuData.shortDescription,
              quantity,
            },
          ],
        },
      },
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(removeFromCartGTag);
  }
}

export function triggerReviewCartGTEvent(cartData) {
  if (cartData && !window.reviewCartGTag) {
    const reviewCartGTag = {
      event: checkoutGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        checkout: {
          actionField: {
            step: 1,
          },
          products: cartData.cartItems.map(cartItem => ({
            name: cartItem.productName,
            id: cartItem.partNumber,
            price: cartItem.offerPrice,
            brand: brandParamGTag,
            variant: cartItem.shortDescription,
            quantity: cartItem.quantity,
          })),
        }
      },
    };
    window.reviewCartGTag = reviewCartGTag;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(reviewCartGTag);
  }
}

export function unmountReviewCartGTEvent() {
  if (window.reviewCartGTag) {
    delete window.reviewCartGTag;
  }
}

export function triggerGuestLoginIdGTEvent() {
  if (!window.guestUserLoginIdGTag) {
    const guestUserLoginIdGTag = {
      event: checkoutGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        checkout: {
          actionField: {
            step: 2,
          },
        },
      },
    };
    window.guestUserLoginIdGTag = guestUserLoginIdGTag;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(guestUserLoginIdGTag);
  }
}

export function unmountGuestLoginIdGTEvent() {
  if (window.guestUserLoginIdGTag) {
    delete window.guestUserLoginIdGTag;
  }
}

export function triggerShipBillAddrGTEvent() {
  if (!window.shipBillAddrGTag) {
    const shipBillAddrGTag = {
      event: checkoutGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        checkout: {
          actionField: {
            step: 3,
          },
        },
      },
    };
    window.shipBillAddrGTag = shipBillAddrGTag;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(shipBillAddrGTag);
  }
}

export function unmountShipBillAddrGTEvent() {
  if (window.shipBillAddrGTag) {
    delete window.shipBillAddrGTag;
  }
}

export function triggerPaymentOptionGTEvent() {
  if (!window.paymentOptionGTag) {
    const paymentOptionGTag = {
      event: checkoutGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        checkout: {
          actionField: {
            step: 4,
          },
        },
      },
    };
    window.paymentOptionGTag = paymentOptionGTag;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(paymentOptionGTag);
  }
}

export function unmountPaymentOptionGTEvent() {
  if (window.paymentOptionGTag) {
    delete window.paymentOptionGTag;
  }
}

export function triggerProductClickGTEvent(skuData, source, position) {
  if (skuData && skuData.partNumber) {
    const productClickGTag = {
      event: productClickGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        click: {
          actionField: {
            list: source,
          },
          products: [
            {
              name: skuData.productName,
              id: skuData.partNumber,
              price: skuData.offerPrice,
              brand: brandParamGTag,
              variant: skuData.shortDescription,
              position,
            },
          ],
        },
      },
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(productClickGTag);
  }
}

export function triggerImpressionsGTEvent(skuList, source, pageNumber, pageSize) {
  if (
    skuList &&
    (!window.impressionsGTag || !window.impressionsGTag[`${source}${pageNumber}${pageSize}`])
  ) {
    const impressionsGTag = {
      event: impressionsGTagEvent,
      ecommerce: {
        currencyCode: currencyINR,
        impressions: skuList.map((skuData, index) => ({
          name: skuData.productName,
          id: skuData.partNumber,
          price: skuData.offerPrice,
          brand: brandParamGTag,
          variant: skuData.shortDescription,
          list: source,
          category: source,
          position: (pageNumber - 1) * pageSize + index + 1,
        })),
      },
    };
    window.impressionsGTag = window.impressionsGTag || {};
    window.impressionsGTag[`${source}${pageNumber}${pageSize}`] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(impressionsGTag);
  }
}

export function unmountImpressionsGTEvent() {
  if (window.impressionsGTag) {
    delete window.impressionsGTag;
  }
}

export function triggerFormSubmissionGTEvent(formType, formPosition) {
  const formSubmsnGTag = {
    event: formSubmissionGTagEvent,
    formType,
    formPosition,
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(formSubmsnGTag);
}
