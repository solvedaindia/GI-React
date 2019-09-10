import React from 'react';
import jsPDF from 'jspdf';
import { withRouter } from 'react-router-dom';
import { invoicAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/myAccount/invoice.scss';

class Invoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invoiceData: null
        }
        // this.download = this.download.bind(this);
    }
    componentDidMount() {
        this.getInvoiveDetails();
    }
    getInvoiveDetails() {
		apiManager
		.get(invoicAPI + this.props.match.params.invoiceId)
		.then(response => {
			this.setState({
				invoiceData: response.data.data,
				isLoading: false,
            },
            // () => {
            //     this.setup();
            // }
            );
		})
		.catch(error => {
			this.setState({
                error,
                isLoading: false,
			});
			console.log('Invoive data error');
		});
	}
    // download=( )=>{
    //     this.doc.save('invoice.pdf');
    // }
    // setup() {
    //     const doc = new jsPDF();
    //     const el = document.getElementById('content');
    //     if (typeof(el)==="object' && el!==null) {
    //         const width = 210
    //         const elementHandlers = {
    //             '#ignorePDF': (element,renderer)=>{
    //                 return true
    //             }
    //         }
    //         doc.fromHTML(el,1,1,{width,elementHandlers},()=>{
    //             const pdf = doc.output('datauristring')
    //             if (typeof(pdf)==="string' && pdf.length>0) {
    //             this.setState({pdf})
    //             }
    //         })
            
    //     }
    //     this.doc = doc;
    // }
    invoiceDatailedData() {
        const { invoiceData } = this.state;
        console.log('!!!!! Invoice' , invoiceData);
        // if(!invoiceData) return null;
        return (
            <div className="invoiceContainer" style={{border:'1px solid black', width: '90%', margin: 'auto' , float: 'left'}}>
                <h3 style={{textAlign: 'center'}}>TAX INVOICE</h3>
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
								<div className="value heading">Company Address</div>
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
								<div className="value heading">From Address</div>
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
							<div className="invoiceContainer addresssection" style={{border:'0', width: '50%', margin: '50px 0 0 0', float: 'left'}}>
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
						
                        <div className="invoiceContainer itemsection" style={{border:'0', width: '100%', margin: '40px 0 0 0', float: 'left'}}>
							<div className="itemsection invoiceheading" style={{border:'0', width: '100%', margin: 'auto', float: 'left'}}>
                            <div style={{width: '10%', margin: 'auto', float: 'left'}}>Item Id</div>
									<div style={{width: '13%', margin: 'auto', float: 'left'}}>Description</div>
									<div style={{width: '13%', margin: 'auto', float: 'left'}}>HSN Code</div>
                                    <div style={{width: '13%', margin: 'auto', float: 'left'}}>Item Price</div>
                                    <div style={{width: '12%', margin: 'auto', float: 'left'}}>Quantity</div>
                                    <div style={{width: '13%', margin: 'auto', float: 'left'}}>CGST Amount</div>
                                    <div style={{width: '12%', margin: 'auto', float: 'left'}}>SGST Amount</div>
                                    <div style={{width: '14%', margin: 'auto', float: 'left'}}>Total Amount</div> 
                            </div>
							{!!invoiceData && invoiceData.lineItemDetails && invoiceData.lineItemDetails.lineItemList.map((itemList, index) => {
                                return (
                                    <div className="itemList" index={`${index}-item`}>
                                        <div  style={{width: '10%', margin: 'auto', float: 'left'}}>{itemList.itemCode}</div>
                                        <div style={{width: '13%', margin: 'auto', float: 'left'}}>&#160;{itemList.itemDesc}</div>
                                        <div style={{width: '13%', margin: 'auto', float: 'left'}}>{itemList.hsnCode}</div>
                                        <div style={{width: '13%', margin: 'auto', float: 'left'}}>{itemList.itemPrice}</div>
                                        <div style={{width: '12%', margin: 'auto', float: 'left'}}>{itemList.quantity}</div>
                                        <div style={{width: '13%', margin: 'auto', float: 'left'}}>{itemList.cgstAmount}</div>
                                        <div style={{width: '12%', margin: 'auto', float: 'left'}}>{itemList.sgstAmount}</div>
                                        <div style={{width: '14%', margin: 'auto', float: 'left'}}>{itemList.itemTotalAmount}</div>
                                        

                                        {itemList.itemTotalAmount}
                                    </div>
                                )
							})}
							<div className="itemsection invoicefooter" style={{border:'0', width: '100%', margin: 'auto', float: 'left'}}>
                                <div style={{width: '60%', margin: 'auto', float: 'left'}}>Total</div>
								<div style={{width: '20%', margin: 'auto', float: 'left'}}>Quantity</div>
								<div style={{width: '20%', margin: 'auto', float: 'left'}}>{!!invoiceData.lineItemDetails && invoiceData.lineItemDetails.totalAmount}</div>
                            </div>
						</div>
                    </div>

                }
            </div>
        )
    }
    render() {
        return(
            <div className="invoiceTicket">
                <div id="content">
                    {this.invoiceDatailedData()}
                </div>
               
            </div>
        );
    }
}

export default withRouter(Invoice);
