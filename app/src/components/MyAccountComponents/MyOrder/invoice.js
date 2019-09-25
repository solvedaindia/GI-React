import React from 'react';
import jsPDF from 'jspdf';
import { withRouter } from 'react-router-dom';
import { orderListAPI, invoicAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/myAccount/invoice.scss';
import appCookie from '../../../utils/cookie';
import html2canvas from 'html2canvas'
class Invoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invoiceData: null,
            orderListData: null
        }
        // this.download = this.download.bind(this);
    }
    componentDidMount() {
        this.getInvoiceDetails();
		
		console.log(orderListAPI);
		
		let orderAPI =
        `${orderListAPI}?` + `pagenumber=1&` + `pagesize=200&`;
		
		apiManager.get(orderAPI)
        .then(response => 
		{
		  console.log(response);
          this.setState({
            orderListData: response.data.data.orderList
          });

        })
        .catch(error => {
          this.setState({
            isLoading: false,
            error: error.message,
          })
        });
		
    }
    getInvoiceDetails() {
		apiManager
		.get(invoicAPI + this.props.match.params.invoiceId)
		.then(response => {
			console.log(response.data.data);
			this.setState({
				invoiceData: response.data.data,
				isLoading: false,
			},
            );
		})
		.catch(error => {
			this.setState({
                error,
                isLoading: false,
			});
		});
	}
	_exportPdf = () => {

   
	}

    invoiceDatailedData() 
	{
		
		let  invoiceData  = this.state.invoiceData;
        return (
            <div id='invoiceDiv' className="container invoiceContainer" style={{width:'90%'}}>
                <h3 className="value heading" style={{textAlign: 'center'}}>TAX INVOICE</h3>
                {
                    !!invoiceData && <div className="invoiceData" style={{border:'1', width: '85%', margin: 'auto',}}>
						<div className="invoiceContainer topsection" style={{border:'0', width: '100%', margin: 'auto',height: '100px'}}>
                        <div className="value heading"  style={{width: '24%', float: 'left'}} >Cin No</div>
						<div className="value" style={{width: '24%', float: 'left'}}>{invoiceData.cinNO}</div>
                        <div className="value heading" style={{width: '24%', float: 'left'}}>Invoice Date</div>
						<div className="value" style={{width: '24%', float: 'left'}}>{invoiceData.invoiceDate}</div>
                        <div className="value heading" style={{width: '24%', float: 'left'}}>&nbsp;</div>
						<div className="value" style={{width: '24%', float: 'left'}}>&nbsp;</div>
                        <div className="value heading" style={{width: '24%', float: 'left'}}>Order Number</div>
						<div className="value" style={{width: '24%', float: 'left'}}>{invoiceData.orderNo}</div>
						</div>
						<div className="invoiceContainer addresssection" style={{border:'0', width: '100%', margin: 'auto',height:'120px',float: 'left'}}>
							<div className="invoiceContainer addresssection" style={{border:'0', width: '50%', margin: 'auto', float: 'left'}}>
								<div className="value heading">From</div>
								<div className="value">  
									{!!invoiceData.companyAddress && invoiceData.companyAddress.name}</div>
								<div className="value">
									{!!invoiceData.companyAddress && invoiceData.companyAddress.address}</div>
                                    <div className="value">
									{!!invoiceData.companyAddress && invoiceData.companyAddress.city}</div>
                                    <div className="value">
									{!!invoiceData.companyAddress && invoiceData.companyAddress.state}</div>
                                    <div className="value">
									{!!invoiceData.companyAddress && invoiceData.companyAddress.zipCode}</div>
                                    <div className="value">
									{!!invoiceData.companyAddress && invoiceData.companyAddress.gstinNo}</div>
							</div>
							<div className="invoiceContainer addresssection" style={{border:'0', width: '50%', margin: 'auto', float: 'left'}}>
								<div className="value heading">Company Name</div>
								<div className="value">  
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.name}</div>
								
								<div className="value">
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.address}</div>
                                    <div className="value">
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.city}</div>
                                    <div className="value">
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.state}</div>
                                    <div className="value">
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.zipCode}</div>
                                    <div className="value">
									{!!invoiceData.consignorAddress && invoiceData.consignorAddress.gstinNo}</div>
                                    
                                    
							</div>
						</div>
						<div className="invoiceContainer addresssection customer" style={{border:'0', width: '100%', margin: '50px 0 0 0',height:'160px',float: 'left'}}>
							<div className="invoiceContainer addresssection" style={{border:'0', width: '50%', margin: 'auto', float: 'left'}}>
								<div className="value heading">Billing Name</div>
								<div className="value">  
									{!!invoiceData.billTo && invoiceData.billTo.name}</div>
								<div className="value heading">Billing Address</div>
								<div className="value">
									{!!invoiceData.billTo && invoiceData.billTo.address}</div>
								<div className="value heading">Contact No</div>
								<div className="value">
									{!!invoiceData.billTo && invoiceData.billTo.contactNo}</div>
								<div className="value heading">GST No (if applicable)</div>
								<div className="value">
									{!!invoiceData.billTo && invoiceData.billTo.gstinNo}</div>
							</div>
							<div className="invoiceContainer addresssection" style={{border:'0', width: '50%', margin: 'auto', float: 'left'}}>
								<div className="value heading">Customer Name</div>
								<div className="value">  
									{!!invoiceData.shipTo && invoiceData.shipTo.name}</div>
								<div className="value heading">Delivery Address</div>
								<div className="value">
									{!!invoiceData.shipTo && invoiceData.shipTo.address}</div>
								<div className="value heading">Contact No</div>
								<div className="value">
									{!!invoiceData.shipTo && invoiceData.shipTo.contactNo}</div>
							</div>
						</div>
						
                        <div className="invoiceContainer itemsection" style={{border:'0', width: '100%', margin: '50px 0 0 0', float: 'left'}}>
							<div className="itemsection invoiceheading" style={{border:'0', width: '100%', margin: 'auto', float: 'left'}}>
                                
									<div className="value heading" style={{width: '13%', margin: 'auto', float: 'left'}}>Item Id</div>
									<div className="value heading"  style={{width: '13%', margin: 'auto', float: 'left'}}> Description</div>
									<div className="value heading" style={{width: '16%', margin: 'auto', float: 'left'}}>HSN Code</div>
                                    <div className="value heading" style={{width: '10%', margin: 'auto', float: 'left'}}>Item Price</div>
                                    <div className="value heading" style={{width: '10%', margin: 'auto', float: 'left'}}>Quantity</div>
                                    <div className="value heading" style={{width: '10%', margin: 'auto', float: 'left'}}>CGST</div>
                                    <div className="value heading" style={{width: '10%', margin: 'auto', float: 'left'}}>SGST </div>
                                    <div className="value heading" style={{width: '10%', margin: 'auto', float: 'left'}}>Item Total Amount</div> 
                            </div>
							{!!invoiceData && invoiceData.lineItemDetails && invoiceData.lineItemDetails.lineItemList.map((itemList, index) => {
                                return (
                                    
                                    <div className="itemList" index={`${index}-item`}>
                                        <div  style={{width: '13%', margin: 'auto', float: 'left'}}>{itemList.itemCode}</div>
                                        <div style={{width: '13%', margin: 'auto', float: 'left'}}>&#160;{itemList.itemDesc}</div>
                                        <div style={{width: '16%', margin: 'auto', float: 'left'}}>{itemList.hsnCode}</div>
                                        <div style={{width: '10%', margin: 'auto', float: 'left'}}>{itemList.itemPrice}</div>
                                        <div style={{width: '10%', margin: 'auto', float: 'left'}}>{itemList.quantity}</div>
                                        <div style={{width: '10%', margin: 'auto', float: 'left', align:'right'}}>{itemList.cgstAmount}</div>
                                        <div style={{width: '10%', margin: 'auto', float: 'left', align:'right'}}>{itemList.sgstAmount}</div>
                                        <div style={{width: '10%', margin: 'auto', float: 'left', align:'right'}}>{itemList.itemTotalAmount}</div>
                                        

                                      
                                    </div>
                                )
							})}
							<div className="itemsection invoicefooter" style={{border:'0', width: '100%', margin: '20px 0 0 0', float: 'left'}}>
                                <div style={{width: '60%', margin: 'auto', float: 'left'}}>&#160;</div>
								<div className="value heading" style={{width: '20%', margin: 'auto', float: 'left', align:'right'}}>Total (Rs) </div>
								<div style={{width: '20%', float: 'left', align:'right'}}>{!!invoiceData.lineItemDetails && invoiceData.lineItemDetails.totalAmount}</div>
                            </div>
						</div>
                    </div>

                }
            </div>
        )
    }
    render() 
	{
		if(this.state.isLoading)
		{
			return <div></div>;
		}
		const UserLoggedIn = appCookie.get('isLoggedIn');
		//this.getInvoiceDetails();
		if(this.state.invoiceData != null)
		{
			var invoiceData = this.state.invoiceData;
			console.log('invoiceData ', invoiceData);
			console.log('this.state.orderListData ', this.state.orderListData);
			var isMatchForUser = false;
			console.log(this.state.orderListData);
			(this.state.orderListData != null && this.state.orderListData.length !== 0)? 
				this.state.orderListData.map((orderInfo, key) => 
				{
					console.log('orderInfo.orderNo ', orderInfo.orderID);
					if(orderInfo.orderID === invoiceData.orderNo)
					{
						isMatchForUser = true;
					}
					
				}
			):isMatchForUser = false;
		   return(
				<div className="invoiceTicket">
					<div id="content">
					{UserLoggedIn == 'true' && invoiceData  && isMatchForUser? this.invoiceDatailedData() : 
						<div id='invoiceDiv' className="container invoiceContainer" style={{color:'red', margin:'60px', width:'90%'}}>
							Selected invoice is not applicable for you, please login with linked user account</div>}
						</div>

				</div>
			);
		}
		else
		{
			return(
				<div className="invoiceTicket">
					<div id="content">
						<div id='invoiceDiv' className="container invoiceContainer" style={{color:'red', margin:'60px', width:'90%'}}>
							Invoice data is not available
						</div>
					</div>
				</div>
				);
		}
    }
}

export default withRouter(Invoice);