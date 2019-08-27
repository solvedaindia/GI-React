import React from 'react';
import { minEMIAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import EMILogo from '../../components/SVGs/emiIcon';
import '../../../public/styles/cart/cartItem.scss';

class EMIVal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emiVal: null,
            isLoading: false,
            error: null
        }
    }
    getEmiVal() {
        apiManager
        .get(`${minEMIAPI}/${this.props.price}`)
        .then(response => {
            this.setState({
                emiVal: response.data.data.minEMIValue,
                isLoading: false,
            });
            this.props.getCartDetails();
            console.log('@@@@ EMI Value @@@', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
    }
    componentDidMount() {
        this.getEmiVal();
    }
    render() {
        const { emiVal } = this.state
        return (
            !!emiVal && 
            <p className='emiMsg'>
                <span className='emiLogo'>
                <EMILogo width={23} height={23} />
                </span>Starting from ₹{emiVal} per month
            </p>
        )
    }
}

export default EMIVal;