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
    //     if (typeof(el)==='object' && el!==null) {
    //         const width = 210
    //         const elementHandlers = {
    //             '#ignorePDF': (element,renderer)=>{
    //                 return true
    //             }
    //         }
    //         doc.fromHTML(el,1,1,{width,elementHandlers},()=>{
    //             const pdf = doc.output('datauristring')
    //             if (typeof(pdf)==='string' && pdf.length>0) {
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
            <div className="invoiceContainer" style={{width: '95%', margin: 'auto'}}>
                <h3 style={{textAlign: 'center'}}>TAX INVOICE </h3>
                {
                    !!invoiceData && <div className="invoiceData">
                        <p>Cin No - {invoiceData.cinNO}</p>
                        <p>Invoice Data - {invoiceData.invoiceDate}</p>
                        <p> Invoice Time- {invoiceData.invoiceTime}</p>
                        <p>Order Number - {invoiceData.orderNo}</p>
                        <p>Company Name - {!!invoiceData.companyAddress && invoiceData.companyAddress.name}</p>
                        <p>Company Address - {!!invoiceData.companyAddress && invoiceData.companyAddress.address}</p>
                        <ul>
                        {!!!!invoiceData.lineItemDetails && invoiceData.lineItemDetails.lineItemList.map((itemList, index) => {
                            <li className='itemList' index={`${index}-item`}>
                                <p>Item Name - {itemList.itemDesc}</p>
                                <p>Item Amount - {itemList.itemTotalAmount}</p>
                            </li>
                        })}
                        </ul>
                        <p>Total Price - {!!invoiceData.lineItemDetails && invoiceData.lineItemDetails.totalAmount}</p>
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
                {/* <p className='downloadBtn'><button className="btn btn-outline-primary" onClick={this.download}>Downlaod Invoice</button></p> */}
            </div>
        );
    }
}

export default withRouter(Invoice);
