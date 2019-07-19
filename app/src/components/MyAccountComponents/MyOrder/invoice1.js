import React from 'react';
import jsPDF from 'jsPDF';
import { invoicAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import '../../../../public/styles/myAccount/invoice.scss';

const data = {
    firstName: 'john',
    lastName: 'donohue',
    email: 'john.donohue@trendcycle.co',
  }

class Invoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invoiceData: null
        }
    }
    componentDidMount() {
        this.getInvoiveDetails();
    }
    getInvoiveDetails() {
		apiManager
		.get(invoicAPI + '123456')
		.then(response => {
			this.setState({
				invoiceData: response.data.data,
				isLoading: false,
            },
            () => {
                this.setup();
            }
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
    download=event=>{
        this.doc.save('invoice.pdf');
    }
    setup() {
        const doc = new jsPDF();
        const el = document.getElementById('content');
        if (typeof(el)==='object' && el!==null) {
            const width = 210
            const elementHandlers = {
                '#ignorePDF': (element,renderer)=>{
                return true
                }
            }
            doc.fromHTML(el,1,1,{width,elementHandlers},()=>{
                const pdf = doc.output('datauristring')
                if (typeof(pdf)==='string' && pdf.length>0) {
                this.setState({pdf})
                }
            })
            
        }
        this.doc = doc;
    }
    invoiceDatailedData() {
        const { invoiceData } = this.state;
        console.log('!!!!! Invoice' , invoiceData);
        return (
            <div className="invoiceContainer" style={{width: '95%', margin: 'auto'}}>
                {
                    <div class="invoiceData">
                        <h3 style={{textAlign: 'center'}}>TAX INVOICE</h3>
                        <span style={{width: '40vw', marginBottom:'20px', fontSize:'11px'}}>{!!invoiceData && invoiceData.companyAddress.name}</span>
                        <span style={{width: '40vw', marginBottom:'20px', fontSize:'10px'}}>{!!invoiceData && invoiceData.companyAddress.address}</span>
                        <span style={{width: '40vw', marginBottom:'20px', fontSize:'10px'}}>{!!invoiceData && invoiceData.cinNO}</span>
                    </div>
                }
            </div>
        )
    }
    render() {
        return(
            <div className="invoiceTicket">
                <h1 className='title'>INVOICE</h1>
                <div id="content">
                    {this.invoiceDatailedData()}
                </div>
                <button className="btn btn-outline-primary" onClick={this.download}>Save as PDF</button>
        </div>
        );
    }
}

export default Invoice;
