import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  	pdpApi2,
  	espotAPI
} from '../../../public/constants/constants';
import PdpComponent from '../../components/PdpComponent/PdpComponent';
import axios from 'axios';

// function load3d(item_id,flag)
// { 
// 	//insert user details here	
// var username = "3d@godrejinterio.com";
// var password = "godrej@123";
// var API_KEY = "AH44GH67";
// var item_id = '56121403SD00013';
// $.ajax({
// 	type: "GET",
// 	url: "http://disha3d.com/API/API.php",
// 	data: {'user': username,'password': password,'API_KEY': API_KEY,'prodid': item_id,},
// 	success :  function(resp)
// 		{	
// 			 //Handling custom errors
// 			if(resp == 0)
// 			{
// 				//Model does not exists								
// 			}
// 			else if
// 			(resp == 2)
// 			{
// 				//Username and password incorrect
// 			}
// 			else if(resp == 3)
// 			{
// 				//API_KEY incorrect
// 			}
// 			else if(resp == '00')
// 			{
// 				// Request does not exist
// 			}
// 			//MODEL EXISTS!
// 			else{
					
// 			//REFER TO NOTE 1 OF INTEGRATION DOCUMENT
// 				if(flag==1)
// 				{
// 					//GENERATE BUTTONS
// 					$(/* --Selector for button division-- */).html('<img src="--Button Image Source--"   onclick="load3d('+item_id+',2)" > ');
// 				}
// 				else if(flag==2)
// 				{
// 					//Display 3D Model
// 					$(/* --Selector for <IFRAME>-- */).html('<iframe id="3diframe" src="'+resp+'" width="600" height="480" frameBorder="0" allowfullscreen/>');										
// 			 	}
									
// 				else
// 				{
// 					alert('not defined');
// 				}
// 			}
// 		console.log('@@@ Jquery dependent 3D response @@@',resp);
// 	}
// });
// }

// $(document).ready(function(){
// 	load3d('56121403SD00013',1);
// });
 

class PdpContainer extends React.Component {
	constructor() {
		super();
		this.callPdpApi = this.callPdpApi.bind(this);
		this.state = {
			pdpLoading: true,
			pdpError: false,
			espotLoading: true,
			espotError: false,
			image3D: null
		};
	}

	componentDidMount() {
		this.callPdpApi();
		this.callPdpEspotApi();
		this.check3DApi();
  	}

	callPdpApi() {
		const productId = this.props.match.params.productId
		apiManager.get(pdpApi2 + productId)
		.then(response => {
			//console.log('=====>PDP', JSON.stringify(response.data));
			this.setState({
			pdp: response.data,
			pdpLoading: false,
			});
		})
		.catch(error => {
			console.log('PDP API Error =>', error);
		});
	}
	callPdpEspotApi() {
		const APIType = 'GI_PDP_Sample_Espot1';
		const espotPdpApi = espotAPI + APIType;
		apiManager.get(espotPdpApi).then(response => {
			this.setState({
				pdpEspot: response.data,
				espotLoading: false,
			});
		}).catch(error => {
			console.log('PDP Espot API Error =>', error);
		});
	}
	check3DApi = () => {
		;(async () => {
			await axios({
			  url: 'http://disha3d.com/API/API.php',
			  method: 'get',
			  data: {'user': '3d@godrejinterio.com','password': 'godrej@123','API_KEY': 'AH44GH67','prodid': '56121403SD00013'}
			})
			.then(response => {
				console.log('@@@@Its a 3D Test API@@@@', response);
				this.setState({
					image3D: response,
				});
			})
			.catch(error => {
				console.log('@@@@Its a 3D Test API@@@@ - Failure', error);
			});
		})()
	}
	render() {
	const { image3D } = this.state;
	return (
		<div>
			<div className='3D'>
				<iframe id="3diframe" src={image3D} width="600" height="480" frameBorder="0" allowfullscreen/>
			</div>
			{!this.state.pdpLoading && !this.state.espotLoading && (
				<PdpComponent
					data={this.state.pdp.data}
					matchParams={this.props.match.params}
					espot={this.state.pdpEspot}
					historyData={this.props.history}
				/>
			)}
		</div>
	);
	}
}

export default PdpContainer;
