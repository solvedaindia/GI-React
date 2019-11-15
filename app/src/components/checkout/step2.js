import React from 'react';
import {
  connect
} from 'react-redux';
import {
  compose
} from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import appCookie from '../../utils/cookie';
import PinChangePopup from './pinChangeModal';
import { isMobile } from '../../utils/utilityManager';
import {
  Button,
  Modal
} from 'react-bootstrap';
import Input from '../Primitives/input';
import { MOBILE_EMAIL, ONE_OR_MORE_ITEM, SAVE_YOUR_ADDRESS, ENTER_VALID_STATE, REQUIRED_FIELD, VALID_CITY_DISTRICT, VALID_ADDRESS, VALID_PINCODE, VALID_EMAIL } from '../../constants/app/checkoutConstants';








import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
  validatePindcode,
  validateAddress,
  validateCityDistrict,
  validateState,
  validateGST
} from '../../utils/validationManager';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  addressListAPI,
  userDataAPI,
  PinToCityAPI,
  addAddressAPI,
  AddAddressToCardAPI,
  minicartAPI,
  PreCheckoutAPI,
  SaveGSTAPI
} from '../../../public/constants/constants';
import {
  getReleventReduxState
} from '../../utils/utilityManager';
import {
  EROFS
} from 'constants';
import { replace } from 'connected-react-router';

export class Step2Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      has_pass: false,
      phone: '',
      email: '',
      same_bill: true,
      step: 1,
      selected_add: 0,
      showGift: false,
      addressList: null,
      saved_add: 'active_add',
      new_add: null,
      pin: '',
      city: '',
      state: '',
      ship_add_id: '',
      bill_add_id: '',
      orderId: '',
      defaultAddress: true,
      pinPop: false,
      currentPin: null,
      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address: false,
      error_city: false,
      error_state: false,
      error_gst: false,

      errorMessage_name: '',
      errorMessage_number: '',
      errorMessage_email: '',
      errorMessage_pincode: '',
      errorMessaget_address: '',
      errorMessage_city: '',
      errorMessage_state: '',
      errorMessage_gst: '',
      inputText_name: '',
      inputText_number: '',
      inputText_email: '',
      inputText_pincode: '',
      inputText_address: '',
      inputText_city: '',
      inputText_state: '',
      inputText_gst: '',

      berror_name: false,
      berror_number: false,
      berror_email: false,
      berror_pincode: false,
      berror_address: false,
      berror_city: false,
      berror_state: false,

      berrorMessage_name: '',
      berrorMessage_number: '',
      berrorMessage_email: '',
      berrorMessage_pincode: '',
      berrorMessaget_address: '',
      berrorMessage_city: '',
      berrorMessage_state: '',
      binputText_name: '',
      binputText_number: '',
      binputText_email: '',
      binputText_pincode: '',
      binputText_address: '',
      binputText_city: '',
      binputText_state: '',

      isSetAsDefault: '',
      new_add_error: '',
      new_add_msg: '',

      isSaveBtnDisabled: false,
      isProcceedBtnDisabled: false
    };

    this.handleInput = this.handleInput.bind(this);

  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      let selectedAddID = appCookie.get('adrID');
      this.callPinApi()
        .then(this.callAddressAPI)
        .then((data) => {
          var selectedIndex = null;
          if (data.addressList.length === 0) {
            this.newAddActive();
          }
          else {
            if (selectedAddID !== null && selectedAddID !== undefined && selectedAddID !== '') {
              data.addressList.map((data, index) => {
                if (selectedAddID === data.addressID) {
                  selectedIndex = index;
                }
              })
            }
          }

          this.setState({
            selected_add: selectedIndex !== null && selectedIndex !== undefined ? selectedIndex : 0,
            addressList: data.addressList,
            inputText_pincode: data.pinData.pin,
            inputText_city: data.pinData.city,
            inputText_state: data.pinData.state
          })
          
        })

    } else {
      this.callPinApi()
        .then((data) => {
          this.setState({
            inputText_pincode: data.pin,
            inputText_city: data.city,
            inputText_state: data.state
          })
        })
    }
    if (this.props.logonBy && this.props.logonBy.includes('@')) {
      this.setState({
        email: this.props.logonBy
      })
    } else {
      this.setState({
        phone: this.props.logonBy
      })
    }
  }

  callAddressAPI = (pinData) => {
    return new Promise((resolve, reject) => {
      if (this.props.isLoggedIn) {
        let token = appCookie.get('accessToken')
        axios.get(addressListAPI, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then(response => {
          var data = {};
          data.addressList = response.data.data.addressList.sort((a, b) => {
            if (b.isDefault == true) {
              return 1;
            } else {
              return 0;
            }
          });
          data.pinData = pinData;
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      } else {
        resolve();
      }
    })
  }

  handleChangeMobile = () => {
    this.props.back();
  }

  newAddActive = () => {
    this.setState({
      saved_add: null,
      new_add: 'active_add',
    })
  }

  mobiAddActive = () => {
    if (this.state.new_add == "active_add") {
      this.setState({
        new_add: null
      })
    } else {
      this.setState({
        new_add: 'active_add'
      })
    }
  }

  savedAddActive = () => {
    if (this.state.addressList) {
      this.setState({
        saved_add: 'active_add',
        new_add: null
      })
    }
  }

  callPinApi = (val, errorField) => {
    return new Promise((resolve, reject) => {
      let token = appCookie.get('accessToken')
      let defPin = appCookie.get('pincode');
      axios.get(`${PinToCityAPI}${val ? val : defPin}`, {
        headers: {
          store_id: storeId,
          access_token: token
        }
      }).then(response => {

        var data = response.data.data;
        data.pin = val ? val : defPin;
        resolve(data);
      }).catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;

        if (errorField === 'pin') {
          this.setState({
            inputText_city: '',
            inputText_state: '',
            error_pincode: true,
            errorMessage_pincode: errorMessage,
          })
        }
        else {
          this.setState({
            binputText_city: '',
            binputText_state: '',
            berror_pincode: true,
            berrorMessage_pincode: errorMessage,
          })
        }


        throw new Error(error);
        resolve()
      })
    })
  }

  pincodeFocusOut() {
    if (this.state.inputText_pincode !== '' && this.state.inputText_pincode.length === 6) {
      if (validatePindcode(this.state.inputText_pincode)) {
        this.callPinApi(this.state.inputText_pincode, 'pin').then((data) => {
          return this.setState({
            inputText_pincode: data.pin,
            inputText_city: data.city,
            inputText_state: data.state
          })
        })
      }
    }
    else {
      this.setState({
        inputText_city: '',
        inputText_state: '',
      })
    }
  }

  bPincodeFocusOut() {
    if (this.state.binputText_pincode !== '' && this.state.binputText_pincode.length === 6) {
      if (validatePindcode(this.state.binputText_pincode)) {
        this.callPinApi(this.state.binputText_pincode, 'bpin').then((data) => {
          return this.setState({
            binputText_pincode: data.pin,
            binputText_city: data.city,
            binputText_state: data.state
          })
        })
      }
    }
    else {
      this.setState({
        binputText_city: '',
        binputText_state: '',
      })
    }
  }

  checkPIN = () => {
    var localPIN = appCookie.get('pincode');
    if (this.state.inputText_pincode !== localPIN) {
      this.setState({
        currentPin: this.state.inputText_pincode,
        pinPop: true
      })
    } else {
      this.callAddress()
    }
  }

  cancelPinPop = () => {
    this.setState({
      currentPin: null,
      pinPop: false
    })
  }

  phoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  mailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleSameBill = () => {
    if (this.state.same_bill == false) {
      this.setState({
        same_bill: true
      })
    } else {
      this.setState({
        same_bill: false
      })
    }
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address: false,
      error_city: false,
      error_state: false,
      error_gst: false,
      berror_name: false,
      berror_number: false,
      berror_email: false,
      berror_pincode: false,
      berror_address: false,
      berror_city: false,
      berror_state: false,
    });
    switch (value.target.id) {
      case 'name':
        return this.setState({
          inputText_name: value.target.value,
        });
      case 'address':
        return this.setState({
          inputText_address: value.target.value,
        });
      case 'pin':
        if (value.target.value.length <= 6) {
          return this.setState({
            inputText_pincode: value.target.value,
          });
        }
        else {
          return;
        }


      case 'city':
        return this.setState({
          inputText_city: value.target.value,
        });
      case 'state':
        return this.setState({
          inputText_state: value.target.value,
        });
      case 'gst':
        if (value.target.value.length <= 15) {
          return this.setState({
            inputText_gst: value.target.value,
          });
        } else {
          return false;
        }
      case 'bname':
        return this.setState({
          binputText_name: value.target.value,
        });
      case 'bphone':
        return this.setState({
          binputText_number: value.target.value,
        });
      case 'bemail':
        return this.setState({
          binputText_email: value.target.value,
        });
      case 'baddress':
        return this.setState({
          binputText_address: value.target.value,
        });
      case 'bpin':
        if (value.target.value.length <= 6) {
          return this.setState({
            binputText_pincode: value.target.value,
          });
        }

        else {
          return;
        };
      case 'bcity':
        return this.setState({
          binputText_city: value.target.value,
        });
      case 'bstate':
        return this.setState({
          binputText_state: value.target.value,
        });
      default:
        return null;
    }
  }

  callAddress = () => {
    
    this.addAddress()
      .then(this.callAddressAPI)
      .then((data) => {
        if (this.props.isLoggedIn) {
          this.setState({
            addressList: data.addressList,
            saved_add: 'active_add',
            new_add: null
          })
        } else {
          this.addAddressToCart()
            .then((orderId) => {
              var selected_add = {
                address: this.state.inputText_address,
                city: this.state.inputText_city,
                state: this.state.inputText_state,
                pincode: this.state.inputText_pincode,
                orderId: orderId,
                billAddId: this.state.bill_add_id
              }
              this.props.handleAddress(selected_add);
              this.handleProceed()
            })
        }

      }).catch((err) => {
        throw new Error(err);
      })
  }

  addAddress = () => {
    this.setState({
      isSaveBtnDisabled: true
    })
    return new Promise((resolve, reject) => {
      var data = {
        name: this.state.inputText_name,
        pincode: this.state.inputText_pincode,
        city: this.state.inputText_city,
        state: this.state.inputText_state,
        address: this.state.inputText_address,
        default: String(this.state.defaultAddress),
        phone_number: this.state.phone,
        email_id: this.state.email,
      };

      let token = appCookie.get('accessToken')
      axios.post(addAddressAPI, data, {
        headers: {
          store_id: storeId,
          access_token: token
        }
      }).then(response => {
        
        if (this.state.same_bill == false && !this.props.isLoggedIn) {
          this.saveBillAdd()
            .then((billAddId) => {
              this.setState({
                ship_add_id: response.data.data.addressID,
                bill_add_id: billAddId
              })
            })
          resolve();
        } else {
          if (!this.props.isLoggedIn && this.state.same_bill == true) {
            this.setState({
              ship_add_id: response.data.data.addressID,
              bill_add_id: response.data.data.addressID
            })
          }
          resolve();
        }
        this.setState({
          isSaveBtnDisabled: false
        })
      }).catch(err => {
        this.setState({
          isSaveBtnDisabled: false
        })
        throw new Error(err);
        reject();
      })
    })
  }

  saveBillAdd = () => {
    return new Promise((resolve, reject) => {
      let token = appCookie.get('accessToken')
      var bdata = {
        name: this.state.binputText_name,
        pincode: this.state.binputText_pincode,
        city: this.state.binputText_city,
        state: this.state.binputText_state,
        address: this.state.binputText_address,
        default: true,
        phone_number: this.state.binputText_number,
        email_id: this.state.binputText_email
      };

      axios.post(addAddressAPI, bdata, {
        headers: {
          store_id: storeId,
          access_token: token
        }
      }).then(res => {

        resolve(res.data.data.addressID);
      }).catch(err => {
        throw new Error(err);
        reject();
      })
    })
  }

  saveGST = (orderId) => {
    return new Promise((resolve, reject) => {
      if (this.state.inputText_gst !== '' && this.state.inputText_gst.length == 15) {
        let token = appCookie.get('accessToken');
        var data = {
          order_id: orderId,
          gst_number: this.state.inputText_gst
        }
        axios.post(SaveGSTAPI, data, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then((res) => {
          resolve();
        }).catch((err) => {
          reject();
        })
      } else {
        resolve();
      }
    })
  }

  addAddressToCart = () => {
    this.setState({
      isProcceedBtnDisabled: true,
    })
    return new Promise((resolve, reject) => {
      let token = appCookie.get('accessToken');
      axios.get(minicartAPI, {
        headers: {
          store_id: storeId,
          access_token: token
        }
      }).then((response) => {
        var miniCartData = response.data.data.miniCartData
        var data = [];
        miniCartData.forEach((item) => {
          if (item.freeGift != true) {
            var obj = {
              "orderItemId": `${item.orderItemId}`,
              "shipModeId": this.props.shipModePro,
              "addressId": `${this.state.ship_add_id}`
            }
            data.push(obj);
          }
        });
        var body = {
          "orderItem": data,
          "shipModeId": this.props.shipModePro,
          "addressId": `${this.state.bill_add_id}`
        };
        axios.post(AddAddressToCardAPI, body, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then((res) => {
          var reqdata = {
            order_id: response.data.data.orderID
          }
          axios.post(PreCheckoutAPI, reqdata, {
            headers: {
              store_id: storeId,
              access_token: token
            }
          }).then((resp) => {

            const inventoryFlag = resp.data.data.reserved;
            if (inventoryFlag === '0') {
              alert(`${ONE_OR_MORE_ITEM}`)
              window.location.assign('/cart')
            }
            else {
              this.saveGST(resp.data.data.orderId)
                .then(() => {
                  resolve(resp.data.data.orderId);
                }).catch((err) => {
                  reject();
                })
            }

          }).catch((err) => {
            this.setState({
              isProcceedBtnDisabled: false,
            })
            reject()
          })
        }).catch((err) => {
          this.setState({
            isProcceedBtnDisabled: false,
          })
          reject();
        })
      }).catch((err) => {
        this.setState({
          isProcceedBtnDisabled: false,
        })
        reject(err);
      })
    })
  }

  handleloginContinue = () => {
    var selected_address = this.state.addressList[this.state.selected_add];
    if (this.state.same_bill == false) {
      this.saveBillAdd()
        .then((addressId) => {
          var selected_address = this.state.addressList[this.state.selected_add];
          this.setState({
            ship_add_id: selected_address.addressID,
            bill_add_id: addressId
          })
        })
    } else {
      this.setState({
        ship_add_id: selected_address.addressID,
        bill_add_id: selected_address.addressID
      })
    }

    this.addAddressToCart().then((orderId) => {
      selected_address.orderId = orderId;
      selected_address.billAddId = this.state.bill_add_id;
      this.props.handleAddress(selected_address);
      this.props.proceed();
    })

  }

  onLoginSave(event) {
    event.preventDefault();
    if (isMobile() && this.state.new_add) {
      this.setState({
        new_add_error: true,
        new_add_msg: `${SAVE_YOUR_ADDRESS}`
      });
      return;
    }
    var selected_address = this.state.addressList[this.state.selected_add];
    var localPIN = appCookie.get('pincode');
    var validateBillingAddress = true;
    if (this.state.same_bill == true) {
      error_gst: false
    }
    if (this.state.same_bill == false) {
      this.setState({
        berror_name: false,
        berror_number: false,
        berror_email: false,
        berror_pincode: false,
        berror_address: false,
        berror_city: false,
        berror_state: false,
        error_gst: false
      });


      if (!validateState(this.state.binputText_state)) {
        document.getElementById('bstate').focus();
        this.setState({
          berror_state: true,
          berrorMessage_state: !this.state.binputText_state ? `${REQUIRED_FIELD}` : `${ENTER_VALID_STATE}`,
        });
        validateBillingAddress = false
        //return;
      }
      if (!validateCityDistrict(this.state.binputText_city)) {
        document.getElementById('bcity').focus();
        this.setState({
          berror_city: true,
          berrorMessage_city: !this.state.binputText_city ? `${REQUIRED_FIELD}` : `${VALID_CITY_DISTRICT}`,
        });
        validateBillingAddress = false
        //return;
      }
      if (!validateAddress(this.state.binputText_address)) {
        document.getElementById('baddress').focus();
        this.setState({
          berror_address: true,
          berrorMessaget_address: !this.state.binputText_address ? `${REQUIRED_FIELD}` : `${VALID_ADDRESS}`,
        });
        validateBillingAddress = false
        //return;
      }
      if (!validateEmailId(this.state.binputText_email)) {
        document.getElementById('bemail').focus();
        this.setState({
          berror_email: true,
          berrorMessage_email: !this.state.binputText_email ? `${REQUIRED_FIELD}` : `${VALID_EMAIL}`,
        });
        validateBillingAddress = false
        //return;
      }
      if (!validatePindcode(this.state.binputText_pincode)) {
        document.getElementById('bpin').focus();
        this.setState({
          berror_pincode: true,
          berrorMessage_pincode: !this.state.binputText_pincode ? `${REQUIRED_FIELD}` : `${VALID_PINCODE}`,
        });
        validateBillingAddress = false
        //return;
      }
      if (!validateMobileNo(this.state.binputText_number)) {
        document.getElementById('bphone').focus();
        this.setState({
          berror_number: true,
          berrorMessage_number: !this.state.binputText_number ? `${REQUIRED_FIELD}` : 'Please enter valid mobile number.',
        });
        validateBillingAddress = false
        //return;
      }
      if (!validateFullName(this.state.binputText_name)) {
        document.getElementById('bname').focus();
        this.setState({
          berror_name: true,
          berrorMessage_name: !this.state.binputText_name ? `${REQUIRED_FIELD}` : 'Please enter a valid Name. It should not exceed 100 characters',
        });
        validateBillingAddress = false
        //return;
      }
    }

    if (!validateBillingAddress) {
      return;
    }

    if (!validateGST(this.state.inputText_gst)) {
      this.setState({
        error_gst: true,
        errorMessage_gst: 'Please enter valid GST Number.',
      });
      return;
    }
    if (selected_address.pincode !== localPIN) {
      this.setState({
        currentPin: selected_address.pincode,
        pinPop: true
      })
      return;
    }
      this.handleloginContinue()
  }

  onSavebuttonClick(event) {
    event.preventDefault();
    var validateBillingAddress = true;
    this.setState({
      error_name: false,
      errorMessage_name: null,
      error_number: false,
      errorMessage_number: null,
      error_email: false,
      errorMessage_email: null,
      error_pincode: false,
      error_address: false,
      error_city: false,
      error_state: false,
      error_gst: false,
      berror_name: false,
      berror_number: false,
      berror_email: false,
      berror_pincode: false,
      berror_address: false,
      berror_city: false,
      berror_state: false,

      focus_inputText_name: false,
      focus_inputText_number: false,
      focus_inputText_email: false,
      focus_inputText_pincode: false,
      focus_inputText_city: false,
      focus_inputText_state: false,
      focus_inputText_name: false,

    });

    this.state.inputText_address = document.getElementById("address").value;

    if (!validateState(this.state.inputText_state)) {
      document.getElementById('state').focus();
      this.setState({
        error_state: true,
        errorMessage_state: !this.state.inputText_state ? `${REQUIRED_FIELD}` : `${ENTER_VALID_STATE}`,
      });
      validateBillingAddress = false
      //return;
    }
    if (!validateCityDistrict(this.state.inputText_city)) {
      document.getElementById('city').focus();
      this.setState({
        error_city: true,
        errorMessage_city: !this.state.inputText_city ? `${REQUIRED_FIELD}` : `${VALID_CITY_DISTRICT}`,
      });
      validateBillingAddress = false
      //return;
    }
    if (!validateAddress(this.state.inputText_address)) {
      document.getElementById('address').focus();
      this.setState({
        error_address: true,
        errorMessaget_address: !this.state.inputText_address ? `${REQUIRED_FIELD}` : `${VALID_ADDRESS}`,
      });
      validateBillingAddress = false
      //return;
    }
    if (!validatePindcode(this.state.inputText_pincode)) {
      document.getElementById('pin').focus();
      this.setState({
        error_pincode: true,
        errorMessage_pincode: !this.state.inputText_pincode ? `${REQUIRED_FIELD}` : `${VALID_PINCODE}`,
      });
      validateBillingAddress = false
      //return;
    }
    if (!validateEmailId(this.state.email)) {
      document.getElementById('email').focus();
      this.setState({
        error_email: true,
        errorMessage_email: !this.state.email ? `${REQUIRED_FIELD}` : `${VALID_EMAIL}`,
      });
      validateBillingAddress = false
      //return;
    }
    if (!validateMobileNo(this.state.phone)) {
      document.getElementById('phone').focus();
      this.setState({
        error_number: true,
        errorMessage_number: !this.state.phone ? `${REQUIRED_FIELD}` : 'Please enter valid mobile number',
      });
      validateBillingAddress = false
      //return;
    }
    if (!validateFullName(this.state.inputText_name)) {
      document.getElementById('name').focus();
      this.setState({
        error_name: true,
        errorMessage_name: !this.state.inputText_name ? `${REQUIRED_FIELD}` : 'Please enter a valid Name. It should not exceed 100 characters',
      });
      validateBillingAddress = false
      // return;
    }

    if (!validateBillingAddress) {
      return;
    }

    if (this.state.same_bill == false) {
      if (!validateFullName(this.state.binputText_name)) {
        document.getElementById('bname').focus();
        this.setState({
          berror_name: true,
          berrorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
        });
        return;
      }
      if (!validateMobileNo(this.state.binputText_number)) {
        document.getElementById('bphone').focus();
        this.setState({
          berror_number: true,
          berrorMessage_number: 'Please enter valid mobile number',
        });
        return;
      }

      if (!validatePindcode(this.state.binputText_pincode)) {
        document.getElementById('bpin').focus();
        this.setState({
          berror_pincode: true,
          berrorMessage_pincode: 'Please enter valid Pincode',
        });
        return;
      }
      if (!validateEmailId(this.state.binputText_email)) {
        document.getElementById('bemail').focus();
        this.setState({
          berror_email: true,
          berrorMessage_email: 'Please enter valid Email ID',
        });
        return;
      }
      if (!validateAddress(this.state.binputText_address)) {
        document.getElementById('baddress').focus();
        this.setState({
          berror_address: true,
          berrorMessaget_address: 'Please enter valid Address',
        });
        return;
      }
      if (!validateCityDistrict(this.state.binputText_city)) {
        document.getElementById('bcity').focus();
        this.setState({
          berror_city: true,
          berrorMessage_city: 'Please enter valid City/District',
        });
        return;
      }
      if (!validateState(this.state.binputText_state)) {
        document.getElementById('bstate').focus();
        this.setState({
          berror_state: true,
          berrorMessage_state: 'Please enter valid State',
        });
        return;
      }
    }

    if (!validateGST(this.state.inputText_gst)) {
      this.setState({
        error_gst: true,
        errorMessage_gst: 'Please enter valid GST Number',
      });
      return;
    }

    if (this.props.isLoggedIn) {
      this.callAddress();
    } else {
      this.checkPIN()
    }
  }

  handleDefaultAddress = () => {
    if (this.state.defaultAddress == true) {
      this.setState({
        defaultAddress: false
      })
    } else {
      this.setState({
        defaultAddress: true
      })
    }
  }

  renderAddressList = () => {
    if (this.state.addressList && this.state.addressList.length > 0) {
      var list = [];
      this.state.addressList.forEach((add, index) => {
        list.push(
          <li className='list' onClick={this.handleAddressChange.bind(this, index)}>
            <div className='inputBox'>
              <input className="input" type="radio" name="optradio" value={index} checked={this.state.selected_add == index} />
              <label className='labelchecked'></label>
            </div>

            <div className='addressText'>{`${add.address}, ${add.city}, ${add.state}, ${add.pincode}`}</div>
          </li>
        )
      });
      return <ul className="saveAddress customradio clearfix">{list}</ul>;
    }
    else {
      return (
        <div className='noAddress'>
          No Saved address
        </div>
      )
    }
  }

  handleAddressChange(index) {
    this.setState({
      selected_add: index
    })
  }

  handleProceed = () => {
    this.props.proceed();
  }

  render() {
    return (
      <>
        {isMobile() && <div className='checkout-title'>
          Deliver To
                 </div>}
        <div className="col-md-8 checkout_wrapper">
          {this.state.pinPop ?
            <PinChangePopup cancel={this.cancelPinPop} currentPinPro={this.state.currentPin} currentAddressPro={this.state.addressList !== null ? this.state.addressList[this.state.selected_add] : null} /> : ''}
          <div className='listRow clearfix'>
            <div className='stepActive'>
              <div className='checkmark'></div>
            </div>

            {!isMobile() ? <div className="labeltext-box">
              <h4 className="heading-label">{MOBILE_EMAIL}</h4>
            </div> : ''}

            <div className="email-box">
              <h4 className='heading-label'>{this.props.logonBy}</h4>
            </div>

            {!this.props.isLoggedIn && !isMobile() ? <div className="action-button">
              <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">Change</button>
            </div> : ''}

          </div>

          <div className="listRow bgfullflex clearfix">
            <div className='stepActive'>
              <div className='stepBg'>2</div>
            </div>
            {!isMobile() ? <div className='leftBox bgGrey'>
              <div className='heading-label'>Deliver To</div>
              {this.props.isLoggedIn ? <div className='verticalTab'>
                <div className={`add_tab ${this.state.saved_add}`} onClick={this.savedAddActive}>
                  <div style={!this.state.addressList ? { color: 'grey' } : { color: 'black' }}>Saved Address(s)</div>
                </div>
                <div className={`add_tab ${this.state.new_add}`} onClick={this.newAddActive}>
                  <div>New Address</div>
                </div>
              </div> : ''}
            </div> : ''}

            <div className="rightBox">
              {isMobile() && this.props.isLoggedIn ? this.renderAddressList() : ''}
              {this.props.isLoggedIn && isMobile() ? <div className='add-new-address-box'>
                <div className={`add_tab ${this.state.new_add}`} onClick={this.mobiAddActive}>
                  Add New Address <span className='add-address-btn'> </span>
                </div>
              </div> : ''}
              {!this.props.isLoggedIn || this.state.new_add ?
                <div className={isMobile() && 'add-new-address-form'}>
                  <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="Full Name" id="name" name="name"
                          handleChange={this.handleInput} tabIndexNo={-1} />
                        {this.state.error_name ? <div className='error-msg'>{this.state.errorMessage_name}</div> :
                          null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="Mobile Number" name="phone" value={this.state.phone}
                          onChange={e => this.phoneChange(e)} tabIndexNo={2} />
                        {this.state.error_number ? (
                          <div className="error-msg">
                            {this.state.errorMessage_number}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="Pincode" name="pin" value={this.state.inputText_pincode}
                          handleChange={this.handleInput} focusOut={this.pincodeFocusOut.bind(this)} />
                        {this.state.error_pincode ? <div className='error-msg'>{this.state.errorMessage_pincode}</div>
                          : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="Email Address" id="email" name="Email"
                          value={this.state.email} onChange={e => this.mailChange(e)} />
                        {this.state.error_email ? <div className="error-msg">{this.state.errorMessage_email}</div> :
                          null}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-div addressTextarea clearfix div-error">
                        <div className='form-group'>
                          <textarea className='textarea form-control' inputType="text" title="Address" id="address" name="address" handleChange={this.handleInput} maxLength={70} />
                          <label htmlFor='address' className="form-label">Address</label>
                          {this.state.error_address ? <div className='error-msg'>{this.state.errorMessaget_address}</div> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="City/District" id="city" name="city" value={this.state.inputText_city} />
                        {this.state.error_city ? <div className='error-msg'>{this.state.errorMessage_city}</div> : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="State" id="state" name="state" value={this.state.inputText_state} />
                        {this.state.error_state ? <div className='error-msg'>{this.state.errorMessage_state}</div> : null}
                      </div>
                    </div>
                    {this.props.isLoggedIn && isMobile() ? <div className="col-md-12">

                      <div className='havePassword customCheckbox clearfix'>
                        <div className='input_box'>
                          <input className='checkbox inputCheck' id="checkboxBill" type="checkbox" name="billing" onChange={this.handleDefaultAddress} />
                          <label className="lblCheck" htmlFor="checkboxBill"></label>
                        </div>

                        <label className='form-label defaultlbl' htmlFor="billing">Make this my default address</label>
                      </div>

                      <div className='col-xs-12 col-md-12 address-submit'>
                        <button className="btn-blackbg btn-block" disabled={this.state.isSaveBtnDisabled} onClick={this.onSavebuttonClick.bind(this)}>{!isMobile() ? 'Submit' : 'Save Address'}</button>
                      </div>
                    </div> : ''}
                    {this.state.new_add_error ? <div className="col-md-12 error-box"><div className='error-msg'>{this.state.new_add_msg}</div></div> : null}
                  </div>
                </div> : !isMobile() ? this.renderAddressList() : ''}




              {!this.state.new_add || isMobile() ?
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className='bill-address customCheckbox clearfix'>
                        <div className='input_box'>
                          <input className='checkbox inputCheck' id="checkbox" type="checkbox" name="billing" defaultChecked={this.state.same_bill} onChange={this.handleSameBill} />
                          <label className="lblCheck" htmlFor="checkbox"></label>
                        </div>
                        <label className='label-billing defaultlbl' htmlFor="billing">Billing address is the same as delivery address</label>
                      </div>
                    </div>
                  </div>
                  {!this.state.same_bill ? <div className="bill_div">
                    <div className="row">
                      <div className="col-md-12"><p class="label-enter-billing">Enter A billing address</p></div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Full Name" id="bname" name="bname" handleChange={this.handleInput} />
                          {this.state.berror_name ? <div className='error-msg'>{this.state.berrorMessage_name}</div> : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Mobile Number" id="bphone" name="bphone" handleChange={this.handleInput} />
                          {this.state.berror_number ? (
                            <div className="error-msg">
                              {this.state.berrorMessage_number}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Pincode" id="bpin" name="bpin" value={this.state.binputText_pincode} handleChange={this.handleInput} focusOut={this.bPincodeFocusOut.bind(this)} />
                          {this.state.berror_pincode ? <div className='error-msg'>{this.state.berrorMessage_pincode}</div> : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Email Address" id="bemail" name="bemail" handleChange={this.handleInput} />
                          {this.state.berror_email ? <div className="error-msg">{this.state.berrorMessage_email}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Address" id="baddress" name="baddress" handleChange={this.handleInput} maxLength={70} />
                          {this.state.berror_address ? <div className='error-msg'>{this.state.berrorMessaget_address}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="City/District" name="bcity" id="bcity" value={this.state.binputText_city} />
                          {this.state.berror_city ? <div className='error-msg'>{this.state.berrorMessage_city}</div> : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="State" name="bstate" value={this.state.binputText_state} id="bstate" />
                          {this.state.berror_state ? <div className='error-msg'>{this.state.berrorMessage_state}</div> : null}
                        </div>
                      </div>

                    </div>
                  </div> : ''}

                  <div className='row'>
                    <div className='col-md-12 bussinessNote'>
                      <h5 className='buying'>Buying it for your business?</h5>
                      <div className='noteGstin'><span className='bold'>Note</span>
                        :The GSTIN cannot be changed once the order has been placed. The state in which the GSTIN is registered must be same either on the billing or the delivery address.</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-div clearfix div-error">
                        <Input inputType="text" title="GSTIN (Optional)" value={this.state.inputText_gst} name="gst" handleChange={this.handleInput} />
                        {this.state.error_gst ? <div className='error-msg'>{this.state.errorMessage_gst}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 form-group'>
                      {!isMobile() ? (<button disabled={this.state.isProcceedBtnDisabled} className="btn-blackbg btn-block continueMargin" onClick={this.props.isLoggedIn ? this.onLoginSave.bind(this) : this.onSavebuttonClick.bind(this)}>Proceed</button>) : ''}
                    </div>
                  </div>
                </div> : <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className='havePassword customCheckbox clearfix'>
                        <div className='input_box'>
                          <input className='checkbox inputCheck' id="checkboxBill" type="checkbox" name="billing" onChange={this.handleDefaultAddress} />
                          <label className="lblCheck" htmlFor="checkboxBill"></label>
                        </div>

                        <label className='form-label defaultlbl' htmlFor="billing">Make this my default address</label>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className={!isMobile() ? 'col-md-6' : 'col-xs-6 col-md-6'}>
                      <button className="btn-cancelborder btn-block" onClick={this.savedAddActive.bind(this)}>Cancel</button>
                    </div>
                    <div className={!isMobile() ? 'col-md-6' : 'col-xs-6 col-md-6 address-submit'}>
                      <button className="btn-blackbg btn-block" onClick={this.onSavebuttonClick.bind(this)} disabled={this.state.isSaveBtnDisabled}>Submit</button>
                    </div>
                  </div>
                </div>}
            </div>
          </div>

          {this.props.isLoggedIn && !isMobile() ? <div className="listRow clearfix">
            <div className='stepActive'>
              <div className='stepbgNone'>3</div>
            </div>
            <div className="leftBox">
              <div className='heading-label'>Payment Options</div>
            </div>
            <div className="rightBox">
              <div className='heading-label'>Choose a payment method</div>
            </div>
          </div> : ''}

          {isMobile() ? (<div className='checkout-btn-floater'>
            <div className='total-amount'><div className='net-amount-box'>&#8377;{this.props.netAmount} <span className='total-amount-text'>Total Amount</span></div></div>
            <div className='proceed-btn'><button disabled={this.state.isProcceedBtnDisabled} className="btn-blackbg btn-block" onClick={this.props.isLoggedIn ? this.onLoginSave.bind(this) : this.onSavebuttonClick.bind(this)}>Proceed</button></div>
          </div>) : ''}
        </div>
      </>
    )
  }
}