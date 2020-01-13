import React from 'react';
import ItemImage from '../GlobalComponents/productItem/image';
import Price from '../GlobalComponents/productItem/price';
import '../../../public/styles/compWidget.scss';
import { Row, Col, Grid } from 'react-bootstrap';

import close from '../../../public/images/close.svg';
import Link from 'react-router-dom/Link';
import appCookie from '../../utils/cookie';
import apiManager from '../../utils/apiManager';
import apiManger from '../../utils/apiManager';
import { pdpApi2,pinCodeAPI, pinCodeAPIBundle} from '../../../public/constants/constants';
import { storeId, accessToken, findinventoryAPI } from '../../../public/constants/constants';

import axios from 'axios';
import { fromJS } from 'immutable';

class DelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryData: '',
      isLoading: true,
    }
  }
  componentDidMount() {

    console.log("saaaaaaa",this.props.skuData);
    if(this.props.skuData.type==="ItemBean")
    {
      this.callDeliveryDateAPI(this.props.skuData.partNumber);
    }
    else if(this.props.skuData.type==="BundleBean" || this.props.skuData.type==="KitBean")
    {
      apiManager.get(pdpApi2 + this.props.skuData.partNumber).then(response => {
        console.log("alaaaaa",response.data)
        let skuId =this.props.skuData.partNumber; 
        if(response.data.data.type==='kit')
        {
          response.data.data.kitData.map(skuLevelData => {
            if (skuId === skuLevelData.partNumber ||  skuId === skuLevelData.uniqueID) {
              this.getActualResolvedData(response.data.data.kitData, skuLevelData, response.data.data.type);
            }
          });
        }
        else if(response.data.data.type==='bundle')
        {
          response.data.data.bundleData.map(skuLevelData => {
            if (skuId === skuLevelData.partNumber ||  skuId === skuLevelData.uniqueID) {
              this.getActualResolvedData(response.data.data.bundleData, skuLevelData, response.data.data.type);
            }
          });
        }

      }).catch(error => {
      });

    }
    
  }


  getPincodeApiParams(resolvedSkuData, type) {
		let partnumber = [];
		let quantity = [];
		let uniqueid = [];
		let dataParams;
		if (resolvedSkuData.itemInThisBundle && type === 'bundle') {
			resolvedSkuData.itemInThisBundle.map((data) => {
				partnumber.push(data.partNumber);
				quantity.push(data.quantity);
				uniqueid.push(data.uniqueID);
				
				 dataParams = {
					params: {
					partnumber: partnumber.toString(),
					quantity: quantity.toString(),
					uniqueid: uniqueid.toString(),
					},
				};
			})
		} else {
			 dataParams = {
				params: {
				partnumber: resolvedSkuData.partNumber,
				quantity: 1,
				uniqueid: resolvedSkuData.uniqueID,
				},
			};
		}

		return dataParams;

	}

  /* get actual resolve data  */
	getActualResolvedData(data, resolvedSkuData, type) {
      //this.callPinCodeAPI(resolvedSkuData, type);
      
      let callPincodeApi;
      if (type === 'bundle') {
        callPincodeApi = pinCodeAPIBundle;
      } else {
        callPincodeApi = pinCodeAPI;
      }
      let pincodeVal = appCookie.get('pincode');
      const dataParams = this.getPincodeApiParams(resolvedSkuData, type);

      apiManager.get(callPincodeApi + pincodeVal, dataParams).then(response => {
        console.log("deliveryData",response.data.data)
        this.setState({
          isLoading: false,
          deliveryData: 'Found',
        });
      }).catch(error => {
  
        this.setState({
          isLoading: false,
          deliveryData:'Error'
        });
      });

  }

  callDeliveryDateAPI = (partNumber) => {
    var token = appCookie.get('accessToken');
    var defPin = appCookie.get('pincode');
    var url = `${findinventoryAPI}${defPin}?partNumber=${partNumber}&quantity=1`
    
    axios.get(url, {
      headers: {
        store_id: storeId,
        access_token: token
      }
    }).then((resp) => {
      this.setState({
        deliveryData: resp.data.data.deliveryDate || 'NA',
        isLoading: false,
      })
    }).catch((err) => {
      this.setState({
        isLoading: false,
      })
    })
  }

  dotLoader() {
    return (
      <div class="loading-dots">
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
      </div>
    )
  }

  render() {
    return (
      <Col xs={12} sm={4} md={4}>
        <div className='DeliveryLoaderwrap'>
          <div className='DeliveryText'>Delivery between:</div>
          <div className='loaderdiv'>{this.state.isLoading ? this.dotLoader() : <strong>{this.state.deliveryData}</strong>}</div>
        
        </div> 
      </Col>
    );
  }



}

export default DelContainer;
